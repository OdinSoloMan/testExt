using FrontEnd.Models;
using Newtonsoft.Json;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web;
using System.Web.Mvc;

namespace FrontEnd.Controllers
{
    public class HomeController : Controller
    {
        private readonly Uri URL = new Uri("https://localhost:5001/");
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

            HttpClient client = new HttpClient();
            client.BaseAddress = URL;
            client.DefaultRequestHeaders.Accept.Add(
                new MediaTypeWithQualityHeaderValue("application/json"));

            HttpResponseMessage response = client.GetAsync("products/readallproducts").Result;

            var products = new List<FrontEnd.Models.Products> { };

            if (response.IsSuccessStatusCode)
            {
                //var test = response.Content.ReadAsStringAsync().Result;
                //var test1 = JsonConvert.DeserializeObject<List<Products>>(test);
                products = JsonConvert.DeserializeObject<List<Products>>(response.Content.ReadAsStringAsync().Result);
            }
            else
            {
                var error = response.StatusCode + " : Message - " + response.ReasonPhrase;
            }

            return View(products);
        }

        public ActionResult Orders()
        {
            ViewBag.Message = "Orders.";

            HttpClient client = new HttpClient();
            client.BaseAddress = URL;
            client.DefaultRequestHeaders.Accept.Add(
                new MediaTypeWithQualityHeaderValue("application/json"));

            HttpResponseMessage response = client.GetAsync("orders/readinforders").Result;

            var orders = new List<FrontEnd.Models.Orders> { };

            if (response.IsSuccessStatusCode)
            {
                //var test = response.Content.ReadAsStringAsync().Result;
                //var test1 = JsonConvert.DeserializeObject<List<Orders>>(test);
                orders = JsonConvert.DeserializeObject<List<Orders>>(response.Content.ReadAsStringAsync().Result);
            }
            else
            {
                var error = response.StatusCode + " : Message - " + response.ReasonPhrase;
            }

            //var orders = new List<FrontEnd.Models.Orders>
            //{
            //    new FrontEnd.Models.Orders { Id_Order = 1, Name="test", Count = 4 },
            //    new FrontEnd.Models.Orders { Id_Order = 2, Name="test1", Count = 2 },
            //    new FrontEnd.Models.Orders { Id_Order = 3, Name="test2", Count = 5 }
            //};
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

        public void ActionMethodName(string id, string name)
        {
            string myId = id;
            string myName = name;
        }
    }
}