var router = require('express').Router();
var userOperations = require('../Operaciones DB/OperacionesUsuarios');

router.get('/',function (request, response) {
    userOperations.getUsuarios().then((data) => {
        response.json(data[0]);
    }).catch((error) => {
        response.status(400).json({msg: "Bad Request. " + error})
    });
});

router.get('/fondos/:id',function (request, response) {
    const { id } = request.params;
    userOperations.getFondosUsuario(id).then((data) => {
        response.json(data[0]);
    }).catch((error) => {
        response.status(400).json({msg: "Bad Request. " + error})
    });
});

router.post('/',function (request, response){
    let nuevoUsuario = { ...request.body };
    userOperations.addUsuario(nuevoUsuario).then(data =>{
        response.status(201).json(data);
    }).catch((error) => {
        response.status(400).json({msg: "Bad Request. " + error})
    });
});

router.get('/:id', function(request, response){
    const { id } = request.params
    userOperations.getUsuario(id).then((data) => {
        if (data[0].length === 0){
            return response.status(404).json({ msg: "No se encontró el usuario."})
        }

        response.json(data[0]);
    }).catch((error) => {
        response.status(400).json({  msg: "Bad Request. " + error });
    });
});

router.put('/:id', function(request, response){
    const { id } = request.params;
    const { Nombre, Apellido, Email, EsVendedor, Fondos } = request.body;
    let usuario = { "Id":id, Nombre, Apellido, Email, EsVendedor, Fondos };
   
    userOperations.updateUsuario(usuario).then((data) => {
        response.json(data[0]);
    }).catch((error) => {
        response.status(400).json({ msg: "Bad Request. " + error})
    })
});

module.exports = router;