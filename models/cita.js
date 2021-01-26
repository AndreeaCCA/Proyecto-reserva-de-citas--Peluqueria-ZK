const uuidv4 = require("uuid");
const { check, validationResult } = require('express-validator')

class Cita {

    //constructor
   /*  constructor(body){
        this.name = body.name
        this.email = body.email
        this.tel = body.tel
        this.date_cita = body.date_cita
        this.hour_cita = body.hour_cita
        this.id = uuid.v4()
    }
 */


    //GETTERS & SETTERS




    //METODOS PRIVADOS:
    //generar ID único (UUID v4 en Node.JS)
    genAleatorio() {
        let idUnico = uuidv4();
        return idUnico
    }



    
}

module.exports = Cita

