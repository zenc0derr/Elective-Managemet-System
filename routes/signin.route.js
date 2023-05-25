const express = require("express");
const signinControllerAdmin = require("../controller/admin/signin.controller");
const signinControllerStudent = require("../controller/student/signin.controller");
const router = express.Router();

router.route("/admin").post(signinControllerAdmin.apiSignIn);
router.route("/student").post(signinControllerStudent.apiSignIn);
router.route("/otp").post(signinControllerAdmin.apiOtp);

module.exports = router;
