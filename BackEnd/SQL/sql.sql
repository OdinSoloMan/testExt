---- ================================================
---- Template generated from Template Explorer using:
---- Create Procedure (New Menu).SQL
----
---- Use the Specify Values for Template Parameters 
---- command (Ctrl-Shift-M) to fill in the parameter 
---- values below.
----
---- This block of comments will not be included in
---- the definition of the procedure.
---- ================================================
--SET ANSI_NULLS ON
--GO
--SET QUOTED_IDENTIFIER ON
--GO
---- =============================================
---- Author:		<Author,,Name>
---- Create date: <Create Date,,>
---- Description:	<Description,,>
---- =============================================
--CREATE PROCEDURE <Procedure_Name, sysname, ProcedureName> 
--	-- Add the parameters for the stored procedure here
--	<@Param1, sysname, @p1> <Datatype_For_Param1, , int> = <Default_Value_For_Param1, , 0>, 
--	<@Param2, sysname, @p2> <Datatype_For_Param2, , int> = <Default_Value_For_Param2, , 0>
--AS
--BEGIN
--	-- SET NOCOUNT ON added to prevent extra result sets from
--	-- interfering with SELECT statements.
--	SET NOCOUNT ON;

--    -- Insert statements for procedure here
--	SELECT <@Param1, sysname, @p1>, <@Param2, sysname, @p2>
--END
--GO

--IsTrue
CREATE PROCEDURE [dbo].[CreateProductssss]
	@Id_Product UniqueIdentifier,
	@Name nvarchar(450),
	@Description nvarchar(max)
as
Begin 
	insert into Products (Id_Product, Name, Description) Values  (@Id_Product, @Name, @Description)
end

----isFalse не работает хочу вернуть что был успешно добавлен
CREATE PROCEDURE [dbo].[CreateProductsssssss]
	@Id_Product UniqueIdentifier,
	@Name nvarchar(450),
	@Description nvarchar(max)
as
Begin 
	insert into Products (Id_Product, Name, Description) Values  (@Id_Product, @Name, @Description)
	return 1
end

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

------------
--удаление 
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

EXEC [dbo].[DeleteProducts] @Id_Product = '722E9609-2CF7-4D9A-B4E6-0FBA35F7DB6C';


-- таблица, соответствующая входным параметрам
CREATE TYPE IdTypeProduct AS TABLE 
( ID UniqueIdentifier, Name NVARCHAR(50), Description nvarchar(max));
GO
--
CREATE PROCEDURE [dbo].[AddProductssss]
	@ArrProduct IdTypeProduct readonly
as
Begin try
	begin transaction 
	   	insert into Products (Id_Product, Name, Description)
			select ID, Name, Description from @ArrProduct
	 select @@TRANCOUNT As OpenTransactions
	 commit transaction
end try 
begin catch
	rollback transaction
		select @@TRANCOUNT As OpenTransactions
	return
end catch

-- declare a variable of that table type
DECLARE @Products IdTypeProduct

-- insert values into that table variable
INSERT INTO @Products(ID, Name, Description) 
VALUES ('4411FA3B-078C-4725-18B8-08D950244AE1', '2344444444456', 'nvarchar(max)'), ('4421FA3B-078C-4725-18B8-08D950244AE1', '1234444444564', 'nvarchar(max)')

-- execute your stored procedure with this table as input parameter
EXECUTE [dbo].[AddProductssss] @Products


--просто результат была ли обновленная запись
CREATE PROCEDURE [dbo].[UpdateProductssss]
	@Id_Product UniqueIdentifier,
	@Name nvarchar(450),
	@Description nvarchar(max)
as
Begin try
	begin transaction 
	   Update Products         
	   set Name=@Name,        
	   Description=@Description       
	   where Id_Product=@Id_Product
	   select @@TRANCOUNT As OpenTransactions
	   commit transaction
end try 
begin catch
	rollback transaction
		select @@TRANCOUNT As OpenTransactions
	return
end catch
EXEC [dbo].[UpdateProductssss] @Id_Product = '7F91FA3B-078C-4725-18B8-08D950244AE1', @Name = 'test1', @Description = 'nvarchar(max)';

--более подробный вывод об ошибке
CREATE PROCEDURE [dbo].[UpdateProductsss]
	@Id_Product UniqueIdentifier,
	@Name nvarchar(450),
	@Description nvarchar(max)
as
Begin try
	begin transaction 
	   Update Products         
	   set Name=@Name,        
	   Description=@Description       
	   where Id_Product=@Id_Product
	   select * from Products where Id_Product = @Id_Product
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

EXEC [dbo].[UpdateProductsss] @Id_Product = '7F91FA3B-078C-4725-18B8-08D950244AE1',	@Name = 'navaraaaachar(450)', @Description = 'nvarchar(max)';
EXEC [dbo].[UpdateProductsss] @Id_Product = '7F91FA3B-078C-4725-18B8-08D950244AE1',@Name = 'Zzzzzzas1', @Description = 'Zzzzzображения aaaa порядка, а также постоянное информационно-техническое...'

-- выводит результат если успешный
CREATE PROCEDURE [dbo].[UpdateProductss]
	@Id_Product UniqueIdentifier,
	@Name nvarchar(450),
	@Description nvarchar(max)
as
Begin try
	begin transaction 
	   Update Products         
	   set Name=@Name,        
	   Description=@Description       
	   where Id_Product=@Id_Product
	   select * from Products where Id_Product = @Id_Product
	   commit transaction
end try 
begin catch
	rollback transaction
	select error_number() AS [Number_error],
		   error_message() As [Description_error]
		   return 
end catch

EXEC [dbo].[UpdateProductss] @Id_Product = '7F91FA3B-078C-4725-18B8-08D950244AE1',	@Name = 'navaraaaachar(450)', @Description = 'nvarchar(max)';
EXEC [dbo].[UpdateProductss] @Id_Product = '64275902-2534-4F4F-18BC-08D950244AE1', @Name = 'test1', @Description = 'nvarchar(max)';

-- выводит сообщение об ошибке
CREATE PROCEDURE [dbo].[UpdateProducts]
	@Id_Product UniqueIdentifier,
	@Name nvarchar(450),
	@Description nvarchar(max)
as
Begin try
begin transaction 
   Update Products         
   set Name=@Name,        
   Description=@Description       
   where Id_Product=@Id_Product

end try 
    begin catch
        rollback transaction
         select error_number() AS [Nuber_error],
                error_message() As [Description_error]
        return 
    end catch
commit transaction
go

EXEC [dbo].[UpdateProducts] @Id_Product = '7F91FA3B-078C-4725-18B8-08D950244AE1', @Name = 'test1', @Description = 'nvarchar(max)';

