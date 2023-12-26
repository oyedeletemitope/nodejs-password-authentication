const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");

router.post("/", registerController.handeleLogin);

module.exports = router;
