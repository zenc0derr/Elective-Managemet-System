const express = require("express");
const coursesController = require("../controller/courses/courses.controller");
const router = express.Router();

router.route("/").get(coursesController.apiGetCourses);

module.exports = router;
