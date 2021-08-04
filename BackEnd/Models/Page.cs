using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackEnd.Models
{
    public class Page
    {
        public object Data { get; set; }
        public int TotalPages { get; set; }
        public int TotalPassengers { get; set; }
    }
}
