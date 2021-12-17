var config = require('../config');
const sql = require('mssql');

async function getUsuarios(){
    try {
        let db = await sql.connect(config);
        let usuarios = await db.request().query("SELECT * FROM Usuarios");
        return usuarios.recordsets;
    }
    catch(error){
        console.log(error);
    }
}

async function getUsuario(id){
    try{
        let db = await sql.connect(config);
        let usuario = await db.request()
                .input('Id', sql.Int, id)
                .query("SELECT * FROM Usuarios WHERE Id = @Id");
        return usuario.recordsets;
    }
    catch(error){
        console.log(error);
    }
}

async function addUsuario(usuario){
    try{
        let db = await sql.connect(config);
        let nuevoUsuario = await db.request()
                .input('Nombre', sql.NVarChar, usuario.Nombre)
                .input('Apellido',sql.NVarChar, usuario.Apellido)
                .input('Email', sql.NVarChar, usuario.Email)
                .input('EsVendedor', sql.Bit, usuario.EsVendedor)
                .input('Fondos',sql.Decimal, usuario.Fondos)
                .query("INSERT INTO Usuarios([Nombre],[Apellido],[Email],[EsVendedor],[Fondos]) VALUES (@Nombre,@Apellido,@Email,@EsVendedor,@Fondos)");
        return nuevoUsuario.recordsets;
    }
    catch(error){
        console.log(error);
    }
}

async function getFondosUsuario(id){
    try{
        let db = await sql.connect(config);
        let fondos = await db.request()
                .input('Id',sql.Int, id)
                .query("SELECT Fondos FROM Usuarios WHERE Id = @Id");
        return fondos.recordsets;
    }
    catch(error){
        console.log(error);
    }
}

async function updateUsuario(usuario){
    try{
        let db = await sql.connect(config);
        await db.request()
                .input('Id', sql.Int, usuario.Id)
                .input('Nombre', sql.NVarChar, usuario.Nombre)
                .input('Apellido',sql.NVarChar, usuario.Apellido)
                .input('Email', sql.NVarChar, usuario.Email)
                .input('EsVendedor', sql.Bit, usuario.EsVendedor)
                .input('Fondos', sql.Decimal, usuario.Fondos)
                .query("UPDATE Usuario SET Nombre = @Nombre, Apellido = @Apellido, Email = @Email, EsVendedor = @EsVendedor, Fondos = @Fondos WHERE Id = @Id");
        return usuario;
    }
    catch(error){
        console.log(error);
    }
}

module.exports = {
    getUsuarios,
    addUsuario,
    getFondosUsuario,
    getUsuario,
    updateUsuario
}