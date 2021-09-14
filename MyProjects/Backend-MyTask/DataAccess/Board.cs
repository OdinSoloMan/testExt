using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Backend_MyTask.DataAccess
{
    public class Board
    {
        [Key]
        public Guid Id { get; set; }

        [Required(ErrorMessage = "{0} is required")]
        [DisplayName("Name")]
        [StringLength(50, MinimumLength = 3, ErrorMessage = "Part {0} must be between {2} and {1} character(s) in length.")]
        public string Name { get; set; }

        //[Required(ErrorMessage = "{0} is required")]
        //[DisplayName("MyTaskId")]
        //public Guid MyTaskId { get; set; }
        //public MyTask MyTask { get; set; }

        [Required(ErrorMessage = "{0} is required")]
        [DisplayName("UserId")]
        public Guid UserId { get; set; }
        public User User { get; set; }

        public ICollection<MyTask> MyTasks { get; set; }



        public Board()
        {
            Id = new Guid();
            Name = "";
        }

        public void BoardCreate(string _Name, Guid _UserId)
        {
            Name = _Name;
            UserId = _UserId;
        }
    }
}
