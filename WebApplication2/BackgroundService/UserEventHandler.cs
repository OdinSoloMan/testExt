using EasyNetQ;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace WebApplication2.BackgroundService
{
    public class UserRequest
    {
        public long id { get; set; }
        
        public UserRequest(long _id)
        {
            id = _id;
        }
    }

    public class UserResponce
    {
        public string Name { get; set; }

        public UserResponce() { }
    }

    public class UserEventHandler : Microsoft.Extensions.Hosting.BackgroundService
    {
        private readonly IBus _bus;

        public UserEventHandler(IBus bus)
        {
            _bus = bus;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            await _bus.Rpc.RespondAsync<UserRequest, UserResponce>(ProcessorUserRequest);
        }
        
        private UserResponce ProcessorUserRequest(UserRequest userRequest)
        {
            return new UserResponce() { Name = "Ipsum" };
        }
    }
}
