using BackEnd.DataAccess;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BackEnd.Repository
{
    public interface IUsersRepository
    {
        Task <IEnumerable<Users>> ReadAll();
        Task Create(Users users);
        Task<Users> Read(Guid GuidUsersId);
        Task Update(Users users);
        Task Delete(Guid GuidUsersId);
        //тестовая проверка на что такой пользователь есть
        Task<Users> Authorization(string username, string password);
        //checking that if such an entry
        Task<bool> Select(string username);
    }
}
