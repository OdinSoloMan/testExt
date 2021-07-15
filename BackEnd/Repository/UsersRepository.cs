using BackEnd.DataAccess;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using WebApplication.DataAccess;

namespace BackEnd.Repository
{
    public class UsersRepository : IUsersRepository
    {
        private readonly AppDatabaseContext db = new AppDatabaseContext();

        public async Task Create(Users users)
        {
            await db.Users.AddAsync(users);
            db.SaveChanges();
        }

        public async Task Delete(Guid GuidUsersId)
        {
            Users user = await db.Users.FindAsync(GuidUsersId);
            if (user != null)
                db.Users.Remove(user);
            db.SaveChanges();
        }

        public async Task<Users> Read(Guid GuidUsersId)
        {
            return await db.Users.FindAsync(GuidUsersId);
        }

        public async Task<IEnumerable<Users>> ReadAll()
        {
            return await db.Users.ToListAsync();
        }

        public async Task Update(Users users)
        {
            db.Entry(users).State = EntityState.Modified;
            await db.SaveChangesAsync();
        }

        public async Task<Users> Authorization(string username, string password)
        {
            return await db.Users.FirstOrDefaultAsync(x => x.Username == username && x.Password == password);
        }
    }
}
