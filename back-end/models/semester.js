const mongoose = require ('mongoose')

const Schema = mongoose.Schema

let SemesterSchema = Schema ({
    nombre : {type:String, require:true},
    cursos : [String]
})

module.exports = mongoose.model('Semester', SemesterSchema)
