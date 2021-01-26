const express = require('express')
const rtAppointments = express.Router()
const bodyParser = require('body-parser')
const { check, validationResult } = require('express-validator')
const fs = require('fs')
const uuid = require("uuid")
const daoCitas = require('../dao/daoCitas')
const rtCita = require('../models/cita')


//aqui te creas las rutas get, post, etc.. que necesites

/*
#########################################
########## NUEVA CITA   ################
#########################################
*/
rtAppointments.get('/consultar/:date', (req, res) => {   
    let date = req.params.date
    daoCitas.getCitas(date)
        .then(hours_reserved => {
            res.json(hours_reserved)
        })
})

rtAppointments.post(
    '/process',
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
        let new_cita = {
            name: req.body.name,
            email: req.body.email,
            tel: req.body.tel,
            date_cita: req.body.date_cita,
            hour_cita: req.body.hour_cita,
            id: uuid.v4()
        }
        // finds the validation errors in this request and wraps them in an object with handy functions
        // validationResult - returns: a Result object
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            //return res.status(400).json({ errors: errors.array() });

            return res.render('appointment', { errors: errors.array(), cita:new_cita })

            console.log(errors)
        }

        daoCitas.createNewCita(new_cita)
            .then((cita) => {
                console.log('yoooo')
                res.render('confirmationAppointment', cita)
            })
    })



/*
#########################################
########## CONSULTAR CITA   ################
#########################################
*/
rtAppointments.get('/review', (req, res) => {
    res.render('review')
})

rtAppointments.post(
    '/review',
    check('email').isEmail().withMessage('El formato del email es incorrecto.'),
    (req, res) => {
        console.log('hey')
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors)
            return res.render('review', { errors: errors.array() })
        }

        let email = req.body.email
        daoCitas.getCitasByEmail(email)
            .then(review => {
                console.log(review)
                res.render('review', { citas: review })
            })
    })

/*
#########################################
########## ANULAR CITA   ################
#########################################
*/

rtAppointments.get('/cancel', (req, res) => {
    res.render('cancel')
})

rtAppointments.post(
    '/cancel',
    check('email').isEmail().withMessage('El formato del email es incorrecto.'),
    (req, res) => {
        console.log('hey')
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors)
            return res.render('cancel', { errors: errors.array() })
        }

        let email = req.body.email
        daoCitas.getCitasByEmail(email)
            .then(review => {
                console.log(review)
                res.render('cancel', { citas: review })
            })

    })

rtAppointments.get('/delete_1/:id', (req, res) => {
    let id = req.params.id
    daoCitas.deleteCita(id)
        .then((mensaje) => {
            res.render('cancel', { 'mensaje': mensaje })
        })
})



/*
#########################################
########## MODIFICAR CITA   ################
#########################################
*/

rtAppointments.get('/modifyAppointment', (req, res) => {
    res.render('modifyAppointment')
})

rtAppointments.post(
    '/verify',
    check('email').isEmail().withMessage('El formato del email es incorrecto.'),
    (req, res) => {
        console.log('hey')
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors)
            return res.render('modifyAppointment', { errors: errors.array() })
        }
        let email = req.body.email
        daoCitas.getCitasByEmail(email)
            .then(review => {
                console.log(review)
                res.render('modifyAppointment', { citas: review })
            })
    })

rtAppointments.get('/change_1/:id', (req, res) => {
    let id = req.params.id;
    daoCitas.getCitasById(id)
        .then(cita => {
            console.log(cita)
            res.render('modifyForm', { 'cita': cita[0] })
        })
})

rtAppointments.post('/file', (req, res) => {
    console.log('modifyAppointment datos cita')
    console.log(req.body)
    let date_cita = req.body.date_cita
    let hour_cita = req.body.hour_cita
    let id = req.body.id_cita
    daoCitas.modifyCita(id, date_cita, hour_cita)
        .then(cita => {
            console.log(cita)
            res.render('confirmationModify', cita)
        })
})




/*
#########################################
########## CONTACTO   ################
#########################################
*/
rtAppointments.get('/contact', (req, res) => {
    res.render('contact')
})


module.exports = rtAppointments