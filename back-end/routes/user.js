var express = require('express');
var router = express.Router();

const UserController = require('../controller/userController')
const SemesterController = require('../controller/semesterController')
const CourseController = require('../controller/courseController')

                            /* User API */

/* GET: get all users*/
router.get('/', UserController.findAll)

/* GET: get an user by id */
router.get('/:_id', UserController.findbyId);

/* POST: add a new user uses the body*/
router.post('/', UserController.create)

/* PUT: update an user by mail, uses the body*/
router.put('/:_id', UserController.update)

/* DELETE: deletes an user by mail*/
router.delete('/:_id', UserController.delete)

                            /* Semester API */

/* GET: get all semesters*/
router.get('/semesters', SemesterController.findAll)

                            /* Course API*/
/* GET: get all courses*/
router.get('/semesters/courses', CourseController.findAll)

module.exports = router;
