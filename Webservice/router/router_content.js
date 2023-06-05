const express = require("express");
const router = express.Router();

// Controllers
const controllerContent = require("../controllers/controller_content.js");
const authentication = require("../../Authentication/authentication");

router.get("/read/:id", controllerContent.getRead);

router.get("/delete/:id",authentication.checkLogin , controllerContent.deletePost);

router.get("/edit/:id",authentication.checkLogin , controllerContent.getEdit);
router.post("/edit/:id",authentication.checkLogin , controllerContent.editPost);


router.get("/create",authentication.checkLogin, controllerContent.getCreate);
router.post("/create",authentication.checkLogin, controllerContent.postCreate);


module.exports = router;