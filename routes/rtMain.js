const express = require('express')
const rtMain = express.Router()
const bodyParser = require('body-parser')
const { check, validationResult } = require('express-validator')
const fs = require('fs')


//esto seria nuestra supuesta base de datos
let arr_data = []
arr_data = JSON.parse(fs.readFileSync('cita.json', 'utf-8'))


//aqui te creas las rutas get, post, etc.. que necesites
rtMain.get('/', function (req, res) {
  res.render('home')
  //console.log(req.body)
})


rtMain.post(
  '/user',
  //validation process
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
      return res.render('home',{errors: errors.array()})

      console.log(errors)
    }

    const new_cita = req.body

    let exists = false
    arr_data.forEach(element => {
      if (new_cita.date_cita == element.date_cita)
        exists = true
    });

    if (exists == false) {
      let cita = {
        name: new_cita.name,
        date_cita: new_cita.date_cita,
      }
      arr_data.push(new_cita)
      fs.writeFileSync('cita.json', JSON.stringify(arr_data), 'utf-8')
      res.render('respuesta', cita)
    }else{
    res.render('error',{fechaOcupada: new_cita.date_cita})
    }
  }
);




module.exports = rtMain