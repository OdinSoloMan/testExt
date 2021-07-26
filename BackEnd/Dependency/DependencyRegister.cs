using Autofac;
using BackEnd.Repository;
using BackEnd.Services;

namespace BackEnd.Dependency
{
    public class DependencyRegister: Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            //builder.RegisterType<UsersRepository>().As<IUsersRepository>().InstancePerLifetimeScope();
            builder.RegisterType<ProductsRepository>().As<IProductsRepository>().InstancePerLifetimeScope();
            builder.RegisterType<OrdersRepository>().As<IOrdersRepository>().InstancePerLifetimeScope();
            builder.RegisterType<TokenService>().As<ITokenService>().InstancePerLifetimeScope();
            //builder.RegisterType<RolesRepository>().As<IRolesRepository>().InstancePerLifetimeScope();
        }
    }
}
