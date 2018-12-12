const mongoose = require('mongoose');
const Schema= mongoose.Schema ;
const TaskSchema= new Schema({
    title: String,
    description:String,
    status: {
        type: Boolean,
        default: false
    }
});
//Para utilizarlo debo usar el siguiente metodo:
//task es el nombre de la coleccion en mdb
module.exports= mongoose.model('task', TaskSchema);