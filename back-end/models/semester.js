const mongoose = require ('mongoose')

const Schema = mongoose.Schema

let SemesterSchema = Schema ({
    nombre : {type:String, require:true},
    promedio: Number,
    userId : {type:String, require:true}
})

module.exports = mongoose.model('Semester', SemesterSchema)
