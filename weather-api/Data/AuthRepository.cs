using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Weather_Api.Dto.UserDtos;
using Weather_Api.Extension;
using Weather_Api.Model;

namespace Weather_Api.Data
{
    public class AuthRepository : IAuthRepository
    {
        public readonly DataContext _context;
        private readonly IConfiguration _configuration;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IMapper _mapper;
        public AuthRepository(DataContext context, IConfiguration configuration, IHttpContextAccessor httpContextAccessor, IMapper mapper)
        {
            _context = context;
            _configuration = configuration;
            _httpContextAccessor = httpContextAccessor;
            _mapper = mapper;
        }


        public async Task<ServiceResponse<string>> Login(string username, string password)
        {
            var response = new ServiceResponse<string>();

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Username.ToLower().Equals(username.ToLower()));

            if (user == null)
            {
                response.Message = "User Not Found";
                response.Success = false;
            }
            else if (!VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
            {
                response.Message = "Incorrect Password";
                response.Success = false;
            }
            else
            {
                user.LastLoginDate = DateTime.UtcNow;
                response.Data = CreateToken(user);
                response.Success = true;
               await _context.SaveChangesAsync();
            }

            return response;

        }

        public async Task<ServiceResponse<int>> Register(User user, string password)
        {
            var response = new ServiceResponse<int>();

            if (await UserExists(user.Username))
            {
                response.Success = false;
                response.Message = "This Username is already taken...";
                return response;
            }

            CreatePasswordHash(password, out byte[] passwordHash, out byte[] passwordSalt);
            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;
            user.RegistrationDate = DateTime.Now;
            user.LastLoginDate = DateTime.Now;
        
            


            _context.Users.Add(user);

            await _context.SaveChangesAsync();

            response.Success = true;
            response.Data = user.Id;

            return response;

                
        }

        public async Task<bool> UserExists(string Username)
        {
            if (await _context.Users.AnyAsync(u => u.Username.ToLower() == Username.ToLower()))
            {
                return true;
            }
            return false;
        }

        public async Task<ServiceResponse<GetUserDto>> GetCurrentUser()
        {
            var response = new ServiceResponse<GetUserDto>();   

            // check this line of code

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == _httpContextAccessor.GetUserId());
            // var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == GetUserId());


            if (user == null)
            {
                response.Success = false;
                response.Message = "No Current User Found";
                return response;
            }

            response.Data = _mapper.Map<GetUserDto>(user);
            response.Success = true;

            return response;


        }
        private int GetUserId()
        {
            return int.Parse(_httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier));
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }
        private string CreateToken(User user)
        {
            List<Claim> claims = new List<Claim> {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.Username)
            };

            SymmetricSecurityKey key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(_configuration.GetSection("AppSettings:Token").Value!));

            SigningCredentials creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
            SecurityTokenDescriptor tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds
            };

            JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();

            SecurityToken token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token); // token 
        }
        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512(passwordSalt))
            {
                var ComputeHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                return ComputeHash.SequenceEqual(passwordHash);
            }
        }
    }
}
