using BackEnd.DataAccess;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BackEnd.Repository
{
    public interface IRolesRepository
    {
        Task<IEnumerable<Roles>> ReadAll();
        Task Create(Roles roles);
        Task<Roles> Read(int Id);
        Task Update(Roles roles);
        Task Delete(int Id);
    }
}
