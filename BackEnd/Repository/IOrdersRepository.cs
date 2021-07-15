using BackEnd.DataAccess;
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
        Task<object> ReadInfoOrders(Guid id_user);
    }
}
