const User = require('../models/user')

/* finds all the users because a get method */
exports.findAll = (req, res, next) => {
    User.find({}, (err, user) => {
        if (err)
            return next(err)
        res.send(user)
    })
}

/* finds a user by their id because a get method with id as a parameter*/
exports.findbyId = (req, res, next) => {
    User.findById(req.params._id, (err, user) => {
        if (err)
            return next(err)
        res.send(user)
    })
}

/* creates a new user because a post method */
exports.create = async (req, res, next) => {
 
    const userExist = await User.findOne({correo:req.body.correo})
    if (userExist)
        return res.status("409").send("the user already exists")

    //creates an user with the information given by the body of the post
    let user = new User({

        nombre : req.body.nombre,
        contrasena : req.body.contrasena,
        correo : req.body.correo,
        institucion : req.body.institucion
    })

    //saves on the db the new user
    user.save(err => {
        if (err)
            return next(err)
        res.send("User created succesfully")
    })
}

/* modify an user by their id*/
exports.update = async (req, res, next) => {
    User.findByIdAndUpdate(req.params._id, req.body, (err, user) => {
        if (err)
            return next(err)
        res.send(user.nombre + " was succesfully modified")
    })
}

/* deletes an user by their id because of a DELETE method */
exports.delete = (req, res, next) => {
    User.findByIdAndDelete(req.params._id, (err, user) => {
        if (err)
            return next(err)
        res.send( user.nombre +  " was eliminated succesfully")
    })
}
