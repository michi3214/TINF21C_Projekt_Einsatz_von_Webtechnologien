const express = require("express");
const router = express.Router();

// Controllers
const controllerContent = require("../controllers/controller_content.js");
const authentication = require("../../Authentication/authentication");

router.get("/read/:id", controllerContent.getRead);
router.get("/delete/:id",authentication.check_login , controllerContent.deletePost);


router.get("/create",authentication.check_login, controllerContent.getCreate);
router.post("/create",authentication.check_login, controllerContent.postCreate);







module.exports = router;