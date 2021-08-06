-------- Products --------
-- Add
create procedure [dbo].[AddProducts]
	@Id_Product UniqueIdentifier,
	@Name nvarchar(450),
	@Description nvarchar(max)
as
begin try
	begin transaction
		insert into Products (Id_Product, Name, Description) Values  (@Id_Product, @Name, @Description)

	if @@TRANCOUNT > 0 
		commit transaction
	select @@TRANCOUNT As OpenTransactions
end try
begin catch
	rollback transaction
	select ERROR_NUMBER() AS ErrorNumber,
		   ERROR_STATE() AS ErrorState,
		   ERROR_SEVERITY() AS ErrorSeverity,
		   ERROR_PROCEDURE() AS ErrorProcedure,
		   ERROR_LINE() AS ErrorLine,
		   ERROR_MESSAGE() AS ErrorMessage
	return
end catch

go

-- Read All
create procedure [dbo].[SelectAllProducts]
as
begin try
	begin transaction
		select * from Products

	if @@TRANCOUNT > 0
		commit transaction
end try
begin catch
	rollback transaction
	select ERROR_NUMBER() AS ErrorNumber,
		   ERROR_STATE() AS ErrorState,
		   ERROR_SEVERITY() AS ErrorSeverity,
		   ERROR_PROCEDURE() AS ErrorProcedure,
		   ERROR_LINE() AS ErrorLine,
		   ERROR_MESSAGE() AS ErrorMessage
	return
end catch

go

-- Read Id
create procedure [dbo].[ReadIdProducts]
	@Id_Product UniqueIdentifier
as
begin try
	begin transaction
		select * from Products where Id_Product = @Id_Product

	if @@TRANCOUNT > 0
		commit transaction
end try
begin catch
	rollback transaction
	select ERROR_NUMBER() AS ErrorNumber,
		   ERROR_STATE() AS ErrorState,
		   ERROR_SEVERITY() AS ErrorSeverity,
		   ERROR_PROCEDURE() AS ErrorProcedure,
		   ERROR_LINE() AS ErrorLine,
		   ERROR_MESSAGE() AS ErrorMessage
	return
end catch

-- Example
-- exec [dbo].[ReadIdProducts] @Id_Product = '784664b3-24f4-46c8-18b9-08d950244ae1'

go

-- Select
-- return await db.Products.FirstOrDefaultAsync(c => c.Name == name) != null;
create procedure [dbo].[SelectNameProducts]
	@Name nvarchar(450)
as
begin try
	begin transaction
		select * from Products where Name = @Name

	if @@TRANCOUNT > 0
		commit transaction
end try
begin catch
	rollback transaction
	select ERROR_NUMBER() AS ErrorNumber,
		   ERROR_STATE() AS ErrorState,
		   ERROR_SEVERITY() AS ErrorSeverity,
		   ERROR_PROCEDURE() AS ErrorProcedure,
		   ERROR_LINE() AS ErrorLine,
		   ERROR_MESSAGE() AS ErrorMessage
	return
end catch

-- Example
-- dbo.SelectNameProducts @Name = 'test1'

go

-- Update
create procedure [dbo].[UpdateProducts]
	@Id_Product UniqueIdentifier,
	@Name nvarchar(450),
	@Description nvarchar(max)
as
Begin try
	begin transaction 
		Update Products
		set Name = @Name,
		Description = @Description
		where Id_Product = @Id_Product

		select * from Products where Id_Product = @Id_Product
	   
	if @@TRANCOUNT > 0
		commit transaction
end try 
begin catch
	rollback transaction
	select ERROR_NUMBER() AS ErrorNumber,
		   ERROR_STATE() AS ErrorState,
		   ERROR_SEVERITY() AS ErrorSeverity,
		   ERROR_PROCEDURE() AS ErrorProcedure,
		   ERROR_LINE() AS ErrorLine,
		   ERROR_MESSAGE() AS ErrorMessage
	return
end catch

go

-- delete
create procedure [dbo].[DeleteProducts]
	@Id_Product UniqueIdentifier
as
begin try
	begin transaction
		delete from Products where Id_Product = @Id_Product

	if @@TRANCOUNT > 0
		commit transaction
	select @@TRANCOUNT As OpenTransactions
end try
begin catch
	rollback transaction
	select ERROR_NUMBER() AS ErrorNumber,
		   ERROR_STATE() AS ErrorState,
		   ERROR_SEVERITY() AS ErrorSeverity,
		   ERROR_PROCEDURE() AS ErrorProcedure,
		   ERROR_LINE() AS ErrorLine,
		   ERROR_MESSAGE() AS ErrorMessage
	return
end catch

