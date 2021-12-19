var config = require('../config');
const sql = require('mssql');

async function getVentas(userId){
    try {
        let db = await sql.connect(config);
        let ventas = await db.request()
                .input("UserId",sql.Int, userId)
                .query("SELECT v.Id, u.Nombre as NombreComprador, u.Apellido, p.Nombre as NombreProducto, p.Precio, v.Fecha "+
                        "FROM Ventas as v INNER JOIN Productos as p ON v.ProductId = p.Id INNER JOIN Usuarios as u ON v.UserIdComprador = u.Id "+
                        "WHERE p.UserId = @UserId");
        return ventas.recordsets;
    }
    catch(error){
        console.log(error);
    }
}

async function getCompras(userId){
    try {
        let db = await sql.connect(config);
        let ventas = await db.request()
                .input("UserId",sql.Int, userId)
                .query("SELECT v.Id, v.Fecha, p.Nombre as NombreProducto, p.Precio, u.Nombre as NombreUsuario, u.Apellido "+
                        "FROM Ventas as v INNER JOIN Productos as p ON v.ProductId = p.Id INNER JOIN Usuarios as u ON p.UserId = u.Id "+
                        "WHERE v.UserIdComprador = @UserId");
        return ventas.recordsets;
    }
    catch(error){
        console.log(error);
    }
}

async function getVenta(id){
    try{
        let db = await sql.connect(config);
        let venta = await db.request()
                .input('Id', sql.Int, id)
                .query("SELECT * FROM Ventas WHERE Id = @Id");
        return venta.recordsets;
    }
    catch(error){
        console.log(error);
    }
}

async function addVenta(venta){
    try{
        let db = await sql.connect(config);
        let now = new Date();
        let nuevaVenta = await db.request()
                .input('UserIdComprador', sql.Int, venta.UserIdComprador)
                .input('ProductId',sql.Int, venta.ProductId)
                .input('Fecha', sql.DateTime, now.toLocaleString('en-US'))
                .query("INSERT INTO Ventas([UserIdComprador],[ProductId],[Fecha]) VALUES (@UserIdComprador,@ProductId,@Fecha)");

        await db.request()
                .input('ProductId',sql.Int, venta.ProductId)
                .query("UPDATE Productos SET Disponible = 0 WHERE Id = @ProductId")
        
        return nuevaVenta.recordsets;
    }
    catch(error){
        console.log(error);
    }
}

module.exports = {
    addVenta,
    getVenta,
    getVentas,
    getCompras
}