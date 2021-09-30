using Backend_MyTask.DataAccess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend_MyTask.Service.Entity
{
    public interface IBoardRepository
    {
        Task<IEnumerable<Board>> ReadAll();
        Task Create(Board board);
        Task<Board> Read(Guid id);
        Task Update(Board board);
        Task Delete(Guid id);
        Task<object> ReadUserBoard(Guid id);
    }
}
