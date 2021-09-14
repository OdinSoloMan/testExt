using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Backend_MyTask.DataAccess
{
    [MetadataType(typeof(BoardMetadata))]
    public class Board
    {
        [Key]
        public Guid Id { get; set; }
        public string Name { get; set; }

        public Guid TaskId { get; set; }
        public Task Task { get; set; }


        public Board()
        {
            Id = new Guid();
            Name = "";
            TaskId = new Guid();
        }
    }

    internal sealed class BoardMetadata
    {
        [Required(ErrorMessage = "Name is required")]
        [StringLength(50, ErrorMessage = "Name length it 3 before 50", MinimumLength = 3)]
        public string Name;

        [Required(ErrorMessage = "TaskId is required")]
        public Guid TaskId;
    }
}
