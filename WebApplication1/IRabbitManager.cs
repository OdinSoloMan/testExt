using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1
{
    public interface IRabbitManager
    {
        void Publish<T>(T message, string exchangeName, string exchangeType, string routeKey)
        where T : class;
    }
}
