const express = require("express");
const router = express.Router();

// Controllers
const controllerAbout = require("../controllers/controller_about.js");
const controllerHome = require("../controllers/controller_home.js");

// routes
router.get("/", controllerHome.getPage);
router.get("/about", controllerAbout.getPage);

module.exports = router;