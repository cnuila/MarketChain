var router = require('express').Router();
var salesOperations = require('../Operaciones DB/OperacionesVentas');

router.get('/Usuario/:id',function (request, response) {
    const { id } = request.params
    salesOperations.getVentas(id).then((data) => {
        response.json(data[0]);
    }).catch((error) => {
        response.status(400).json({ msg: "Bad Request. " + error })
    });
});

router.get('/MisCompras/:userId',function (request, response) {
    const { userId } = request.params
    salesOperations.getCompras(userId).then((data) => {
        response.json(data[0]);
    }).catch((error) => {
        response.status(400).json({ msg: "Bad Request. " + error })
    });
});

router.post('/',function (request, response){
    const nuevaVenta = { ...request.body };
    
    salesOperations.addVenta(nuevaVenta).then(data => {
        response.status(201).json(data);
    }).catch((error) => {
        response.status(400).json({ msg: "Bad Request. " + error })
    });
});

router.get('/:id', function(request, response){
    const { id } = request.params
    salesOperations.getVenta(id).then((data) => {
        if (data[0].length === 0){
            return response.status(404).json({ msg: "No se encontró la venta."})
        }

        response.json(data[0]);
    }).catch((error) => {
        response.status(400).json({  msg: "Bad Request. " + error });
    });
});

module.exports = router;