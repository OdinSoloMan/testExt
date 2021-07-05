using BackEnd.DataAccess;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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
