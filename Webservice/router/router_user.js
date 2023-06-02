const express = require("express");
const router = express.Router();

const authentication = require("../../Authentication/authentication");
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

router.get("/configuration",authentication.check_login,  controllerConfiguration.getPage);
router.get("/userManagement",authentication.check_login,  controllerUserManagement.getPage);

module.exports = router;