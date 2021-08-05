using BackEnd.DataAccess;
using BackEnd.Models;
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

        public async Task<object> ReadInfoOrders(string id_user)
        {
            return await db.Orders.Where(c => c.UsersId == id_user)
                .Join(db.Products,
                    u => u.ProductsId,
                    c => c.Id_Product,
                    (u, c) => new
                    {
                        u.Id_Order,
                        c.Name,
                        u.Count
                    }).ToListAsync();
        }

        public async Task CraateList(Orders[] orders)
        {
            await db.Orders.AddRangeAsync(orders);
            db.SaveChanges();
        }

        public Task<Page> ReadInfoOredrsUserPerPage(string id_user, int rows, int next)
        {
            var count = db.Orders.Where(c => c.UsersId == id_user).Count();

            int _totalPages = (int)Math.Round((float)count / (float)next);
            rows = (rows == 1) ? 0 : (rows != 0) ? ((rows - 1) * next) : 0;

            var data = db.Orders.Where(c => c.UsersId == id_user).
                Skip(rows).Take(next)
                .Join(db.Products,
                    u => u.ProductsId,
                    c => c.Id_Product,
                    (u, c) => new
                    {
                        u.Id_Order,
                        c.Name,
                        u.Count
                    }).ToList();
            var res = new Page() { Data = data, TotalPages = _totalPages, TotalPassengers = count };
            return Task.FromResult(res);
        }
    }
}
