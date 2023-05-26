const express = require("express");
const coursesController = require("../controller/courses/courses.controller");
const router = express.Router();

router.route("/professional").get(coursesController.apiGetProfessionalElectives);
router.route("/free").get(coursesController.apiGetFreeElective);


module.exports = router;
