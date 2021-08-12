using CQRS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CQRS.Repository
{
    public interface IProductRepository
    {
        Task<int> Create(Product product);
        Task<int> Delete(int id);
        Task<int> Update(Product product);
        Task<IEnumerable<Product>> GetAll();
        Task<Product> GetById(int id);
    }
}
