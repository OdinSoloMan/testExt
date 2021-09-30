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

        /*
            from ei in eventInstances
            from sm in ei.StaffMembers
            from x in
            (from vi in ei.Visits
             join st in ei.Students on vi.PersonId equals st.Id
             select new { vi, st }) // Here you get students and visits side-by-side
            select new
            {
                ei.EventId,
                Event = ei.Name,
                StaffMemeber = sm.Name,
                PersonId = x.st.Id,
                Student = x.st.Name
            }
         */
        public async Task<object> ReadUserBoard(Guid id)
        {
            return await (from u in db.Boards
                   where u.UserId == id.ToString()
                   join p in db.MyTasks on u.Id equals p.BoardId into gj
                   from x in gj.DefaultIfEmpty()
                   select new
                   {
                       Id = u.Id,
                       Name = u.Name,
                       UserId = u.UserId,
                       tasks = (x == null ? null : x)
                   }).ToListAsync();
        }

        public async Task Update(Board board)
        {
            db.Entry(board).State = EntityState.Modified;
            await db.SaveChangesAsync();
        }
    }
}
