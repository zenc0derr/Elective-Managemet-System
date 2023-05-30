const express = require("express");
const studentController = require("../controller/student/student.controller");
const router = express.Router();

router.route("/").get(studentController.apiGetStudents);
router.route("/enrollment").get(studentController.apiGetEnrollment);

module.exports = router;
