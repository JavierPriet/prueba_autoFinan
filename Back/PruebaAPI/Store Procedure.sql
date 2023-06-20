-- ================================================
-- Template generated from Template Explorer using:
-- Create Procedure (New Menu).SQL
--
-- Use the Specify Values for Template Parameters 
-- command (Ctrl-Shift-M) to fill in the parameter 
-- values below.
--
-- This block of comments will not be included in
-- the definition of the procedure.
-- ================================================
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
ALTER PROCEDURE SP_CRUD_USUARIOS --Nombre del SP
	-- Add the parameters for the stored procedure here
	@Accion varchar(10), --Variables, datos de entrada
	@Nombres varchar(50),
	@Apellidos varchar(50),
	@Edad int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	IF @Accion = '1' --Accion de consulta que retorna un json con toda la información
	BEGIN
		select (select * from Usuarios
		FOR JSON PATH) as Result
	END
	IF @Accion = '2' --Accion de Insertar datos y que retorna un json con toda la información
	BEGIN
		insert into Usuarios values (@Nombres,@Apellidos,@Edad)
		select (select * from Usuarios
		FOR JSON PATH) as Result
	END
	IF @Accion = '3' --Accion de Actualizar datos y que retorna un json con toda la información
	BEGIN
		Update Usuarios set Nombre = @Nombres,Apellido = @Apellidos,Edad = @Edad
		Where Nombre = @Nombres
		select (select * from Usuarios
		FOR JSON PATH) as Result
	END
	IF @Accion = '4' --Accion de Eliminar datos y que retorna un json con toda la información
	BEGIN
		Delete  from Usuarios where Nombre = @Nombres
		select (select * from Usuarios
		FOR JSON PATH) as Result
	END

END
GO
