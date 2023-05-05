const express = require("express");
const router = express.Router();

// Controllers
const controllerAbout = require("../controllers/controller_about.js");
const controllerConfiguration = require("../controllers/controller_configuration.js");
const controllerHome = require("../controllers/controller_home.js");
const controllerLogin = require("../controllers/controller_login.js");
const controllerUserManagement = require("../controllers/controller_userManagement.js");

// routes
router.get("/", controllerHome.getPage);
router.get("/about", controllerAbout.getPage);
router.get("/configuration", controllerConfiguration.getPage);
router.get("/userManagement", controllerUserManagement.getPage);
router.get("/login", controllerLogin.getPage);

module.exports = router;