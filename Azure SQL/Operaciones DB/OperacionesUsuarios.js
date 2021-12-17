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

module.exports = {
    getUsuarios
}