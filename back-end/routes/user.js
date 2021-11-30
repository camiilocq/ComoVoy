var express = require('express');
var router = express.Router();

const UserController = require('../controller/userController')
const SemesterController = require('../controller/semesterController')
const CourseController = require('../controller/courseController')

/* User API */
router.get('/', UserController.findAll)

/* Semester API */
router.get('/semesters', SemesterController.findAll)

/* Course API*/
router.get('/semesters/courses', CourseController.findAll)

module.exports = router;
