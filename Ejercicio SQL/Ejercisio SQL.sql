--Creacion de tablas Inicio
CREATE TABLE Clientes(
	[Pkid] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [varchar](100) NOT NULL,
	[Ubicacion] [varchar](500) NOT NULL,
 CONSTRAINT [PK_Clientes] PRIMARY KEY CLUSTERED 
(
	[Pkid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO


CREATE TABLE Productos(
	[Pkid] [int] IDENTITY(1,1) NOT NULL,
	[NombreProducto] [varchar](100) NOT NULL,
	[Precio] [numeric](18, 0) NOT NULL,
 CONSTRAINT [PK_Productos] PRIMARY KEY CLUSTERED 
(
	[Pkid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

CREATE TABLE Pedidos(
	[Pkid] [int] IDENTITY(1,1) NOT NULL,
	[FkIdCliente] [int] NOT NULL,
	[FkIdProducto] [int] NOT NULL,
	[Cantidad] [int] NOT NULL,
	[FechaPedido] [date] NOT NULL,
 CONSTRAINT [PK_Pedidos] PRIMARY KEY CLUSTERED 
(
	[Pkid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO


--Creacion de tablas Fin
--Creacion Registros Inicio
insert into Clientes values ('Pepito','Bogota')
insert into Clientes values ('Juanito','Cali')
insert into Clientes values ('Camilo','Medellin')

insert into Productos values('Peras',150)
insert into Productos values('Manzanas',100)
insert into Productos values('Bananos',120)

insert into Pedidos values (1,1,5,getdate())
insert into Pedidos values (1,2,1,getdate())
insert into Pedidos values (2,3,6,getdate())
insert into Pedidos values (2,1,4,getdate())

--Creacion Registros Fin

--Consulta

select C.Nombre,P.FechaPedido,Pr.NombreProducto,SUM(P.Cantidad) as 'Cantidad'
from Pedidos as P
inner join Clientes as C on P.FkIdCliente = C.Pkid
inner join Productos as Pr on P.FkIdProducto = Pr.Pkid
group by C.Nombre,P.FechaPedido,Pr.NombreProducto
order by P.FechaPedido