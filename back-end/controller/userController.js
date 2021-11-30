const User = require('../models/user')

/* finds all the users because a get method */
exports.findAll = (req, res, next) => {
    User.find({}, (err, user) => {
        if (err)
            return next(err)
        res.send(user)
    })
}
