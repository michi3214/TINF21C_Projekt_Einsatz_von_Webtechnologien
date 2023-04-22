const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
	res.render("add-product", {
		pageTitle: "Add Product",
		path: "/admin/add-product"
	});
};