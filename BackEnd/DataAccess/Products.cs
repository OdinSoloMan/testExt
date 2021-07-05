﻿using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace BackEnd.DataAccess
{
    [Index("Name", IsUnique = true, Name = "Name_Index")]
    public class Products
    {
        [Key]
        public Guid Id_Product { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        public List<Orders> orders { get; set; } = new List<Orders>();
    }
}