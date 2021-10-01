using Backend_MyTask.DataAccess;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend_MyTask.Service.Entity
{
    public class MyTaskRepository : IMyTaskRepository
    {
        private readonly ApplicationDatabaseContext db = new ApplicationDatabaseContext();
        public async Task Create(MyTask myTask)
        {
            await db.AddAsync(myTask);
            db.SaveChanges();
        }

        public async Task Delete(Guid id)
        {
            MyTask myTask = await db.MyTasks.FindAsync(id);
            if (myTask != null)
                db.MyTasks.Remove(myTask);
            db.SaveChanges();
        }

        public async Task<MyTask> Read(Guid id) =>
            await db.MyTasks.FindAsync(id);

        public async Task<IEnumerable<MyTask>> ReadAll() =>
            await db.MyTasks.ToListAsync();

        public async Task Update(MyTask myTask)
        {
            try
            {
                await Task.Run(async () =>
                {
                    db.MyTasks.Update(new MyTask
                    {
                        Id = myTask.Id,
                        BoardId = myTask.BoardId,
                        DateTime = myTask.DateTime,
                        Description = myTask.Description,
                        File = myTask.File,
                        Name = myTask.Name
                    });
                    await db.SaveChangesAsync();
                });
            }
            catch { }
        }
    }
}
