using Microsoft.AspNetCore.Mvc.Filters;
using System;

namespace BackEnd.Filter
{

    public class SimpleResourceFilter : Attribute, IResourceFilter
    {
        public void OnResourceExecuting(ResourceExecutingContext context)
        {
            context.HttpContext.Response.Cookies.Append("LastVisit", DateTime.Now.ToString("dd/MM/yyyy hh-mm-ss"));
        }
        public void OnResourceExecuted(ResourceExecutedContext context)
        {
            // реализация отсутствует
        }
    }
}
