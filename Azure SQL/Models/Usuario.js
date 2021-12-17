class Usuarios {
    constructor(_id,_nombre,_apellido,_email,_esVendedor){
        this.id = _id;
        this.nombre = _nombre;
        this.email = _email;
        this.esVendedor = _esVendedor;
    }
}

module.exports = Usuarios;