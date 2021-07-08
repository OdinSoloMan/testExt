using BackEnd.DataAccess;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication.DataAccess;

namespace BackEnd.Repository
{
    public class OrdersRepository : IOrdersRepository
    {
        private AppDatabaseContext db = new AppDatabaseContext();

        public void Create(Orders orders)
        {
            db.Orders.Add(orders);
            db.SaveChanges();
        }

        public void Delete(Guid GuidOrdersId)
        {
            Orders order = db.Orders.Find(GuidOrdersId);
            if (order != null)
                db.Orders.Remove(order);
            db.SaveChanges();
        }

        public Orders Read(Guid GuidOrdersId)
        {
            return db.Orders.Find(GuidOrdersId);
        }

        public IEnumerable ReadAll()
        {
            return db.Orders;
        }

        public void Update(Orders orders)
        {
            db.Entry(orders).State = EntityState.Modified;
            db.SaveChanges();
        }

        public object ReadInfoOrders()
        {
            var s = db.Orders.Join(db.Products,
                u => u.ProductsId,
                c => c.Id_Product,
                (u, c) => new
                {
                    Id_Order = u.Id_Order,
                    Name = c.Name,
                    Count = u.Count
                });
            
            return s;
        }
    }
}
