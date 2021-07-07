using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace FrontEnd.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
        public ActionResult Products()
        {
            ViewBag.Message = "Your contact page.";

            var products = new List<FrontEnd.Models.Products>
            {
                new FrontEnd.Models.Products {Id = 1 , Name = "Test Name1", Description = "Test Description1"},
                new FrontEnd.Models.Products {Id = 2 , Name = "Test Name2", Description = "Test Description2"},
                new FrontEnd.Models.Products {Id = 3 , Name = "Test Name3", Description = "Test Description3"},
                new FrontEnd.Models.Products {Id = 4 , Name = "Test Name4", Description = "Test Description4"},
                new FrontEnd.Models.Products {Id = 4 , Name = "Test NameYes", Description = "Test DescriptionYes"}
            };


            return View(products.ToList());
        }

        public ActionResult Orders()
        {
            ViewBag.Message = "Orders.";
            var orders = new List<FrontEnd.Models.Orders>
            {
                new FrontEnd.Models.Orders { Id = 1, Name="test", Count = 4 },
                new FrontEnd.Models.Orders { Id = 2, Name="test1", Count = 2 },
                new FrontEnd.Models.Orders { Id = 3, Name="test2", Count = 5 }
            };
            return View(orders.ToList());
        }

        public ActionResult CountBy(int count)
        {
            return View(count++);
        }

        public ActionResult Login()
        {
            ViewBag.Message = "Login.";

            return View();
        }
    }
}