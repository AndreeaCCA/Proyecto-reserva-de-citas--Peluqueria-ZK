const Cita = require('../models/cita')
const fs = require('fs')

//un objeto daoCitas
//citas = JSON.parse(fs.readFileSync('cita.json', 'utf-8'))  // convertimos el string en una variable

let daoCitas = {}


//funcion para actualizar las horas disònibles
daoCitas.getCitas = function (date_cita) {            //devuelve todas las citas de todas las personas
    return new Promise((resolve, reject) => {
        fs.readFile('./dao/cita.json', 'utf-8', (err, citas) => {
            citas = JSON.parse(citas)
            //console.log(citas)
            citas = citas.filter(c => { return c.date_cita == date_cita }) // filtrar citas solo para la fecha eligida, return array of object (cita) // todos los datos de citas
            citas = citas.map(c => c.hour_cita)  // return solo el hour_cita de todas las citas filtradas, array que incluye solo las horas disponibe
            resolve(citas)
        }) // leer todas las citas

    })
}



daoCitas.createNewCita = function (cita) {                               //una function dentro de un objeto
    return new Promise((resolve, reject) => {
        arr_data = JSON.parse(fs.readFileSync('./dao/cita.json', 'utf-8'))   //variable temporal descarga las citas añade una mas y las guarda 
        arr_data.push(cita)

        fs.writeFileSync('./dao/cita.json', JSON.stringify(arr_data), 'utf-8')
        resolve(cita)
    })
}


daoCitas.getCitasByEmail = function (email) {                //devuelve la cita en funcion del email
    return new Promise((resolve, reject) => {
        citas = JSON.parse(fs.readFileSync('./dao/cita.json', 'utf-8'))
        //setTimeout(()=>{
        resolve(citas.filter(c => {
            return c.email == email
        }))
        //reject("error")
        //},2000) 
    })
}



daoCitas.getCitasById = function (id) {                        //devuelve la cita en funcion del id
    return new Promise((resolve, reject) => {
        citas = JSON.parse(fs.readFileSync('./dao/cita.json', 'utf-8'))
        //setTimeout(()=>{
        resolve(
            citas.filter(c => {
            return c.id == id
        }))
        //reject("error")
        //},2000) 
    })
}


daoCitas.delete_1Cita = function (id) {
    return new Promise((resolve, reject) => {

        citas = JSON.parse(fs.readFileSync('./dao/cita.json', 'utf-8'))    //

        citas = citas.filter(c => { return c.id != id })               // returns solo los objectos donde el id no es lo que necesitamos borrar

        fs.writeFileSync('./dao/cita.json', JSON.stringify(citas), 'utf-8')

        resolve('La cita esta borrada')
    })
}

daoCitas.modifyCita = function (id, date_cita, hour_cita) {
    return new Promise((resolve, reject) => {

        citas = JSON.parse(fs.readFileSync('./dao/cita.json', 'utf-8'))
        i = citas.findIndex((obj => obj.id == id));
        console.log(i)
        console.log(id)

        //Log object to Console.
        //console.log("Before update: ", myArray[i])

        //Update object's name property.
        citas[i].date_cita = date_cita
        citas[i].hour_cita = hour_cita
        fs.writeFileSync('./dao/cita.json', JSON.stringify(citas), 'utf-8')

        resolve(citas[i])
    })
}






/* aoCitas.getCita=function(id){                  //devuelve la cita en funcion del id 
    return new Promise((resolve,reject)=>{  
        //setTimeout(()=>{
            resolve(citas.find(cita=>cita.id==id))
            reject("error")
       // },2000) 
    })
} */



module.exports = daoCitas