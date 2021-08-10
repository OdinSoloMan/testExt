using System;

namespace RabbitMQServices.Client
{
    public class ScopedConsoleColour : IDisposable
    {
        private readonly ConsoleColor oldColour;

        public ScopedConsoleColour(ConsoleColor newColour)
        {
            oldColour = Console.ForegroundColor;

            Console.ForegroundColor = newColour;
        }

        public void Dispose()
        {
            Console.ForegroundColor = oldColour;
        }
    }
}
