using CQRS.Models;
using CQRS.Repository;
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
            private readonly IProductRepository _repository;

            public CreateProductCommandHandler(IProductRepository repository)
            {
                _repository = repository;
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
                return await _repository.Create(product);
            }
        }
    }
}
