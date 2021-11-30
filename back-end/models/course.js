const mongoose = require ('mongoose')

const Schema = mongoose.Schema

let CourseSchema = Schema ({
    nombre : {type:String, require:true},
    creditos : {type:Int32Array, require:true},
    notas : [
        {
            nota : {type:String, require:true},
            porcentaje : {type:Float32Array, require:true},
            calificacion : {type:Float32Array, require:true}
        }
    ]
})

module.exports = mongoose.model('Course', CourseSchema)
