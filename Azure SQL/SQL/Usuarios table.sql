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

SELECT v.Id, v.UserIdComprador, v.ProductId, v.Fecha
FROM Ventas as v INNER JOIN Productos as p ON v.ProductId = p.Id
WHERE p.UserId = 1

SELECT Fondos FROM Usuarios WHERE Id = 1