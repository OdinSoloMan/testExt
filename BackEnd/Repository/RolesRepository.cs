using BackEnd.DataAccess;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using WebApplication.DataAccess;

namespace BackEnd.Repository
{
    public class RolesRepository : IRolesRepository
    {
        private readonly AppDatabaseContext db = new AppDatabaseContext();
        public async Task Create(Roles roles)
        {
            await db.Roles.AddAsync(roles);
            db.SaveChanges();
        }

        public async Task Delete(int Id)
        {
            Roles roles = await db.Roles.FindAsync(Id);
            if (roles != null)
                db.Roles.Remove(roles);
            db.SaveChanges();
        }

        public async Task<Roles> Read(int Id)
        {
            return await db.Roles.FindAsync(Id);
        }

        public async Task<IEnumerable<Roles>> ReadAll()
        {
            return await db.Roles.ToListAsync();
        }

        public async Task Update(Roles roles)
        {
            db.Entry(roles).State = EntityState.Modified;
            await db.SaveChangesAsync();
        }
    }
}
