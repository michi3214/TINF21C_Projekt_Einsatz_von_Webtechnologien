const express = require("express");
const controllerHome = require("../controllers/controller_home.js");
const router = express.Router();
router.get("/", controllerHome.getPage);
module.exports = router;