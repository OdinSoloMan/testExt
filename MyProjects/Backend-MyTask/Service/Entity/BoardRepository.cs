using Backend_MyTask.DataAccess;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend_MyTask.Service.Entity
{
    public class BoardRepository : IBoardRepository
    {
        private readonly ApplicationDatabaseContext db = new ApplicationDatabaseContext();
        
        public async Task Create(Board board)
        {
            await db.AddAsync(board);
            db.SaveChanges();
        }

        public async Task Delete(Guid id)
        {
            Board board = await db.Boards.FindAsync(id);
            if (board != null)
                db.Boards.Remove(board);
            db.SaveChanges();
        }

        public async Task<Board> Read(Guid id) =>
            await db.Boards.FindAsync(id);

        public async Task<IEnumerable<Board>> ReadAll() =>
            await db.Boards.ToListAsync();

        public async Task Update(Board board)
        {
            db.Entry(board).State = EntityState.Modified;
            await db.SaveChangesAsync();
        }
    }
}