-- Example
-- exec [dbo].[DeleteProducts] @Id_Product = '405F37FC-92A7-4D7A-9081-2882F77425EE'

go

-------- Orders --------
-- Add
create procedure [dbo].[AddOrders]
	@Id_Order UniqueIdentifier,
	@Count int,
	@UsersId nvarchar(450),
	@ProductsId UniqueIdentifier
as
begin try
	begin transaction
		insert into Orders (Id_Order, Count, UsersId, ProductsId) Values  (@Id_Order, @Count, @UsersId, @ProductsId)

	if @@TRANCOUNT > 0 
		commit transaction
	select @@TRANCOUNT As OpenTransactions
end try
begin catch
	rollback transaction
	select ERROR_NUMBER() AS ErrorNumber,
		   ERROR_STATE() AS ErrorState,
		   ERROR_SEVERITY() AS ErrorSeverity,
		   ERROR_PROCEDURE() AS ErrorProcedure,
		   ERROR_LINE() AS ErrorLine,
		   ERROR_MESSAGE() AS ErrorMessage
	return
end catch

go

-- Read All
create procedure [dbo].[SelectAllOrders]
as
begin try
	begin transaction
		select * from Orders

	if @@TRANCOUNT > 0
		commit transaction
end try
begin catch
	rollback transaction
	select ERROR_NUMBER() AS ErrorNumber,
		   ERROR_STATE() AS ErrorState,
		   ERROR_SEVERITY() AS ErrorSeverity,
		   ERROR_PROCEDURE() AS ErrorProcedure,
		   ERROR_LINE() AS ErrorLine,
		   ERROR_MESSAGE() AS ErrorMessage
	return
end catch

go

-- Read Id
create procedure [dbo].[ReadIdOrders]
	@Id_Order UniqueIdentifier
as
begin try
	begin transaction
		select * from Orders where Id_Order = @Id_Order

	if @@TRANCOUNT > 0
		commit transaction
end try
begin catch
	rollback transaction
	select ERROR_NUMBER() AS ErrorNumber,
		   ERROR_STATE() AS ErrorState,
		   ERROR_SEVERITY() AS ErrorSeverity,
		   ERROR_PROCEDURE() AS ErrorProcedure,
		   ERROR_LINE() AS ErrorLine,
		   ERROR_MESSAGE() AS ErrorMessage
	return
end catch

go

-- Update
create procedure [dbo].[UpdateOrders]
	@Id_Order UniqueIdentifier,
	@Count int,
	@UsersId nvarchar(450),
	@ProductsId UniqueIdentifier
as
Begin try
	begin transaction 
		Update Orders
		set Count = @Count,
		UsersId = @UsersId,
		ProductsId = @ProductsId
		where Id_Order = @Id_Order

		select * from Orders where Id_Order = @Id_Order
	   
	if @@TRANCOUNT > 0
		commit transaction
end try 
begin catch
	rollback transaction
	select ERROR_NUMBER() AS ErrorNumber,
		   ERROR_STATE() AS ErrorState,
		   ERROR_SEVERITY() AS ErrorSeverity,
		   ERROR_PROCEDURE() AS ErrorProcedure,
		   ERROR_LINE() AS ErrorLine,
		   ERROR_MESSAGE() AS ErrorMessage
	return
end catch

go

-- delete
create procedure [dbo].[DeleteOrders]
	@Id_Order UniqueIdentifier
as
begin try
	begin transaction
		delete from Orders where Id_Order = @Id_Order

	if @@TRANCOUNT > 0
		commit transaction
	select @@TRANCOUNT As OpenTransactions
end try
begin catch
	rollback transaction
	select ERROR_NUMBER() AS ErrorNumber,
		   ERROR_STATE() AS ErrorState,
		   ERROR_SEVERITY() AS ErrorSeverity,
		   ERROR_PROCEDURE() AS ErrorProcedure,
		   ERROR_LINE() AS ErrorLine,
		   ERROR_MESSAGE() AS ErrorMessage
	return
end catch

go

-- Read info Orders User
create procedure [dbo].[ReadInfoOredersUser]
	@UsersId nvarchar(450)
as
begin try
	begin transaction
		select Orders.Id_Order, Orders.Count, Products.Name from Orders 
		inner Join Products on (Orders.ProductsId = Products.Id_Product) 
		where Orders.UsersId = @UsersId

	if @@TRANCOUNT > 0
		commit transaction
end try 
begin catch
	rollback transaction
	select ERROR_NUMBER() AS ErrorNumber,
		   ERROR_STATE() AS ErrorState,
		   ERROR_SEVERITY() AS ErrorSeverity,
		   ERROR_PROCEDURE() AS ErrorProcedure,
		   ERROR_LINE() AS ErrorLine,
		   ERROR_MESSAGE() AS ErrorMessage
	return
