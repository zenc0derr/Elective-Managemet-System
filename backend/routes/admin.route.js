const express = require("express");
const adminController = require("../controller/admin/admin.controller");
const router = express.Router();

router.route("/schedule").post(adminController.apiSetSchedule)
router.route("/schedule").get(adminController.apiGetSchedule)
module.exports = router;
