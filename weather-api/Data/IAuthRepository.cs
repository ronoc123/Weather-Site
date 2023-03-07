using Weather_Api.Dto.UserDtos;
using Weather_Api.Model;

namespace Weather_Api.Data
{
    public interface IAuthRepository
    {
        Task<ServiceResponse<int>> Register(User user, string password);

        Task<ServiceResponse<string>> Login(string username, string password);

        Task<bool> UserExists(string Username);

        Task<ServiceResponse<GetUserDto>> GetCurrentUser();
    }
}
