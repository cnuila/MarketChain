var router = require('express').Router();
var userOperations = require('../Operaciones DB/OperacionesUsuarios');
var usuario = require('../Models/Usuario');

router.get('/',function (request, response) {
    userOperations.getUsuarios().then((data) => {
        response.json(data[0]);
    })
});

module.exports = router;