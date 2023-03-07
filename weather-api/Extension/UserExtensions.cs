using System.Security.Claims;

namespace Weather_Api.Extension
{
    public static class UserExtensions
    {
        public static int GetUserId(IHttpContextAccessor httpContextAccessor)
        {
            return int.Parse(httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier));
        }
    }
}
