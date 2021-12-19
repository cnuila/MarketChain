-- Tabla Usuarios
USE [MarketChain]
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Usuarios] (
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [nvarchar](150) NOT NULL,
    [Apellido] [nvarchar](150) NOT NULL,
    [Email] [nvarchar](150) NOT NULL,
    [EsVendedor] [bit] NOT NULL,
    [Fondos] [decimal] NOT NULL,
 CONSTRAINT [PK_Usuarios] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

-- Datos Prueba
INSERT INTO Usuarios([Nombre],[Apellido],[Email],[EsVendedor],[Fondos]) 
VALUES ('Carlos','Nuila','cnuila14@icloud.com',0,100000),
        ('Daniel','Agurcia','cnuila20@icloud.com',0,100000);

-- Ventas del Usuario 1
SELECT v.Id, u.Nombre as NombreComprador, u.Apellido, p.Nombre as NombreProducto, p.Precio, v.Fecha
FROM Ventas as v INNER JOIN Productos as p ON v.ProductId = p.Id INNER JOIN Usuarios as u ON v.UserIdComprador = u.Id
WHERE p.UserId = 1

-- Fondos del Usuario 1
SELECT Fondos FROM Usuarios WHERE Id = 1

-- Productos que puede comprar el usuario 2
SELECT p.Id, p.Nombre, p.Descripcion, p.Precio, u.Nombre, u.Apellido 
FROM Productos as p INNER JOIN Usuarios as u ON p.UserId = u.Id
WHERE p.Disponible = 1 AND p.UserId != 2

-- Compras del Usuario 2
SELECT v.Id, v.Fecha, p.Nombre as NombreProducto, p.Precio, u.Nombre as NombreUsuario, u.Apellido
FROM Ventas as v INNER JOIN Productos as p ON v.ProductId = p.Id INNER JOIN Usuarios as u ON p.UserId = u.Id
WHERE v.UserIdComprador = 2;