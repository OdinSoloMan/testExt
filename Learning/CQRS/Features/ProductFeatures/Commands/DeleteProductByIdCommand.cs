using CQRS.Repository;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace CQRS.Features.ProductFeatures.Commands
{
    public class DeleteProductByIdCommand : IRequest<int>
    {
        public int Id { get; set; }

        public class DeleteProductByIdCommandHandler : IRequestHandler<DeleteProductByIdCommand, int>
        {
            private readonly IProductRepository _repository;

            public DeleteProductByIdCommandHandler(IProductRepository repository)
            {
                _repository = repository;
            }

            public async Task<int> Handle(DeleteProductByIdCommand command,
                                          CancellationToken cancellationToken)
            {
                return await _repository.Delete(command.Id);
            }
        }
    }
}
