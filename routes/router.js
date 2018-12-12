const express = require('express');
const route = express.Router();
const Task = require('./../models/task');
/*Asi como con mysql uso getConnection  con mongoDB solo coloco
async y await para "esperar" el dato de la base*/ 

route.get('/',async (req,res)=>{
    const task = await Task.find();
    //pasar las tareas de base de datos a la vista(en pantalla).
    res.render('index.ejs',{
        task // es lo mismpo que decir task:task

    })

});

// la hacemos ascincronica.
route.post('/add',async (req,res)=>{
    const task = new Task(req.body);
    await task.save();
    res.redirect('/');

});

//actualizar estado

route.get('/update/:id',async (req,res)=>{
    let id = req.params.id;

   const task= await Task.findById(id);
   //si el estatus era false pasa a verdadero o al revés.Es decir Hecha o no.
   task.status = !task.status;
   //await porque va a tomar tiempo.
   await task.save();
   res.redirect('/');

});


//editar datos
//primero lo busco:
route.get('/editar/:id', async (req,res)=>{
    let {id} = req.params;
    const task = await Task.findById(id);
    res.render('modificar.ejs',{
        task
    });

});
route.post('/editar/:id', async (req,res)=>{
    const {id} = req.params;
    let cambio = req.body;
    await Task.update({_id: id},cambio);
    res.redirect('/');



} );
//luego modifico: 


//eliminar
//mongo no da id sino que da _id
//como es asyncrona tbn utilizamos el async y await .¡¡¡Sin esto no funciona!!!
route.get('/delete/:id', async (req,res)=>{
    let id = req.params.id;
    //la busqueda se hace con la clave _id que da mongo y el id que pasamos por query
    await Task.remove({_id: id});
    res.redirect('/')


});
module.exports = route;