using System;
using System.Threading.Tasks;

namespace RpcClientApp
{
    class Program
    {
        static async Task Main(string[] args)
        {
            Console.Title = "RabbitMQ RPC Client";

            using (var rpcClient = new RpcClient())
            {
                Console.WriteLine("Press ENTER or Ctrl+C to exit.");

                while (true)
                {
                    string message = null;

                    Console.Write("Enter a message to send: ");
                    using (var colour = new ScopedConsoleColour(ConsoleColor.Blue))
                        message = Console.ReadLine();

                    if (string.IsNullOrWhiteSpace(message))
                        break;
                    else
                    {
                        var response = await rpcClient.SendAsync(message);

                        Console.Write("Response was: ");
                        using (var colour = new ScopedConsoleColour(ConsoleColor.Green))
                            Console.WriteLine(response);
                    }
                }
            }
        }
    }
}
