using System.ComponentModel.DataAnnotations;

namespace BackEnd.DataAccess
{
    public class Roles
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
