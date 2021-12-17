var config = require('../config');
const sql = require('mssql');

async function getProductos(){
    try {
        let db = await sql.connect(config);
        let productos = await db.request().query("SELECT * FROM Productos");
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

module.exports = {
    getProductos,
    getProducto,
    addProducto,
    removeProducto,
    updateProducto
}