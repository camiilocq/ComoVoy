const User = require('../models/user')
const Semester = require('../models/semester')
const Course = require('../models/course')

exports.findAll = (req, res, next) => {

    User.findOne({id:req.params.userid}, (err) => {
        if (err)
            return next(res.status("405").send("the user doesn't exists"))
    })

    Semester.findOne({id: req.params.semesterId}, (err) => {
        if(err)
            return res.status("408").send("the semester doesn't exists")
    })

    Course.find({semesterId: req.params.semesterId}, (err, course) => {
        if (err)
            return next(err)
        res.send(course)
    })
}

exports.findbyId = (req, res, next) => {

    User.findOne({id:req.params.userid}, (err) => {
        if (err)
            return next(res.status("405").send("the user doesn't exists"))
    })

    Semester.findOne({id: req.params.semesterId}, (err) => {
        if(err)
            return res.status("408").send("the semester doesn't exists")
    })

    Course.findOne({id: req.params.courseid}, (err, course) => {
        if (err)
            return res.status("405").send("the course doesn't exists")
        res.send(course)
    })
}

exports.create = async (req, res, next) => {

    User.findOne({id:req.params.userid}, (err) => {
        if (err)
            return next(res.status("405").send("the user doesn't exists"))
    })

    Semester.findOne({id: req.params.semesterId}, (err) => {
        if(err)
            return res.status("408").send("the semester doesn't exists")
    })

    /* la consulta así es necesaria, porque varios semestres podrían tener la misma materia,
        y eso esta bien, pero debo validar que no exista ya en el semestre al que se este intentando agregar.
    */
    const query = Course.find(); // `query` is an instance of `Query`
    query.setOptions({ lean : true });
    query.collection(Course.collection);
    query.and([{nombre:req.body.nombre}, {semesterId:req.body.semesterId}]);

    const courseExists = await query.then()

    if (courseExists.length==0){

        let course = new Course({

            id: req.body.id,
            creditos: req.body.creditos,
            nombre: req.body.nombre,
            semesterId: req.body.semesterId,
            definitiva: req.body.definitiva,
            notas: []
        })

        course.save(err => {
            if (err)
                return next(err)
            res.send("Course created succesfully")
        })
    } else {
        return res.status("418").send("the course already exists")  
    }
}

/* modify a course by their id*/
exports.update = (req, res, next) => {
   
    User.findOne({id:req.params.userid}, (err) => {
        if (err)
            return next(res.status("405").send("the user doesn't exists"))
    })

    Semester.findOne({id: req.params.semesterId}, (err) => {
        if(err)
            return res.status("408").send("the semester doesn't exists")
    })

    Course.findOneAndUpdate({id:req.params.courseid}, req.body, (err, course) => {
        if (err)
            return next(err)
        res.send(course.nombre + " was succesfully modified")
    })
}

/* deletes an course by their id because of a DELETE method */
exports.delete = async (req, res, next) => {

    User.findOne({id:req.params.userid}, (err) => {
        if (err)
            return next(res.status("405").send("the user doesn't exists"))
    })

    Semester.findOne({id: req.params.semesterId}, (err) => {
        if(err)
            return res.status("408").send("the semester doesn't exists")
    })

    Course.findOneAndDelete({id:req.params.courseid}, req.body, (err, course) => {
        if (err)
            return next(err)
        res.send(course.nombre + " was succesfully deleted")
    })
}