end catch

go

-- Add Orders List
CREATE TYPE IdTypeOrder AS TABLE 
( ID UniqueIdentifier, Count int, UsersId nvarchar(450), ProductsId UniqueIdentifier);
GO
--
CREATE PROCEDURE [dbo].[AddOrdersList]
	@ArrProduct IdTypeOrder readonly
as
Begin try
	begin transaction 
	   	insert into Orders (Id_Order, Count, UsersId, ProductsId)
			select ID, Count, UsersId, ProductsId from @ArrProduct
	 select @@TRANCOUNT As OpenTransactions
	 commit transaction
end try 
begin catch
	rollback transaction
		select @@TRANCOUNT As OpenTransactions
	return
end catch

-- Example
-- объявление переменной этой типа таблицы
-- DECLARE @Orders IdTypeOrder

-- Example
-- ввод значений в эту табличную переменную
-- INSERT INTO @Orders(ID, Count, UsersId, ProductsId) VALUES ('7b591334-791c-47ac-a11b-58b3d13a16c5', 70, 'fc515d2c-e28d-4051-be73-b61ecbfadaf1', '990E96AA-2813-4C2A-8A11-4DE54E819258'), ('1f6d4df9-7c8d-4de7-bd4e-849de3b8b8d6', 71, 'fc515d2c-e28d-4051-be73-b61ecbfadaf1', '1945A201-8851-45C9-89D9-7E926D462C35')

-- Example
-- выполнение хранимой процедуры с этой таблицей в качестве входного параметра
--EXECUTE [dbo].[AddOrdersList] @Orders

go

---- Additional ----
---- Products
-- Count Products
create procedure [dbo].[CountProducts]
as
begin try
	begin transaction
		select count(*) as _Count  from Products

	if @@TRANCOUNT > 0
		commit transaction
end try
begin catch
	rollback transaction
	select ERROR_NUMBER() AS ErrorNumber,
		   ERROR_STATE() AS ErrorState,
		   ERROR_SEVERITY() AS ErrorSeverity,
		   ERROR_PROCEDURE() AS ErrorProcedure,
		   ERROR_LINE() AS ErrorLine,
		   ERROR_MESSAGE() AS ErrorMessage
	return
end catch

-- Example
-- exec dbo.CountProducts;

go

-- Products per page
create procedure [dbo].[ProductsPerPage]
	 @Rows int,
	 @Next int
as
begin try
	begin transaction
		select * from Products 
		order by Id_Product 
		OFFSET @Rows ROWS FETCH NEXT @Next ROWS ONLY;

	if @@TRANCOUNT > 0
		commit transaction
end try
begin catch
	rollback transaction
	select ERROR_NUMBER() AS ErrorNumber,
		   ERROR_STATE() AS ErrorState,
		   ERROR_SEVERITY() AS ErrorSeverity,
		   ERROR_PROCEDURE() AS ErrorProcedure,
		   ERROR_LINE() AS ErrorLine,
		   ERROR_MESSAGE() AS ErrorMessage
	return
end catch

go

-- Products per page info
create procedure [dbo].[ProductsPerPageInfo]
	 @Rows int,
	 @Next int
as
begin try
	begin transaction
		select count(*) as _Count  from Products

		select * from Products 
		order by Id_Product 
		OFFSET @Rows ROWS FETCH NEXT @Next ROWS ONLY;

	if @@TRANCOUNT > 0
		commit transaction
end try
begin catch
	rollback transaction
	select ERROR_NUMBER() AS ErrorNumber,
		   ERROR_STATE() AS ErrorState,
		   ERROR_SEVERITY() AS ErrorSeverity,
		   ERROR_PROCEDURE() AS ErrorProcedure,
		   ERROR_LINE() AS ErrorLine,
		   ERROR_MESSAGE() AS ErrorMessage
	return
end catch

-- Example
--exec dbo.[ProductsPerPageInfo] 0, 5

go

---- Orders
-- Count Orders User
create procedure [dbo].[CountOrdersUser]
	@UsersId nvarchar(450)
as
begin try
	begin transaction
		select Count(Orders.Id_Order) As _Count from Orders 
		inner Join Products on (Orders.ProductsId = Products.Id_Product) 
		where Orders.UsersId = @UsersId

	if @@TRANCOUNT > 0
		commit transaction
end try 
begin catch
	rollback transaction
	select ERROR_NUMBER() AS ErrorNumber,
		   ERROR_STATE() AS ErrorState,
		   ERROR_SEVERITY() AS ErrorSeverity,
		   ERROR_PROCEDURE() AS ErrorProcedure,
		   ERROR_LINE() AS ErrorLine,
		   ERROR_MESSAGE() AS ErrorMessage
	return
