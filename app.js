const express = require('express')
const app = express()
const rtMain = require('./routes/rtMain')
const exphbs  = require('express-handlebars')


//configuración del motor de plantillas handlebars

app.set('view engine', '.hbs')
app.engine('.hbs', exphbs({
    extname: '.hbs'
}));

/* middlewares - are functions that have access to the request object (req), the response object (res), 
and the next middleware function in the application’s request-response cycle.
 The next middleware function is commonly denoted by a variable named next. */
app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({extended:true}))
//enrutador principal
app.use('/',rtMain)

//arrancamos el servidor:
app.listen(3000,(err)=>{
    console.log('Server run on port 3000')
})