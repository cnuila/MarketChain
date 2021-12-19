var config = require('../config');
const sql = require('mssql');

async function getProductosByUser(userId){
    try {
        let db = await sql.connect(config);
        let productos = await db.request()
                .input("UserId",sql.Int,userId)
                .query("SELECT * FROM Productos WHERE UserId = @UserId");
        return productos.recordsets;
    }
    catch(error){
        console.log(error);
    }
}

async function getProducto(id){
    try{
        let db = await sql.connect(config);
        let producto = await db.request()
                .input('Id', sql.Int, id)
                .query("SELECT * FROM Productos WHERE Id = @Id");
        return producto.recordsets;
    }
    catch(error){
        console.log(error);
    }
}

async function addProducto(producto){
    try{
        let db = await sql.connect(config);
        let nuevoProducto = await db.request()
                .input('Nombre', sql.NVarChar, producto.Nombre)
                .input('Descripcion',sql.NVarChar, producto.Descripcion)
                .input('Precio', sql.Decimal, producto.Precio)
                .input('UserId', sql.Int, producto.UserId)
                .input('Disponible', sql.Bit, producto.Disponible)
                .query("INSERT INTO Productos([Nombre],[Descripcion],[Precio],[UserId],[Disponible]) VALUES (@Nombre,@Descripcion,@Precio,@UserId,@Disponible)");
        return nuevoProducto.recordsets;
    }
    catch(error){
        console.log(error);
    }
}

async function removeProducto(id){
    try{
        let db = await sql.connect(config);
        await db.request()
                .input('Id', sql.Int, id)
                .query("DELETE FROM Productos WHERE Id = @Id");
    }
    catch(error){
        console.log(error);
    }
}

async function updateProducto(producto){
    try{
        let db = await sql.connect(config);
        await db.request()
                .input('Id', sql.Int, producto.Id)
                .input('Nombre', sql.NVarChar, producto.Nombre)
                .input('Descripcion',sql.NVarChar, producto.Descripcion)
                .input('Precio', sql.Decimal, producto.Precio)
                .input('Disponible', sql.Bit, producto.Disponible)
                .query("UPDATE Productos SET Nombre = @Nombre, Descripcion = @Descripcion, Precio = @Precio, Disponible = @Disponible WHERE Id = @Id");
        return producto;
    }
    catch(error){
        console.log(error);
    }
}

async function getProductosMarket(userId){
    try{
        let db = await sql.connect(config);
        let productosMarket = await db.request()
                .input('UserId', sql.Int, userId)
                .query("SELECT p.Id, p.Nombre as NombreProducto, p.Descripcion, p.Precio, u.Nombre as NombreUsuario, u.Apellido " +
                        "FROM Productos as p INNER JOIN Usuarios as u ON p.UserId = u.Id " +
                        "WHERE p.Disponible = 1 AND p.UserId != @UserId");
        return productosMarket.recordsets;
    }
    catch(error){
        console.log(error);
    }
}

module.exports = {
    getProductosByUser,
    getProducto,
    addProducto,
    removeProducto,
    updateProducto,
    getProductosMarket
}