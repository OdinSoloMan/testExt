using Backend_MyTask.DataAccess;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend_MyTask.Service.Entity
{
    public class UserRepository : IUserRepository
    {
        private readonly ApplicationDatabaseContext db = new ApplicationDatabaseContext();

        public async Task Create(User user)
        {
            await db.AddAsync(user);
            db.SaveChanges();
        }

        public async Task Delete(Guid id)
        {
            User user = await db.Users.FindAsync(id);
            if (user != null)
                db.Users.Remove(user);
            db.SaveChanges();
        }

        public async Task<User> Read(Guid id) =>
            await db.Users.FindAsync(id);

        public async Task<IEnumerable<User>> ReadAll() =>
            await db.Users.ToListAsync();

        public async Task Update(User user)
        {
            db.Entry(user).State = EntityState.Modified;
            await db.SaveChangesAsync();
        }
    }
}
