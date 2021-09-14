using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Backend_MyTask.DataAccess
{
    public class MyTask
    {
        [Key]
        public Guid Id { get; set; }

        [Required(ErrorMessage = "{0} is required")]
        [DisplayName("Name")]
        [StringLength(50, MinimumLength = 3, ErrorMessage = "Part {0} must be between {2} and {1} character(s) in length.")]
        public string Name { get; set; }

        [Required(ErrorMessage = "{0} is required")]
        [DisplayName("Description")]
        [StringLength(150, MinimumLength = 3, ErrorMessage = "Part {0} must be between {2} and {1} character(s) in length.")]
        public string Description { get; set; }

        public string File { get; set; }

        public DateTime DateTime { get; set; }

        [Required(ErrorMessage = "{0} is required")]
        public Guid BoardId { get; set; }
        public Board Board { get; set; }

        public MyTask()
        {
            Id = new Guid();
            Name = "";
            Description = "";
            File = "";
            DateTime = new DateTime();
        }

        public void MyTaskCreate(string _Name, string _Description, string _File, DateTime _DateTime)
        {
            Name = _Name;
            Description = _Description;
            File = _File;
            DateTime = _DateTime;
        }
    }
}
