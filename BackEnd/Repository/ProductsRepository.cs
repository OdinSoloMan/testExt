using BackEnd.DataAccess;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections;
using WebApplication.DataAccess;

namespace BackEnd.Repository
{
    public class ProductsRepository : IProductsRepository
    {
        private AppDatabaseContext db = new AppDatabaseContext();

        public void Create(Products products)
        {
            db.Products.Add(products);
            db.SaveChanges();
        }

        public void Delete(Guid GuidProductsId)
        {
            Products products = db.Products.Find(GuidProductsId);
            if (products != null)
                db.Products.Remove(products);
            db.SaveChanges();
        }

        public Products Read(Guid GuidProductsId)
        {
            return db.Products.Find(GuidProductsId);
        }

        public IEnumerable ReadAll()
        {
            return db.Products;
        }

        public void Update(Products products)
        {
            db.Entry(products).State = EntityState.Modified;
            db.SaveChanges();
        }
    }
}
