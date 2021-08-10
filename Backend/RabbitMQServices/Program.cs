using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RabbitMQServices
{
    class Program
    {
        private static IModel channel;

        static void Main(string[] args)
        {
            Console.Title = "RabbitMQ RPC Server";

            var factory = new ConnectionFactory() { HostName = "localhost" };

            using var connection = factory.CreateConnection();
            using (channel = connection.CreateModel())
            {
                const string requestQueueName = "requestqueue";
                channel.QueueDeclare(requestQueueName, true, false, false, null);

                // consumer

                var consumer = new EventingBasicConsumer(channel);
                consumer.Received += Consumer_Received;
                channel.BasicConsume(requestQueueName, true, consumer);

                Console.WriteLine("Waiting for messages...");
                Console.WriteLine("Press ENTER to exit.");
                Console.WriteLine();
                Console.ReadLine();
            }
        }

        private static void Consumer_Received(object sender, BasicDeliverEventArgs e)
        {
            var requestMessage = Encoding.UTF8.GetString(e.Body.ToArray());
            var correlationId = e.BasicProperties.CorrelationId;
            string responseQueueName = e.BasicProperties.ReplyTo;

            Console.WriteLine($"Received: {requestMessage} with CorrelationId {correlationId}");

            var responseMessage = MessageRequest(requestMessage);
            Publish(responseMessage, correlationId, responseQueueName);
        }

        public static string MessageRequest(string str)
        {
            string[] arraySubstrings = DivideString(str);

            var tres = new string[arraySubstrings.Length];
            Task[] tasks = new Task[arraySubstrings.Length];

            foreach (var i in Enumerable.Range(0, tasks.Length))
            {
                tasks[i] = new Task(() =>
                {
                    //Console.WriteLine(Thread.CurrentThread.ManagedThreadId);
                    tres[i] = Reverse(arraySubstrings[i]);
                });
            }

            foreach (var t in tasks)
            {
                t.Start();
                //Console.WriteLine("   Task #{0}: {1}", t.Id, t.Status);
            }
            Task.WaitAll(tasks);

            var res = "";
            for (int i = tres.Length - 1; i >= 0; i--)
            {
                res += tres[i];
            }

            return res;
        }

        public static string[] DivideString(string str)
        {
            if (str.Length <= 7)
                return new string[] { str };

            int n = 2;
            for (int i = 4; i > 2; i--)
            {
                if (str.Length % i == 0)
                {
                    n = i;
                    break;
                }
            }

            var s = new string[n];
            int _totalPages = (int)Math.Round((float)str.Length / (float)n);

            s[0] = str.Substring(0, _totalPages);
            for (int i = 1; i < n - 1; i++)
            {
                str = str.Remove(0, _totalPages);
                s[i] = str.Substring(0, _totalPages);
            }
            s[n - 1] = str.Substring(_totalPages);

            return s;
        }

        public static string Reverse(string s)
        {
            char[] charArray = s.ToCharArray();
            Array.Reverse(charArray);
            return new string(charArray);
        }

        private static void Publish(string responseMessage, string correlationId, string responseQueueName)
        {
            byte[] responseMessageBytes = Encoding.UTF8.GetBytes(responseMessage);

            const string exchangeName = ""; // default exchange
            var responseProps = channel.CreateBasicProperties();
            responseProps.CorrelationId = correlationId;

            channel.BasicPublish(exchangeName, responseQueueName, responseProps, responseMessageBytes);

            Console.WriteLine($"Sent: {responseMessage} with CorrelationId {correlationId}");
            Console.WriteLine();
        }
    }
}
