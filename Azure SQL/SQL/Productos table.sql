-- Tabla Productos
USE [MarketChain]
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Productos] (
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [nvarchar](150) NOT NULL,
    [Descripcion] [nvarchar](max) NOT NULL,
    [Precio] [decimal] NOT NULL,
    [UserId] [int] NOT NULL,
    [Disponible] [bit] NOT NULL,
 CONSTRAINT [PK_Productos] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[Productos]  WITH CHECK ADD  CONSTRAINT [FK_Productos_Usuarios] FOREIGN KEY([UserId])
REFERENCES [dbo].[Usuarios] ([Id])
ON DELETE CASCADE
GO

ALTER TABLE [dbo].[Productos] CHECK CONSTRAINT [FK_Productos_Usuarios]
GO

-- Datos Prueba
INSERT INTO Productos([Nombre],[Descripcion],[Precio],[UserId],[Disponible]) 
VALUES ('Airpods','Nuevos sin usar',2000.0,1,1);