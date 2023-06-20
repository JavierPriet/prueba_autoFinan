--Creacion de tablas Inicio
USE [PruebaFinanci]
GO

/****** Object:  Table [dbo].[Usuarios]    Script Date: 19/06/2023 10:27:44 p. m. ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE Usuarios(
	[PkId] [int] IDENTITY(1,1) NOT NULL,
	[Usuario] [varchar](50) NOT NULL,
	[Contraseña] [varchar](50) NOT NULL,
	[Nombre] [varchar](50) NOT NULL,
	[Correo] [varchar](100) NULL,
 CONSTRAINT [PK_Usuarios] PRIMARY KEY CLUSTERED 
(
	[PkId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

USE [PruebaFinanci]
GO

/****** Object:  Table [dbo].[TareasUsuario]    Script Date: 19/06/2023 10:29:34 p. m. ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE TareasUsuario(
	[PkId] [int] IDENTITY(1,1) NOT NULL,
	[FkIdUsuario] [int] NOT NULL,
	[Actividad] [varchar](500) NOT NULL,
	[Estado] [varchar](50) NOT NULL,
	[FechaCreacion] [date] NULL,
 CONSTRAINT [PK_TareasUsuario] PRIMARY KEY CLUSTERED 
(
	[PkId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO




--Creacion de tablas Fin

--Creacion de Sp Inicio

USE [PruebaFinanci]
GO

/****** Object:  StoredProcedure [dbo].[SP_LOGIN]    Script Date: 19/06/2023 10:30:02 p. m. ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Javier Prieto
-- Create date: 19/06/2023
-- Description:	Sp de validacion de credenciales de acceso
-- =============================================
CREATE PROCEDURE [dbo].[SP_LOGIN] 
	-- Add the parameters for the stored procedure here
	@P_USUARIO VARCHAR(50),
	@P_CONTRASEÑA VARCHAR(50)
	
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT (SELECT * FROM USUARIOS WHERE Usuario = @P_USUARIO AND Contraseña = @P_CONTRASEÑA
	FOR JSON PATH) as 'RESULTADO'
END
GO

USE [PruebaFinanci]
GO

/****** Object:  StoredProcedure [dbo].[SP_CRUD_USUARIOS]    Script Date: 19/06/2023 10:30:59 p. m. ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Javier Prieto
-- Create date: 19/06/2023
-- Description:	Sp de CRUD de la tabla de usuarios
-- =============================================
CREATE PROCEDURE [dbo].[SP_CRUD_USUARIOS]
	-- Add the parameters for the stored procedure here
	@P_PKID int,
	@P_USUARIO varchar(50),
	@P_PASSWORD varchar(100),
	@P_NOMBRE varchar(100),
	@P_CORREO varchar(100),
	@P_ACCION int

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	IF(@P_ACCION = 1)
	BEGIN
		INSERT INTO Usuarios (Usuario,Contraseña,Nombre,Correo) VALUES (@P_USUARIO,@P_PASSWORD,@P_NOMBRE,@P_CORREO)
		SELECT SCOPE_IDENTITY() AS 'PkId'
	END
	IF(@P_ACCION = 2)
	BEGIN
		SELECT (SELECT *
		FROM Usuarios
		FOR JSON PATH) as 'RESULTADO'
	END
	IF(@P_ACCION = 3)
	BEGIN
		UPDATE Usuarios
		SET Correo = @P_CORREO
		WHERE PkId = @P_PKID

		SELECT @P_PKID AS 'PkId'
	END
	IF(@P_ACCION = 4)
	BEGIN
		DELETE FROM  Usuarios
		WHERE PkId = @P_PKID

		SELECT @P_PKID AS 'PkId'
	END
END
GO

USE [PruebaFinanci]
GO

/****** Object:  StoredProcedure [dbo].[SP_CRUD_TAREAS_USUARIO]    Script Date: 19/06/2023 10:31:53 p. m. ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Javier Prieto
-- Create date: 19/06/2023
-- Description:	Sp de CRUD de la tabla de Tareas usuarios
-- =============================================
CREATE PROCEDURE [dbo].[SP_CRUD_TAREAS_USUARIO]
	-- Add the parameters for the stored procedure here
	@P_PKID as INT,
	@P_FK_ID_USUARIO INT,
	@P_ACTIVIDAD VARCHAR(500),
	@P_ESTADO VARCHAR(10),
	@P_ACCION INT
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	IF(@P_ACCION = 1)
	BEGIN
		INSERT INTO TareasUsuario (FkIdUsuario,Actividad,Estado,FechaCreacion) VALUES (@P_FK_ID_USUARIO,@P_ACTIVIDAD,@P_ESTADO,GETDATE())
		SELECT SCOPE_IDENTITY() AS 'PkId'
	END
	IF(@P_ACCION = 2)
	BEGIN
		SELECT (SELECT TareasUsuario.PkId,TareasUsuario.FkIdUsuario,TareasUsuario.Actividad,TareasUsuario.Estado,TareasUsuario.FechaCreacion
		,Usuarios.Nombre
		FROM TareasUsuario
		INNER JOIN Usuarios ON TareasUsuario.FkIdUsuario = Usuarios.PkId
		WHERE FkIdUsuario = @P_FK_ID_USUARIO and Estado = 'Progreso'
		ORDER BY FechaCreacion desc
		FOR JSON PATH) as 'RESULTADO'
	END
	IF(@P_ACCION = 3)
	BEGIN
		UPDATE TareasUsuario
		SET Estado = @P_ESTADO
		WHERE PkId = @P_PKID

		SELECT @P_PKID AS 'PkId'
	END
	IF(@P_ACCION = 4)
	BEGIN
		DELETE FROM  TareasUsuario
		WHERE PkId = @P_PKID

		SELECT @P_PKID AS 'PkId'
	END
END
GO
--Creacion de Sp Fin