const mongoose = require ('mongoose')

const Schema = mongoose.Schema

let SemesterSchema = Schema ({
    semestre : {type:String, require:true},
    promedio: Number,
    userId : {type:String, require:true}
})

module.exports = mongoose.model('Semester', SemesterSchema)
