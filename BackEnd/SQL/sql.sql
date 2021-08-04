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

exec [dbo].[ReadIdProducts] @Id_Product = '784664b3-24f4-46c8-18b9-08d950244ae1'

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

exec dbo.SelectNameProducts @Name = 'test1'

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

exec [dbo].[DeleteProducts] @Id_Product = '405F37FC-92A7-4D7A-9081-2882F77425EE'

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

-- объявление переменной этой типа таблицы
DECLARE @Orders IdTypeOrder

-- ввод значений в эту табличную переменную
INSERT INTO @Orders(ID, Count, UsersId, ProductsId) 
VALUES ('7b591334-791c-47ac-a11b-58b3d13a16c5', 70, 'fc515d2c-e28d-4051-be73-b61ecbfadaf1', '990E96AA-2813-4C2A-8A11-4DE54E819258'), ('1f6d4df9-7c8d-4de7-bd4e-849de3b8b8d6', 71, 'fc515d2c-e28d-4051-be73-b61ecbfadaf1', '1945A201-8851-45C9-89D9-7E926D462C35')

-- выполнение хранимой процедуры с этой таблицей в качестве входного параметра
EXECUTE [dbo].[AddOrdersList] @Orders
------------------------------------------------------------------------------------------------------------
-----TEST-----------------------
Create table tblEmployee(      
    EmployeeId int IDENTITY(1,1) NOT NULL,      
    Name varchar(20) NOT NULL,      
    City varchar(20) NOT NULL,      
    Department varchar(20) NOT NULL,      
    Gender varchar(6) NOT NULL      
)

Create procedure spAddEmployee
(        
    @Name VARCHAR(20),         
    @City VARCHAR(20),        
    @Department VARCHAR(20),        
    @Gender VARCHAR(6)        
)        
as         
Begin         
    Insert into tblEmployee (Name,City,Department, Gender)         
    Values (@Name,@City,@Department, @Gender)         
End

Create procedure spUpdateEmployee        
(        
   @EmpId INTEGER ,      
   @Name VARCHAR(20),       
   @City VARCHAR(20),      
   @Department VARCHAR(20),      
   @Gender VARCHAR(6)      
)        
as        
begin        
   Update tblEmployee         
   set Name=@Name,        
   City=@City,        
   Department=@Department,      
   Gender=@Gender        
   where EmployeeId=@EmpId        
End

Create procedure spDeleteEmployee       
(        
   @EmpId int        
)        
as         
begin        
   Delete from tblEmployee where EmployeeId=@EmpId        
End

Create procedure spGetAllEmployees      
as      
Begin      
    select *      
    from tblEmployee   
    order by EmployeeId      
End

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

exec dbo.CountProducts;

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

exec dbo.[CountOrdersUser] '0f16d45c-f5db-4846-8ad7-1f8b2e8e5e56'

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

exec dbo.[ReadInfoOredrsUserPerPage] '0f16d45c-f5db-4846-8ad7-1f8b2e8e5e56', 0, 5
