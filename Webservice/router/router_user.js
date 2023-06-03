const express = require("express");
const router = express.Router();

const authentication = require("../../Authentication/authentication");
// Controllers
const controllerLogin = require("../controllers/controller_login.js");
const controllerRegister = require("../controllers/controller_register.js");
const controllerLogout = require("../controllers/controller_logout.js");
const controllerConfiguration = require("../controllers/controller_configuration.js");

// routes
router.get("/login", controllerLogin.getPage);
router.post("/login", controllerLogin.handle_login);

router.get("/register", controllerRegister.getPage);
router.post("/register", controllerRegister.handleRegister);


router.get("/logout", controllerLogout.getPage);

router.get("/configuration",authentication.checkLogin,  controllerConfiguration.getPage);
router.get("/configuration/delete/:username",authentication.checkLogin, controllerConfiguration.handleUserDelete);

module.exports = router;