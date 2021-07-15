using BackEnd.DataAccess;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication.DataAccess;

namespace BackEnd.Repository
{
    public class OrdersRepository : IOrdersRepository
    {
        private readonly AppDatabaseContext db = new AppDatabaseContext();

        public async Task Create(Orders orders)
        {
            await db.Orders.AddAsync(orders);
            db.SaveChanges();
        }

        public async Task Delete(Guid GuidOrdersId)
        {
            Orders order = await db.Orders.FindAsync(GuidOrdersId);
            if (order != null)
                db.Orders.Remove(order);
            db.SaveChanges();
        }

        public async Task<Orders> Read(Guid GuidOrdersId)
        {
            return await db.Orders.FindAsync(GuidOrdersId);
        }

        public async Task<IEnumerable<Orders>> ReadAll()
        {
            return await db.Orders.ToListAsync();
        }

        public async Task Update(Orders orders)
        {
            db.Entry(orders).State = EntityState.Modified;
            await db.SaveChangesAsync();
        }

        public async Task<object> ReadInfoOrders(Guid id_user)
        {
            return await db.Orders.Where(c => c.UsersId == id_user)
                .Join(db.Products,
                    u => u.ProductsId,
                    c => c.Id_Product,
                    (u, c) => new
                    {
                        Id_Order = u.Id_Order,
                        Name = c.Name,
                        Count = u.Count
                    }).ToListAsync();
        }
    }
}
