const Semester = require('../models/semester')

exports.findAll = (req, res, next) => {
    Semester.find({}, (err, semester) => {
        if (err)
            return next(err)
        res.send(semester)
    })
}
