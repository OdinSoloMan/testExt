using System;
using System.ComponentModel.DataAnnotations;

namespace BackEnd.DataAccess
{
    public class Orders
    {
        [Key]
        public Guid Id_Order { get; set; }
        public int Count { get; set; }
        public string UsersId { get; set; }
        public Guid ProductsId { get; set; }
        public Products Products { get; set; }

        public Orders()
        {
            Id_Order = new Guid();
            Count = 0;
            UsersId = "";
            ProductsId = new Guid();
        }

        public Orders(int _Count, string _IdUsers, Guid _IdProducts)
        {
            Count = _Count;
            UsersId = _IdUsers;
            ProductsId = _IdProducts;
        }

        public void CreateOrders(int _Count, string _IdUsers, Guid _IdProducts)
        {
            Count = _Count;
            UsersId = _IdUsers;
            ProductsId = _IdProducts;
        }
    }
}
