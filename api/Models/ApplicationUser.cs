using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace api.Models
{
  public class ApplicationUser : IdentityUser
  {
    public long GoogleId { get; set; }
  }
}