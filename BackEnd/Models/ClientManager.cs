using IdentityServer4.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackEnd.Models
{
    internal static class ClientManager
    {
        public static IEnumerable<Client> Clients =>
            new List<Client>
            {
                    new Client
                    {
                         ClientName = "Client Application1",
                         ClientId = "t8agr5xKt4$3",
                    },
                    new Client
                    {
                         ClientName = "Client Application2",
                         ClientId = "3X=nNv?Sgu$S",
                    }
            };
    }
}
