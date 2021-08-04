using BackEnd.DataAccess;
using BackEnd.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BackEnd.Service.AdoNet
{
    public interface IProductsService
    {
        Task<IEnumerable<Products>> ReadAll();
        Task Create(Products products);
        Task<Products> Read(Guid GuidProductsId);
        Task Update(Products products);
        Task Delete(Guid GuidProductsId);
        Task<bool> Select(string name);
        //ProductsPerPage
        Task<Page> SelectProductsPerPage(int rows, int next);
    }
}
