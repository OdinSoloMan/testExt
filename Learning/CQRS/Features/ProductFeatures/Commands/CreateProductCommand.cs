using CQRS.Context;
using CQRS.Models;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace CQRS.Features.ProductFeatures.Commands
{
    public class CreateProductCommand : IRequest<int>
    {
        public string Name { get; set; }
        public string Barcode { get; set; }
        public string Description { get; set; }
        public decimal BuyingPrice { get; set; }
        public decimal Rate { get; set; }

        public class CreateProductCommandHandler : IRequestHandler<CreateProductCommand, int>
        {
            public readonly IApplicationContext _context;

            public CreateProductCommandHandler(IApplicationContext context)
            {
                _context = context;
            }

            public async Task<int> Handle(CreateProductCommand command,
                                          CancellationToken cancellationToken)
            {
                var product = new Product
                {
                    Name = command.Name,
                    Barcode = command.Barcode,
                    Description = command.Description,
                    BuyingPrice = command.BuyingPrice,
                    Rate = command.Rate
                };
                _context.Products.Add(product);
                await _context.SaveChangesAsync();
                return product.Id;
            }
        }
    }
}
