const express = require("express");
const router = express.Router();

// Controllers
const controllerHome = require("../controllers/controller_home.js");
const controllerAbout = require("../controllers/controller_about.js");
const controllerUserConfig = require("../controllers/controller_userConfig.js");

router.get("/", controllerHome.getPage);
router.get("/about", controllerAbout.getPage);
router.get("/userConfig", controllerUserConfig.getPage);
module.exports = router;