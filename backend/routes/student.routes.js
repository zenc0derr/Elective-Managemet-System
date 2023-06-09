const express = require("express");
const studentController = require("../controller/student/student.controller");
const router = express.Router();

router.route("/").get(studentController.apiGetStudents);
router.route("/enrollment").get(studentController.apiGetEnrollment);
router.route("/bycourse/:id").get(studentController.apiGetStudentByCourse);
router.route("/enroll").post(studentController.apiPostEnrollment)
router.route("/:id").get(studentController.apiGetStudentById)
module.exports = router;
