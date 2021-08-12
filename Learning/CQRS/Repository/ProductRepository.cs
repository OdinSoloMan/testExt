using CQRS.Context;
using CQRS.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CQRS.Repository
{
    public class ProductRepository : IProductRepository
    {
        private readonly IApplicationContext _context;

        public ProductRepository(IApplicationContext context)
        {
            _context = context;
        }
        public async Task<int> Create(Product product)
        {
            _context.Products.Add(product);
            await _context.SaveChangesAsync();
            return product.Id;
        }

        public async Task<int> Delete(int id)
        {
            var product = await _context.Products.Where(a => a.Id == id).FirstOrDefaultAsync();
            if (product == null) return default;
            _context.Products.Remove(product);
            await _context.SaveChangesAsync();
            return product.Id;
        }

        public async Task<IEnumerable<Product>> GetAll()
        {
            var productList = await _context.Products.ToListAsync();
            if (productList == null)
            {
                return null;
            }
            return productList.AsReadOnly();
        }

        public async Task<Product> GetById(int id)
        {
            var product = await _context.Products.Where(a => a.Id == id).FirstOrDefaultAsync();
            if (product == null)
            {
                return null;
            };
            return product;
        }

        public async Task<int> Update(Product product)
        {
            var _product = await _context.Products.Where(a => a.Id == product.Id).FirstOrDefaultAsync();
            if (product == null)
            {
                return default;
            }
            else
            {
                _product.Name = product.Name;
                _product.Barcode = product.Barcode;
                _product.Description = product.Description;
                _product.BuyingPrice = product.BuyingPrice;
                _product.Rate = product.Rate;
                await _context.SaveChangesAsync();
                return product.Id;
            }
        }
    }
}
