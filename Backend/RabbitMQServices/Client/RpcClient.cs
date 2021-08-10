using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System;
using System.Collections.Concurrent;
using System.Text;
using System.Threading.Tasks;

namespace RabbitMQServices.Client
{
    public class RpcClient : IDisposable
    {
        private bool disposed = false;
        private readonly IConnection connection;
        private readonly IModel channel;
        private readonly EventingBasicConsumer consumer;
        private readonly ConcurrentDictionary<string, TaskCompletionSource<string>> pendingMessages;

        private const string requestQueueName = "requestqueue";
        private const string responseQueueName = "responsequeue";
        private const string exchangeName = ""; // default exchange

        public RpcClient()
        {
            var factory = new ConnectionFactory() { HostName = "localhost" };

            connection = factory.CreateConnection();
            channel = connection.CreateModel();

            channel.QueueDeclare(requestQueueName, true, false, false, null);
            channel.QueueDeclare(responseQueueName, true, false, false, null);

            consumer = new EventingBasicConsumer(this.channel);
            consumer.Received += Consumer_Received;
            channel.BasicConsume(responseQueueName, true, consumer);

            pendingMessages = new ConcurrentDictionary<string, TaskCompletionSource<string>>();
        }

        public Task<string> SendAsync(string message)
        {
            var tcs = new TaskCompletionSource<string>();
            var correlationId = Guid.NewGuid().ToString();

            pendingMessages[correlationId] = tcs;

            Publish(message, correlationId);

            return tcs.Task;
        }

        private void Publish(string message, string correlationId)
        {
            var props = this.channel.CreateBasicProperties();
            props.CorrelationId = correlationId;
            props.ReplyTo = responseQueueName;

            byte[] messageBytes = Encoding.UTF8.GetBytes(message);
            channel.BasicPublish(exchangeName, requestQueueName, props, messageBytes);

            using var colour = new ScopedConsoleColour(ConsoleColor.Yellow);
            Console.WriteLine($"Sent: {message} with CorrelationId {correlationId}");
        }

        private void Consumer_Received(object sender, BasicDeliverEventArgs e)
        {
            var correlationId = e.BasicProperties.CorrelationId;
            var message = Encoding.UTF8.GetString(e.Body.ToArray());

            using (ScopedConsoleColour colour = new ScopedConsoleColour(ConsoleColor.Yellow))
            {
                Console.WriteLine($"Received: {message} with CorrelationId {correlationId}");
            }

            pendingMessages.TryRemove(correlationId, out var tcs);
            if (tcs != null)
                tcs.SetResult(message);
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
            if (!disposed && disposing)
            {
                channel?.Dispose();
                connection?.Dispose();
            }

            disposed = true;
        }
    }
}
