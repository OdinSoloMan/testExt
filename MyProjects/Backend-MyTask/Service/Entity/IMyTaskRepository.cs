using Backend_MyTask.DataAccess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend_MyTask.Service.Entity
{
    public interface IMyTaskRepository
    {
        Task<IEnumerable<MyTask>> ReadAll();
        Task Create(MyTask myTask);
        Task<MyTask> Read(Guid id);
        Task Update(MyTask myTask);
        Task Delet(Guid id);
    }
}
