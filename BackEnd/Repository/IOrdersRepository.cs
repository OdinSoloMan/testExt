using BackEnd.DataAccess;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackEnd.Repository
{
    public interface IOrdersRepository
    {
        IEnumerable ReadAll();
        void Create(Orders orders);
        Orders Read(Guid GuidOrdersId);
        void Update(Orders orders);
        void Delete(Guid GuidOrdersId);
    }
}
