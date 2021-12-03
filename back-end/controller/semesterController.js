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

/* creates a new semester because a post method */
exports.create = async (req, res, next) => {
 
    const userExist = await User.findById({_id:req.params.userid})
    
    if (userExist){

        const semesterExists = await Semester.findOne({semestre:req.body.semestre})

        if (!semesterExists){
            
            let semester = new Semester({
        
                semestre : req.body.semestre,
                userId : req.body.userId,
                promedio : req.body.promedio
            })
        
            semester.save(err => {
                if (err)
                    return next(err)
                res.send("Semester created succesfully")
            })
        } else {
            return res.status("417").send("the semester already exists")
        }
    } else {
        return res.status("409").send("the user doesn't exists")
    }
}

/* modify a semester by their id*/
exports.update = async (req, res, next) => {

    const userExist = await User.findById({_id:req.params.userid})
    
    if (userExist){

        Semester.findByIdAndUpdate({_id:req.params.semesterId}, req.body, (err, semester) => {
            if (err)
                return next(err)
            res.send(semester.semestre + " was succesfully modified")
        })

    } else {
        return res.status("409").send("the user doesn't exists")
    }
}

/* deletes an user by their id because of a DELETE method */
exports.delete = async (req, res, next) => {

    const userExist = await User.findById({_id:req.params.userid})
    
    if (userExist){

        Semester.findByIdAndDelete({_id:req.params.semesterId}, (err, semester) => {
            if (err)
                return next(err)
            res.send( semester.semestre +  " was eliminated succesfully")
        })
    }
}
