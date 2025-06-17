require('dotenv').config();
const mongoose = require('mongoose');

//Conexión a MongoDB
const MONGO_URI = process.env.MONGO_CREDENTIALS || 'mongodb://localhost:27017/sensores'; //URI por defecto

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Conexión a MongoDB establecida');
    } catch (err) {
        console.error('Error al conectar a MongoDB', err);
        process.exit(1);
    }
};

module.exports = connectDB;