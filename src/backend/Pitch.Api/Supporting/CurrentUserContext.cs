using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Pitch.DataStorage.Models;
using Pitch.Domain.Services;
using System.Threading.Tasks;

namespace Pitch.Api.Supporting
{
    public class CurrentUserContext : ICurrentUserContext
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly IUserService _userService;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public CurrentUserContext(UserManager<IdentityUser> userManager, IUserService userService, IHttpContextAccessor httpContextAccessor)
        {
            _userManager = userManager;
            _userService = userService;
            _httpContextAccessor = httpContextAccessor;
        }

        private User _user;

        public async Task<User> User()
        {
            var user = await _userManager.GetUserAsync(_httpContextAccessor.HttpContext.User);
            return _user ?? (_userService.Get(user.Email));
        }
    }
}
