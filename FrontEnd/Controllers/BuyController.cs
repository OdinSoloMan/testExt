using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace FrontEnd.Controllers
{
    public class BuyController : Controller
    {
        // GET: Buy
        public ActionResult Index()
        {
            return View();
        }

        public void GetData(string[] items)
        {
            string result = "";
            foreach (var item in items)
                result += item + "; ";
        }
    }
}