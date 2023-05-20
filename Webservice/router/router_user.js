const express = require("express");
const router = express.Router();

// Controllers
const controllerLogin = require("../controllers/controller_login.js");
const controllerRegister = require("../controllers/controller_register.js");
const controllerLogout = require("../controllers/controller_logout.js");
const controllerConfiguration = require("../controllers/controller_configuration.js");
const controllerUserManagement = require("../controllers/controller_userManagement.js");

// routes
router.get("/login", controllerLogin.getPage);
router.post("/login", controllerLogin.handle_login);

router.get("/register", controllerRegister.getPage);
router.post("/register", controllerRegister.handle_register);

router.get("/logout", controllerLogout.getPage);

router.get("/configuration", controllerConfiguration.getPage);
router.get("/userManagement", controllerUserManagement.getPage);

module.exports = router;