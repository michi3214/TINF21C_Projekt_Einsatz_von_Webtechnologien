const express = require("express");

const userManagementController = require("../controllers/controller_userManagement");

const router = express.Router();

// /admin/UserManagement => GET
router.get("/UserManagement", userManagementController.getPage);

// /admin/add-product => POST
//router.post('/add-product', productsController.postAddProduct);

module.exports = router;