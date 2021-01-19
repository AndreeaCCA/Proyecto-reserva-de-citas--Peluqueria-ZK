const express = require('express')
const rtMain = express.Router()
//pendiente
//const nodemailer = require("nodemailer")



//aqui te creas las rutas get, post, etc.. que necesites
rtMain.get('/', (req, res) => {
  res.render('home')
  //console.log(req.body)
})


module.exports=rtMain


