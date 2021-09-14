using Backend_MyTask.DataAccess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend_MyTask.Service.Entity
{
    public interface IUserRepository
    {
        Task<IEnumerable<User>> ReadAll();
        Task Create(User user);
        Task<User> Read(Guid id);
        Task Update(User user);
        Task Delete(Guid id);
    }
}
