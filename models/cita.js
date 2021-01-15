const uuidv4 = require("uuid");

class Cita {

    constructor(name, email, tel, date_cita, hour_cita) {
        this.name = name
        this.email = email
        this.tel = tel
        this.date_cita = date_cita
        this.hour_cita = hour_cita
        this.id = this.genAleatorio()
    }
    //Generar ID único (UUID v4 en Node.JS)
    genAleatorio() {
        let idUnico = uuidv4();
        return idUnico
    }


    /* setName(name) {
        if (name != '') {
            this.#name = name
            return this.#name
        } else {
            return 'El nombre no debe estar vacío'
        }
    } */
}
module.exports = Cita
