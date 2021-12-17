var router = require('express').Router();
var productOperations = require('../Operaciones DB/OperacionesProductos');

router.get('/',function (request, response) {
    productOperations.getProductos().then((data) => {
        response.json(data[0]);
    }).catch((error) => {
        response.status(400).json({ msg: "Bad Request. " + error })
    });
});

router.post('/',function (request, response){
    let nuevoProducto = { ...request.body };
    
    productOperations.addProducto(nuevoProducto).then(data => {
        response.status(201).json(data);
    }).catch((error) => {
        response.status(400).json({ msg: "Bad Request. " + error })
    });
});

router.get('/:id', function(request, response){
    const { id } = request.params
    productOperations.getProducto(id).then((data) => {
        if (data[0].length === 0){
            return response.status(404).json({ msg: "No se encontró el producto."})
        }

        response.json(data[0]);
    }).catch((error) => {
        response.status(400).json({  msg: "Bad Request. " + error });
    });
});

router.delete('/:id', function(request, response){
    const { id } = request.params
    productOperations.removeProducto(id).then(() => {
        response.json({ msg: "Producto eliminado" });
    }).catch((error) => {
        response.status(400).json({ msg: "Bad Request. " + error})
    });
});

router.put('/:id', function(request, response){
    const { id } = request.params;
    const { Nombre, Descripcion, Precio, Disponible } = request.body;
    let producto = { "Id":id, Nombre, Descripcion, Precio, Disponible };
   
    productOperations.updateProducto(producto).then((data) => {
        response.json(data[0]);
    }).catch((error) => {
        response.status(400).json({ msg: "Bad Request. " + error})
    })
});

module.exports = router;