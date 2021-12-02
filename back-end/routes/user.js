var express = require('express');
var router = express.Router();

const UserController = require('../controller/userController')
const SemesterController = require('../controller/semesterController')
const CourseController = require('../controller/courseController')

                            /* User API */

/* GET: get all users*/
router.get('/', UserController.findAll)

/* GET: get an user by id */
router.get('/:userid', UserController.findbyId);

/* POST: add a new user, uses the body*/
router.post('/', UserController.create)

/* PUT: update an user by id, uses the body*/
router.put('/:userid', UserController.update)

/* DELETE: deletes an user by id*/
router.delete('/:userid', UserController.delete)


                            /* Semester API */

/* GET: get all semesters*/
router.get('/:userid/semesters', SemesterController.findAll)

/* GET: get a semester by id */
router.get('/:userid/semesters/:semesterId', SemesterController.findbyId);

/* POST: add a new semester, uses the body*/
router.post('/:userid/semesters/', SemesterController.create)

/* PUT: update a senester by id, uses the body*/
router.put('/:userid/semesters/:semesterId', SemesterController.update)

/* DELETE: deletes a semester by id*/
router.delete('/:userid/semesters/:semesterId', SemesterController.delete)


                            /* Course API*/
/* GET: get all courses*/
router.get('/semesters/courses', CourseController.findAll)

module.exports = router;
