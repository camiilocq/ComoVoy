const Course = require('../models/course')

exports.findAll = (req, res, next) => {
    Course.find({}, (err, course) => {
        if (err)
            return next(err)
        res.send(course)
    })
}
