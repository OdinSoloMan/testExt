using BackEnd.DataAccess;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BackEnd.Service.AdoNet
{
    public interface IOrdersService
    {
        Task<IEnumerable<Orders>> ReadAll();
        Task Create(Orders orders);
        Task<Orders> Read(Guid GuidOrdersId);
        Task Update(Orders orders);
        Task Delete(Guid GuidOrdersId);
        Task<object> ReadInfoOrders(string id_user);
        Task CraateList(Orders[] orders);
    }
}
