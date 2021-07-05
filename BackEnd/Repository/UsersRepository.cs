using BackEnd.DataAccess;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication.DataAccess;

namespace BackEnd.Repository
{
    public class UsersRepository : IUsersRepository
    {
        private AppDatabaseContext db = new AppDatabaseContext();

        public void Create(Users users)
        {
            db.Users.Add(users);
            db.SaveChanges();
        }

        public void Delete(Guid GuidUsersId)
        {
            Users events = db.Users.Find(GuidUsersId);
            if (events != null)
                db.Users.Remove(events);
            db.SaveChanges();
        }

        public Users Read(Guid GuidUsersId)
        {
            return db.Users.Find(GuidUsersId);
        }

        public IEnumerable ReadAll()
        {
            return db.Users;
        }

        public void Update(Users users)
        {
            db.Entry(users).State = EntityState.Modified;
            db.SaveChanges();
        }
    }
}