end catch

-- Example
-- exec dbo.[CountOrdersUser] '0f16d45c-f5db-4846-8ad7-1f8b2e8e5e56'

go

-- Read info oredrs user per page
create procedure [dbo].[ReadInfoOredrsUserPerPage]
	@UsersId nvarchar(450),
	@Rows int,
	@Next int
as
begin try
	begin transaction
		select Orders.Id_Order, Orders.Count, Products.Name from Orders 
		inner Join Products on (Orders.ProductsId = Products.Id_Product) 
		where Orders.UsersId = @UsersId
		order by Orders.Id_Order 
		OFFSET @Rows ROWS FETCH NEXT @Next ROWS ONLY;

	if @@TRANCOUNT > 0
		commit transaction
end try 
begin catch
	rollback transaction
	select ERROR_NUMBER() AS ErrorNumber,
		   ERROR_STATE() AS ErrorState,
		   ERROR_SEVERITY() AS ErrorSeverity,
		   ERROR_PROCEDURE() AS ErrorProcedure,
		   ERROR_LINE() AS ErrorLine,
		   ERROR_MESSAGE() AS ErrorMessage
	return
end catch

-- Example
-- exec dbo.[ReadInfoOredrsUserPerPage] '0f16d45c-f5db-4846-8ad7-1f8b2e8e5e56', 0, 5

go

-- Info oredrs user per page
create procedure [dbo].[InfoOredrsUserPerPage]
	@UsersId nvarchar(450),
	@Rows int,
	@Next int
as
begin try
	begin transaction
		select Count(Orders.Id_Order) As _Count from Orders 
			inner Join Products on (Orders.ProductsId = Products.Id_Product) 
			where Orders.UsersId = @UsersId

		select Orders.Id_Order, Orders.Count, Products.Name from Orders 
			inner Join Products on (Orders.ProductsId = Products.Id_Product) 
			where Orders.UsersId = @UsersId
			order by Orders.Id_Order 
			OFFSET @Rows ROWS FETCH NEXT @Next ROWS ONLY;

	if @@TRANCOUNT > 0
		commit transaction
end try 
begin catch
	rollback transaction
	select ERROR_NUMBER() AS ErrorNumber,
		   ERROR_STATE() AS ErrorState,
		   ERROR_SEVERITY() AS ErrorSeverity,
		   ERROR_PROCEDURE() AS ErrorProcedure,
		   ERROR_LINE() AS ErrorLine,
		   ERROR_MESSAGE() AS ErrorMessage
	return
end catch

go

-- Example
-- exec dbo.[InfoOredrsUserPerPage] '0f16d45c-f5db-4846-8ad7-1f8b2e8e5e56', 0, 5

---- Filter ----
-- filter input
create procedure [dbo].[FiltersProductList]
	@Name nvarchar(450)
as
begin try
	begin transaction
		select top 10 * from dbo.Products where dbo.Products.Name LIKE @Name+'%'

	if @@TRANCOUNT > 0
		commit transaction
end try 
begin catch
	rollback transaction
	select ERROR_NUMBER() AS ErrorNumber,
		   ERROR_STATE() AS ErrorState,
		   ERROR_SEVERITY() AS ErrorSeverity,
		   ERROR_PROCEDURE() AS ErrorProcedure,
		   ERROR_LINE() AS ErrorLine,
		   ERROR_MESSAGE() AS ErrorMessage
	return
end catch

-- Example
-- exec dbo.FiltersProductList ''

go

-- Filter enter
create procedure [dbo].[ProductsPerPageInfoAndFilter]
	 @Rows int,
	 @Next int,
	 @Filter nvarchar(450)
as
begin try
	begin transaction
		select count(*) as _Count  from Products  where dbo.Products.Name LIKE @Filter+'%'

		select * from Products
		where dbo.Products.Name LIKE @Filter+'%'
		order by Id_Product 
		OFFSET @Rows ROWS FETCH NEXT @Next ROWS ONLY;

	if @@TRANCOUNT > 0
		commit transaction
end try
begin catch
	rollback transaction
	select ERROR_NUMBER() AS ErrorNumber,
		   ERROR_STATE() AS ErrorState,
		   ERROR_SEVERITY() AS ErrorSeverity,
		   ERROR_PROCEDURE() AS ErrorProcedure,
		   ERROR_LINE() AS ErrorLine,
		   ERROR_MESSAGE() AS ErrorMessage
	return
end catch

-- Example
-- exec dbo.[ProductsPerPageInfoAndFilter] 0, 5, 'test'