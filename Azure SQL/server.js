var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

var app = express();

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(cors());

app.use('/api/Usuarios', require("./Routes/ControladorUsuarios"));
app.use('/api/Productos',require("./Routes/ControladorProductos"));
app.use('/api/Ventas', require("./Routes/ControladorVentas"));

app.use(function(request, response, next){
    next();
});

app.use(function(request, response, next){
    var error = new Error("Not Found " + request.method + ":" + request.originalUrl);
    error.status = 404;
    next(error);
});
app.set("port", process.env.PORT || 3000);

var server = app.listen(app.get("port"), function(){
    console.log("Estoy funcionando en el puerto " + server.address().port);
});

module.exports = app;