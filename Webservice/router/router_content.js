const express = require("express");
const router = express.Router();

// Controllers
const controllerContent = require("../controllers/controller_content.js");
const authentication = require("../../Authentication/authentication");

router.get("/read/:id", controllerContent.getRead);


router.get("/create",authentication.check_login, controllerContent.getCreate);



//TODO: Try to implement error handling here (and login check for post, delete, ...)




module.exports = router;