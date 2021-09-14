using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Backend_MyTask.DataAccess
{
    [MetadataType(typeof(UserMetadata))]
    [Index("Username", IsUnique = true, Name = "Username_Index")]
    public class User
    {
        [Key]
        public Guid Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }

        public ICollection<Task> Tasks { get; set; }

        public User()
        {
            Id = new Guid();
            Username = "";
            Password = "";
        }
    }

    internal sealed class UserMetadata
    {
        [Required(ErrorMessage = "Username is required.")]
        [StringLength(50, ErrorMessage = "Username length it 3 before 50", MinimumLength = 3)]
        public string Username;

        [Required(ErrorMessage = "Password is required.")]
        [StringLength(50, ErrorMessage = "Password length it 5 before 50", MinimumLength = 5)]
        public string Password;
    }
}
