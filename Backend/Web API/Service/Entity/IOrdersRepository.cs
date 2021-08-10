using BackEnd.DataAccess;
using BackEnd.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BackEnd.Repository
{
    public interface IOrdersRepository
    {
        Task<IEnumerable<Orders>> ReadAll();
        Task Create(Orders orders);
        Task<Orders> Read(Guid GuidOrdersId);
        Task Update(Orders orders);
        Task Delete(Guid GuidOrdersId);
        //тестовый метод для фронта пока нету аторизации
        //так же после нужно добавить при считывания название продукта а не его id
        Task<object> ReadInfoOrders(string id_user);
        Task CraateList(Orders[] orders);
        //Read info oredrs user per page
        Task<Page> ReadInfoOredrsUserPerPage(string id_user, int rows, int next);
    }
}
