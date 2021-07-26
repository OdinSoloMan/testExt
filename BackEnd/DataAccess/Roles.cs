using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace BackEnd.DataAccess
{
    public class Roles
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }

        //public List<Users> Users { get; set; } = new List<Users>();

        //public Roles()
        //{
        //    Id = 0;
        //    Name = "";
        //}

        //public Roles(string _Name)
        //{
        //    Name = _Name;
        //}

        //public void CreateRole(string _Name)
        //{
        //    Name = _Name;
        //}
    }
}
