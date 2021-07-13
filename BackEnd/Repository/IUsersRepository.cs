using BackEnd.DataAccess;
using System;
using System.Collections;

namespace BackEnd.Repository
{
    public interface IUsersRepository
    {
        IEnumerable ReadAll();
        void Create(Users users);
        Users Read(Guid GuidUsersId);
        void Update(Users users);
        void Delete(Guid GuidUsersId);

        //тестовая проверка на что такой пользователь есть
        object Authorization(string username, string password);
    }
}
