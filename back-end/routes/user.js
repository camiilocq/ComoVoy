var express = require("express");
var router = express.Router();

const UserController = require("../controller/userController");
const SemesterController = require("../controller/semesterController");
const CourseController = require("../controller/courseController");

/* User API */

/* GET: get all users*/
router.get("/", UserController.findAll);

/* GET: get an user by id */
router.get("/:userid", UserController.findbyId);

/* GET: get an user by email and password */
router.post("/login", UserController.findByEmailAndPassword);

/* POST: add a new user, uses the body*/
router.post("/", UserController.create);

/* PUT: update an user by id, uses the body*/
router.put("/:userid", UserController.update);

/* DELETE: deletes an user by id*/
router.delete("/:userid", UserController.delete);

/* Semester API */

/* GET: get all semesters*/
router.get("/:userid/semesters", SemesterController.findAll);

/* GET: get a semester by id */
router.get("/:userid/semesters/:semesterId", SemesterController.findbyId);

/* POST: add a new semester, uses the body*/
router.post("/:userid/semesters/", SemesterController.create);

/* PUT: update a semester by id, uses the body*/
router.put("/:userid/semesters/:semesterId", SemesterController.update);

/* DELETE: deletes a semester by id*/
router.delete("/:userid/semesters/:semesterId", SemesterController.delete);

/* Course API*/

/* GET: get all courses*/
router.get("/:userid/semesters/:semesterId/courses", CourseController.findAll);

/* GET: get a courses by id*/
router.get(
  "/:userid/semesters/:semesterId/courses/:courseid",
  CourseController.findbyId
);

/* POST: add a new course, uses the body*/
router.post("/:userid/semesters/:semesterId/courses", CourseController.create);

/* PUT: update a course by id, uses the body*/
router.put(
  "/:userid/semesters/:semesterId/courses/:courseid",
  CourseController.update
);

/* DELETE: deletes a course by id*/
router.delete(
  "/:userid/semesters/:semesterId/courses/:courseid",
  CourseController.delete
);

module.exports = router;
