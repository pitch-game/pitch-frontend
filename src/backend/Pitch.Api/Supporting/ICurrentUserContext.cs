using System.Threading.Tasks;
using Pitch.DataStorage.Models;

namespace Pitch.Api.Supporting
{
    public interface ICurrentUserContext
    {
        Task<User> User();
    }
}