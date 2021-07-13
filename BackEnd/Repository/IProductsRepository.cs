using BackEnd.DataAccess;
using System;
using System.Collections;

namespace BackEnd.Repository
{
    public interface IProductsRepository
    {
        IEnumerable ReadAll();
        void Create(Products products);
        Products Read(Guid GuidProductsId);
        void Update(Products products);
        void Delete(Guid GuidProductsId);
    }
}
