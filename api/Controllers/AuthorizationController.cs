using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using api.Models;
using AspNet.Security.OpenIdConnect.Primitives;
using AspNet.Security.OpenIdConnect.Server;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using OpenIddict.Core;
using OpenIddict.EntityFrameworkCore.Models;

public class AuthorizationController : Controller
{
    private readonly OpenIddictApplicationManager<OpenIddictApplication> _applicationManager;
    private readonly SignInManager<ApplicationUser> _signInManager;
    private readonly UserManager<ApplicationUser> _userManager;

    public AuthorizationController(OpenIddictApplicationManager<OpenIddictApplication> applicationManager,
        SignInManager<ApplicationUser> signInManager,
        UserManager<ApplicationUser> userManager)
    {
        _applicationManager = applicationManager;
        _signInManager = signInManager;
        _userManager = userManager;
    }

    [HttpGet("~/connect/token")]
    public async Task<IActionResult> Authorize(OpenIdConnectRequest request)
    {
        // Check if user is authenticated
        if (!User.Identity.IsAuthenticated)
            return Challenge("Google");

        // Create a new ClaimsPrincipal containing the claims that
        // will be used to create an id_token, a token or a code.
        var claims = new List<Claim>();
        claims.Add(new Claim(OpenIdConnectConstants.Claims.Subject, User.FindFirstValue(ClaimTypes.NameIdentifier)));
        claims.Add(new Claim(OpenIdConnectConstants.Claims.Name, User.FindFirstValue(ClaimTypes.Name)));
        claims.Add(new Claim(OpenIdConnectConstants.Claims.Email, User.FindFirstValue(ClaimTypes.Email)));
        claims.Add(new Claim(OpenIdConnectConstants.Claims.EmailVerified, "true"));
        var identity = new ClaimsIdentity(claims, "OpenIddict");
        var principal = new ClaimsPrincipal(identity);

        // Create a new authentication ticket holding the user identity.
        //var ticket = new AuthenticationTicket(principal, new AuthenticationProperties(), OpenIdConnectServerDefaults.AuthenticationScheme);

        // Returning a SignInResult will ask OpenIddict to issue the appropriate access/identity tokens.
        return SignIn(principal, OpenIdConnectServerDefaults.AuthenticationScheme);
    }
}
