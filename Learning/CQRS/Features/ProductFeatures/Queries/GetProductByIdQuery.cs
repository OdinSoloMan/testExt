using CQRS.Models;
using CQRS.Repository;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace CQRS.Features.ProductFeatures.Queries
{
    public class GetProductByIdQuery : IRequest<Product>
    {
        public int Id { get; set; }

        public class GetProductByIdQueryHandler : IRequestHandler<GetProductByIdQuery, Product>
        {
            private readonly IProductRepository _repository;

            public GetProductByIdQueryHandler(IProductRepository repository)
            {
                _repository = repository;
            }

            public async Task<Product> Handle(GetProductByIdQuery query,
                                              CancellationToken cancellationToken)
            {
                return await _repository.GetById(query.Id);
            }
        }
    }
}
