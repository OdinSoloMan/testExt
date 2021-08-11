using CQRS.Context;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Linq;
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
            private readonly IApplicationContext _context;

            public UpdateProductCommandHandler(IApplicationContext context)
            {
                _context = context;
            }

            public async Task<int> Handle(UpdateProductCommand command,
                                          CancellationToken cancellationToken)
            {
                var product = await _context.Products.Where(a => a.Id == command.Id).FirstOrDefaultAsync();
                if (product == null)
                {
                    return default;
                }
                else
                {
                    product.Name = command.Name;
                    product.Barcode = command.Barcode;
                    product.Description = command.Description;
                    product.BuyingPrice = command.BuyingPrice;
                    product.Rate = command.Rate;
                    await _context.SaveChangesAsync();
                    return product.Id;
                }
            }
        }
    }
}
