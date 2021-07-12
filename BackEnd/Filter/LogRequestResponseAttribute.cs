using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Serilog;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackEnd.Filter
{
    public class LogRequestResponseAttribute : TypeFilterAttribute
    {
        public LogRequestResponseAttribute() : base(typeof(LogRequestResponseImplementation)) { }

        private class LogRequestResponseImplementation : IAsyncResultFilter
        {
            public async Task OnResultExecutionAsync(ResultExecutingContext context, ResultExecutionDelegate next)
            {
                var requestHeadersText = CommonLoggingTools.SerializeHeaders(context.HttpContext.Request.Headers);
                Log.Information("requestHeaders: " + requestHeadersText);

                var requestBodyText = await CommonLoggingTools.FormatRequestBody(context.HttpContext.Request);
                Log.Information("requestBody: " + requestBodyText);

                await next();

                var responseHeadersText = CommonLoggingTools.SerializeHeaders(context.HttpContext.Response.Headers);
                Log.Information("responseHeaders: " + responseHeadersText);

                var responseBodyText = await CommonLoggingTools.FormatResponseBody(context.HttpContext.Response);
                Log.Information("responseBody: " + responseBodyText);
            }
        }
    }
}
