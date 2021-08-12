using CQRS.Models;
using CQRS.Repository;
using MediatR;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace CQRS.Features.ProductFeatures.Queries
{
    public class GetAllProductsQuery : IRequest<IEnumerable<Product>>
    {
        public class GetAllProductsQuereHandler : IRequestHandler<GetAllProductsQuery, IEnumerable<Product>>
        {
            private readonly IProductRepository _repository;

            public GetAllProductsQuereHandler(IProductRepository repository)
            {
                _repository = repository;
            }

            public async Task<IEnumerable<Product>> Handle(GetAllProductsQuery query,
                                                           CancellationToken cancellationToken)
            {
                return await _repository.GetAll();
            }
        }
    }
}
