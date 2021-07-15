using BackEnd.DataAccess;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BackEnd.Repository
{
    public interface IProductsRepository
    {
        Task<IEnumerable<Products>> ReadAll();
        Task Create(Products products);
        Task<Products> Read(Guid GuidProductsId);
        Task Update(Products products);
        Task Delete(Guid GuidProductsId);
    }
}
