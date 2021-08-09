using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System;
using System.Text;

namespace RpcServerApp
{
    class Program
    {
        private static IModel channel;

        static void Main(string[] args)
        {
            Console.Title = "RabbitMQ RPC Server";

            var factory = new ConnectionFactory() { HostName = "localhost" };

            using (var connection = factory.CreateConnection())
            {
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
        }

        private static void Consumer_Received(object sender, BasicDeliverEventArgs e)
        {
            var requestMessage = Encoding.UTF8.GetString(e.Body.ToArray());
            var correlationId = e.BasicProperties.CorrelationId;
            string responseQueueName = e.BasicProperties.ReplyTo;

            Console.WriteLine($"Received: {requestMessage} with CorrelationId {correlationId}");

            var responseMessage = Reverse(requestMessage);
            Publish(responseMessage, correlationId, responseQueueName);
        }

        public static string Reverse(string s)
        {
            char[] charArray = s.ToCharArray();
            Array.Reverse(charArray);
            return new string(charArray);
        }

        private static void Publish(string responseMessage, string correlationId,
            string responseQueueName)
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
