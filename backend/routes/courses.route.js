const express = require("express");
const coursesController = require("../controller/courses/courses.controller");
const router = express.Router();

router.route("/professional").get(coursesController.apiGetProfessionalElectives);
router.route("/free").get(coursesController.apiGetFreeElective);
router.route("/").get(coursesController.apiGetElective);
router.route("/").post(coursesController.apiPostElective);
router.route("/").put(coursesController.apiUpdateElective)


module.exports = router;
