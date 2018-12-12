const express= require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');
const mongoose = require('mongoose');
//import rutting
const router = require('./../routes/router');

// conexion base de datos:

mongoose.connect('mongodb://localhost/mytienda')
.then (db=> console.log('db conectado'))
.catch(err => console.log("error al conectar"));



//setting
app.set('port',8080);
app.set('views',path.join(__dirname , './../views') );
app.set('view engine', 'ejs');
//middleware
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));

//routes
app.use(router);

//listen


app.listen(app.get('port'), ()=>{
    console.log('escuchando');
});