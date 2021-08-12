using CQRS.Models;
using CQRS.Repository;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace CQRS.Features.ProductFeatures.Commands
{
    public class UpdateProductCommand : IRequest<int>
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Barcode { get; set; }
        public string Description { get; set; }
        public decimal BuyingPrice { get; set; }
        public decimal Rate { get; set; }

        public class UpdateProductCommandHandler : IRequestHandler<UpdateProductCommand, int>
        {
            private readonly IProductRepository _repository;

            public UpdateProductCommandHandler(IProductRepository repository)
            {
                _repository = repository;
            }

            public async Task<int> Handle(UpdateProductCommand command,
                                          CancellationToken cancellationToken)
            {
                Product product = new Product
                {
                    Id = command.Id,
                    Name = command.Name,
                    Barcode = command.Barcode,
                    Description = command.Description,
                    BuyingPrice = command.BuyingPrice,
                    Rate = command.Rate
                };
                return await _repository.Update(product);
            }
        }
    }
}
