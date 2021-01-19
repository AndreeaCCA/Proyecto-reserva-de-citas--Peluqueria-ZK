const uuidv4 = require("uuid");


class Cita {

    //constructor
    new_cita =  {
        name: req.body.name,
        email: req.body.email,
        tel: req.body.tel,
        date_cita: req.body.date_cita,
        hour_cita: req.body.hour_cita,
        id: uuid.v4()
    }
    /* constructor(name, email, tel, date_cita, hour_cita) {
        this.name = name
        this.email = email
        this.tel = tel
        this.date_cita = date_cita
        this.hour_cita = hour_cita
        this.id = this.genAleatorio()
    } */



    //getters y setter




    //metodos privados
    //Generar ID único (UUID v4 en Node.JS)
    genAleatorio() {
        let idUnico = uuidv4();
        return idUnico
    }
    validar(){

    }




















    /* lo hemos hecho en clase
    setName(name) {
        if (name != '') {
            this.#name = name
            return this.#name
        } else {
            return 'El nombre no debe estar vacío'
        }
    } */
}



module.exports = Cita
