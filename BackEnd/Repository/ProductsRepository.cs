using BackEnd.DataAccess;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using WebApplication.DataAccess;

namespace BackEnd.Repository
{
    public class ProductsRepository : IProductsRepository
    {
        private readonly AppDatabaseContext db = new AppDatabaseContext();

        public async Task Create(Products products)
        {
            await db.Products.AddAsync(products);
            db.SaveChanges();
        }

        public async Task Delete(Guid GuidProductsId)
        {
            Products products = await db.Products.FindAsync(GuidProductsId);
            if (products != null)
                db.Products.Remove(products);
            db.SaveChanges();
        }

        public async Task<Products> Read(Guid GuidProductsId)
        {
            return await db.Products.FindAsync(GuidProductsId);
        }

        public async Task<IEnumerable<Products>> ReadAll()
        {
            return await db.Products.ToListAsync();
        }

        public async Task Update(Products products)
        {
            db.Entry(products).State = EntityState.Modified;
            await db.SaveChangesAsync();
        }

        public async Task<bool> Select(string name)
        {
            return await db.Products.FirstOrDefaultAsync(c => c.Name == name) != null;
        }
    }
}
