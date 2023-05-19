const express = require("express");
const router = express.Router();

// Controllers
const controllerContent = require("../controllers/controller_content.js");

router.get("/read/:id", controllerContent.getRead);

router.get("/update/:id", controllerContent.getUpdate);

router.delete("/delete/:id", controllerContent.deletePost);
router.post("/update/:id", controllerContent.postUpdate);



module.exports = router;