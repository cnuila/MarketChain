-- Tabla Ventas
USE [MarketChain]
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Ventas] (
	[Id] [int] IDENTITY(1,1) NOT NULL,
    [UserIdComprador] [int] NOT NULL,
    [ProductId] [int] NOT NULL,
    [Fecha] [datetime] NOT NULL,
 CONSTRAINT [PK_Ventas] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[Ventas]  WITH CHECK ADD  CONSTRAINT [FK_Ventas_Usuarios] FOREIGN KEY([UserIdComprador])
REFERENCES [dbo].[Usuarios] ([Id])
ON DELETE CASCADE
GO

ALTER TABLE [dbo].[Ventas] CHECK CONSTRAINT [FK_Ventas_Usuarios]
GO

ALTER TABLE [dbo].[Ventas]  WITH CHECK ADD  CONSTRAINT [FK_Ventas_Productos] FOREIGN KEY([ProductId])
REFERENCES [dbo].[Productos] ([Id])
ON DELETE NO ACTION
GO

ALTER TABLE [dbo].[Ventas] CHECK CONSTRAINT [FK_Ventas_Productos]
GO

-- Datos Prueba
INSERT INTO Ventas([UserIdComprador],[ProductId],[Fecha]) 
VALUES (2,1,'2000-12-06 00:00:00');