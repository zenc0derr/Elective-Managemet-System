const express = require("express");
const adminController = require("../controller/admin/admin.controller");
const router = express.Router();

router.route("/setschedule").post(adminController.apiSetSchedule)

module.exports = router;
