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