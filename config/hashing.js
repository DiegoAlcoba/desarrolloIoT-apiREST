const bcrypt = require('bcrypt')
const readLine = require('readline');

//Interfaz para leer desde la terminal
const rl = readLine.createInterface ({
    input: process.stdin,
    output: process.stdout
});

const saltRounds = 10; //Nº rondas de hashing

//Pregunta al usuario por una contraseña
rl.question("Introduce una contraseña para hashear: ", (password) => {
    //Genera el hash de la contraseña
    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
            console.error("Error al generar el hash", err);
                rl.close();
                return;
        }

        console.log("\nHash generado: ", hash);

        //Comprueba si la contraseña concuerda con el hash generado
        rl.question("\nIntroduce la contraseña de nuevo para verificar: ", (passwordVerify) => {
            bcrypt.compare(passwordVerify, hash, err, (err, result) => {
                if (err) {
                    console.error("Error al verificar la contraseña: ", err);
                }
                else if (result) {
                    console.log("Contraseña correcta: Coincide con el hash.");
                }
                else {
                    console.log("Contraseña incorrecta. No coincide con el hash");
                }

                rl.close(); //Cierra la interfaz de lectura
            });
        });
    });
});