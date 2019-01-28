using Microsoft.EntityFrameworkCore;

namespace PitchApi.Data
{
    public class AuthorizationDbContext : DbContext
    {
        public AuthorizationDbContext(DbContextOptions options) : base(options)
        {
        }
    }
}