const User = require('../models/user')
const Semester = require('../models/semester')

/* finds all the semesters of an user because a get method */
exports.findAll = (req, res, next) => {

    Semester.find({userId:req.params.userid}, (err, semester) => {
        if (err)
            return next(err)
        res.send(semester)
    })
}

/* finds a the semester of an user by their id because a get method with id as a parameter*/
exports.findbyId = (req, res, next) => {

    User.findById({_id:req.params.userid}, (err) => {
        if (err)
            return next(res.status("405").send("the user doesn't exists"))
    })

    Semester.findById({_id:req.params.semesterId}, (err, semester) => {
        if (err)
            return next(res.status("405").send("the semester doesn't exists"))
        res.send(semester)
    })
}
