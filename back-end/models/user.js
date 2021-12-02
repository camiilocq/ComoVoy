const mongoose = require ('mongoose')

const Schema = mongoose.Schema

let UserSchema = Schema ({
    nombre : {type:String, require:true},
    contrasena : {type:String, require:true},
    correo : {type:String, require:true},
    promedioPonderado: Number,
    institucion : {type:String, require:true}
})

module.exports = mongoose.model('User', UserSchema)
