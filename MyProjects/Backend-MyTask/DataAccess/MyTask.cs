using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Backend_MyTask.DataAccess
{
    [MetadataType(typeof(MyTaskMetadata))]
    public class MyTask
    {
        [Key]
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string File { get; set; }
        public DateTime DateTime { get; set; }

        public ICollection<Board> Boards { get; set; }

        public Guid UserId { get; set; }
        public User User { get; set; }


        public MyTask()
        {
            Id = new Guid();
            Name = "";
            Description = "";
            File = "";
            DateTime = new DateTime();
            UserId = new Guid();
        }
    }

    internal sealed class MyTaskMetadata
    {
        [Required(ErrorMessage = "Name is required")]
        [StringLength(50, ErrorMessage = "Name length it 3 before 50", MinimumLength = 3)]
        public string Name;

        [Required(ErrorMessage = "Description is required")]
        [StringLength(150, ErrorMessage = "Description length it 3 before 150", MinimumLength = 3)]
        public string Description;

        [DataType(DataType.DateTime)]
        public DateTime DateTime;

        [Required(ErrorMessage = "UserId is required")]
        public Guid UserId;
    }
}
