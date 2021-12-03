const User = require('../models/user')
const Semester = require('../models/semester')
const Course = require('../models/course')

exports.findAll = (req, res, next) => {

    User.findById({_id:req.params.userid}, (err) => {
        if (err)
            return next(res.status("405").send("the user doesn't exists"))
    })

    Semester.findById({_id: req.params.semesterId}, (err) => {
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

    User.findById({_id:req.params.userid}, (err) => {
        if (err)
            return next(res.status("405").send("the user doesn't exists"))
    })

    Semester.findById({_id: req.params.semesterId}, (err) => {
        if(err)
            return res.status("408").send("the semester doesn't exists")
    })

    Course.findById({_id: req.params.courseid}, (err, course) => {
        if (err)
            return res.status("405").send("the course doesn't exists")
        res.send(course)
    })
}

exports.create = async (req, res, next) => {

    User.findById({_id:req.params.userid}, (err) => {
        if (err)
            return next(res.status("405").send("the user doesn't exists"))
    })

    Semester.findById({_id: req.params.semesterId}, (err) => {
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

    console.log(courseExists)

    if (!courseExists){
            
        //creates an user with the information given by the body of the post
        let course = new Course({
    
            semestre : req.body.semestre,
            userId : req.body.userId,
            promedio : req.body.promedio
        })
    
        //saves on the db the new user
        course.save(err => {
            if (err)
                return next(err)
            res.send("Course created succesfully")
        })
    } else {
        return res.status("418").send("the course already exists")
    }
}
