using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FrontEnd.Models
{
    public class TestBuy
    {
        public Guid Id_Product { get; set; }
        public int Count { get; set; }
        public string Name { get; set; }
    }
}