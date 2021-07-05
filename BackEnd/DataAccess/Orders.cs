﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BackEnd.DataAccess
{
    public class Orders
    {
        [Key]
        public Guid Id_Order { get; set; }
        public int Count { get; set; }
        public Guid UsersId { get; set; }
        public Users Users { get; set; }
        public Guid ProductsId { get; set; }
        public Products Products { get; set; }
    }
}