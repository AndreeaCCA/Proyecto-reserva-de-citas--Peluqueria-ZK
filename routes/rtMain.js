const express = require('express')
const rtMain = express.Router()
const bodyParser = require('body-parser')
const { check, validationResult } = require('express-validator')
const fs = require('fs')
const Cita =  require('../models/cita')
const uuid = require("uuid")

//pendiente
//const nodemailer = require("nodemailer")


//esto seria nuestra supuesta base de datos
let arr_data = []
arr_data = JSON.parse(fs.readFileSync('cita.json', 'utf-8'))


//aqui te creas las rutas get, post, etc.. que necesites
rtMain.get('/', (req, res) => {
  res.render('home')
  //console.log(req.body)
})

rtMain.get('/listado', (req, res) => {
  res.render('revisarcita')

})

rtMain.get('/anular', (req, res) => {
  res.render('anularcita')
 
})
rtMain.get('/delete', (req, res) => {
  res.render('anularcita')
 
})
rtMain.get('/change', (req, res) => {
  res.render('modificarcita')
 
})

rtMain.get('/modificar', (req, res) => {
  res.render('modificarcita')
 
})

rtMain.get('/contact', (req, res) => {
  res.render('contactanos')
 
})

rtMain.post(
  '/procesar',
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


    let new_cita = {
      name:      req.body.name,
      email:     req.body.email,
      tel:       req.body.tel,
      date_cita: req.body.date_cita,
      hour_cita: req.body.hour_cita,
      id:        uuid.v4()
    }


    let exists = false
    arr_data.forEach(element => {
      if (new_cita.date_cita == element.date_cita && new_cita.hour_cita == element.hour_cita)
        exists = true
    });

    if(exists == false) {
      arr_data.push(new_cita)
      fs.writeFileSync('cita.json', JSON.stringify(arr_data), 'utf-8')
      res.render('respuesta', new_cita)
    } 
    else{
      res.render('error',new_cita)
    }
  }
);



function checkEmail() {
  return email >= document.getElementById("ageToCheck").value;
}

function myFunction() {
  document.getElementById("demo").innerHTML = ages.filter(checkAdult);
}






rtMain.post(
  '/miscitas',
  check('email').isEmail().withMessage('El formato del email es incorrecto.'),
  (req, res) => {
    console.log('hey')
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
     console.log(errors)
      return res.render('revisarcita',{errors: errors.array()})
    }

    let email = req.body.email
    let miscitas = arr_data.filter(c =>{
    return c.email== email
    })
      console.log(miscitas)
     res.render('revisarcita',{citas:miscitas}) 
  })



module.exports = rtMain