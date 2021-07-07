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

            return View();
        }

        public ActionResult Orders()
        {
            ViewBag.Message = "Orders.";

            return View();
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