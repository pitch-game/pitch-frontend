using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Pitch.Api.Supporting;
using System.Threading.Tasks;

namespace Pitch.Api.Controllers.Api
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [Route("api/[controller]")]
    [ApiController]
    public class ProfileController : ControllerBase
    {
        private readonly ICurrentUserContext _currentUserContext;

        public ProfileController(ICurrentUserContext currentUserContext)
        {
            _currentUserContext = currentUserContext;
        }

        [HttpGet]
        public async Task<JsonResult> Get()
        {
            return new JsonResult(await _currentUserContext.User());
        }
    }
}
