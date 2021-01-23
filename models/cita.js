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



    /* 
    validation(){
    // email must be an email
        check('email').isEmail().withMessage('El formato del email es incorrecto.'),
            // name must be at least 5 chars long
            check('name').isLength({ min: 3 }).withMessage('El nombre tiene que tener por lo menos 3 caracteres.'),
            // tel must be at least 9 chars long
            check('tel').isLength({ min: 9 }).withMessage('El numero de telefono tiene que tener por lo menos 9 numeros.'),
            check('tel').isMobilePhone().withMessage('El formato del numero de telefono es incorrecto.'),
            check('date_cita').isDate().withMessage('El formato de fecha es incorrecto.'),
            check('date_cita').isAfter().withMessage('Porfavor elige una fecha futura.'),
            (req, res) => {
                // finds the validation errors in this request and wraps them in an object with handy functions
                // validationResult - returns: a Result object
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    //return res.status(400).json({ errors: errors.array() });
                    return res.render('appointment', { errors: errors.array() })
                    console.log(errors)
                }
            } 
    } */

}

module.exports = Cita

 /* lo hemos hecho en clase
        setName(name) {
            if (name != '') {
                this.#name = name
                return this.#name
            } else {
                return 'El nombre no debe estar vacío'
            }
        } */
