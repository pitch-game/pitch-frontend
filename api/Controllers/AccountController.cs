using System.Threading.Tasks;
using api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

public class AccountController : ControllerBase
{
    private readonly SignInManager<ApplicationUser> _signInManager;
    private readonly UserManager<ApplicationUser> _userManager;
    public AccountController(SignInManager<ApplicationUser> signInManager, UserManager<ApplicationUser> userManager)
    {
        _signInManager = signInManager;
        _userManager = userManager;
    }

    public IActionResult SignInWithGoogle()
    {
        var authenticationProperties = _signInManager.ConfigureExternalAuthenticationProperties("Google", Url.Action(nameof(HandleExternalLogin)));
        return Challenge(authenticationProperties, "Google");
    }

    public async Task<IActionResult> HandleExternalLogin()
    {
        // var info = await _signInManager.GetExternalLoginInfoAsync();

        // var result = await _signInManager.ExternalLoginSignInAsync(info.LoginProvider, info.ProviderKey, isPersistent: false);

        // if (!result.Succeeded) //user does not exist yet
        // {
        //     var email = info.Principal.FindFirstValue(ClaimTypes.Email);
        //     var newUser = new ApplicationUser
        //     {
        //         UserName = email,
        //         Email = email,
        //         EmailConfirmed = true
        //     };
        //     var createResult = await _userManager.CreateAsync(newUser);
        //     if (!createResult.Succeeded)
        //         throw new Exception(createResult.Errors.Select(e => e.Description).Aggregate((errors, error) => $"{errors}, {error}"));

        //     await _userManager.AddLoginAsync(newUser, info);
        //     var newUserClaims = info.Principal.Claims.Append(new Claim("userId", newUser.Id));
        //     await _userManager.AddClaimsAsync(newUser, newUserClaims);
        //     await _signInManager.SignInAsync(newUser, isPersistent: false);
        //     await HttpContext.SignOutAsync(IdentityConstants.ExternalScheme);
        // }

        return Redirect("http://localhost:4200");
    }
}