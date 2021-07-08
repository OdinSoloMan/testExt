using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FrontEnd.Models
{
    public class Products
    {
        public Guid Guid { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
    }
}