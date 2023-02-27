using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Weather_Api.Data;
using Weather_Api.Dto.UserDtos;
using Weather_Api.Model;

namespace Weather_Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {

        private readonly IAuthRepository _authRepository;
        public AuthController(IAuthRepository authRepository)
        {
            _authRepository = authRepository;
        }


        [HttpPost("register")]

        public async Task<ActionResult<ServiceResponse<int>>> Register(AddUserDto request)
        {
            var response = await _authRepository.Register( new User { Username = request.Username }, request.Password);

            if (!response.Success)
            {
                return BadRequest(response);
            }
            return Ok(response);
        }

        [HttpPost("login")]
        public async Task<ActionResult<ServiceResponse<string>>> Login(LoginUserDto request)
        {
            var response = await _authRepository.Login(
                    request.Username, request.Password
                );

            if (!response.Success)
            {
                return BadRequest(response);
            }
            return Ok(response);
        }

    }
}
