const mongoose = require('mongoose');

//Conexión a MongoDB
const MONGO_URI = 'mongodb://diego4:diego4@localhost:27017/sensores?authSource=admin';

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