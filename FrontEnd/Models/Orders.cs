﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FrontEnd.Models
{
    public class Orders
    {
        public Guid Id_Order { get; set; }
        public string Name { get; set; }
        public int Count { get; set; }
    }
}