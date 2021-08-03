using Autofac;
using BackEnd.Repository;
using BackEnd.Service.AdoNet;
using BackEnd.Services;

namespace BackEnd.Dependency
{
    public class DependencyRegister: Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            // Entity
            //builder.RegisterType<ProductsRepository>().As<IProductsRepository>().InstancePerLifetimeScope();
            //builder.RegisterType<OrdersRepository>().As<IOrdersRepository>().InstancePerLifetimeScope();

            // Ado.Net
            builder.RegisterType<ProductsService>().As<IProductsService>().InstancePerLifetimeScope();
            builder.RegisterType<OrdersService>().As<IOrdersService>().InstancePerLifetimeScope();

            //
            builder.RegisterType<TokenService>().As<ITokenService>().InstancePerLifetimeScope();
        }
    }
}
