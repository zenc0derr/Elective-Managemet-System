const express = require('express')
const {signinController}  = require('../controller/signin.controller')
const router = express.Router()

router.route("/").post(signinController.apiSignIn)

module.exports = router