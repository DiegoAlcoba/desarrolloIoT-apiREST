const express = require('express');
const sanitize = require('mongo-sanitize');
const cors = require('cors');
const bodyParser = require('body-parser');

const connectDB = require('./config/db');
const sensorRoutes = require('./routes/sensors.routes');
const readingRoutes = require('./routes/readings.routes'); 

var app = express();
var port = process.env.PORT;

//Conexión con la base de datos
connectDB();

//Middleware
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(cors());

//Sanitización de entradas para prevenir inyecciones de MongoDB
app.use((req, res, next) => {
    if (req.body) {
        Object.keys(req.body).forEach(key => {
            req.body[key] = sanitize(req.body[key]);
        });
    }

    if (req.query) {
        Object.keys(req.query).forEach(key => {
            req.query[key] = sanitize(req.query[key]);
        });
    }

    if (req.params) {
        Object.keys(req.params).forEach(key => {
            req.params[key] = sanitize(req.params[key]);
        });
    }

    next();
});

//Rutas
app.use('/sensors', sensorRoutes);
app.use('/readings', readingRoutes);

//Ruta de prueba
app.get('/test', (req, res) => res.json({ msg: 'El API REST funciona!' }));

//Iniciar servidor
app.listen(port, () => console.log(`Servidor corriendo en el puerto ${port}`));