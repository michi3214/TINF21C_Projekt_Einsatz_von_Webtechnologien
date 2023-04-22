const modelUserManagement = require("../models/model_userManagement");

exports.getPage = (req, res, next) => {
	res.render("view_userManagement", {
		tabTitle: "Nutzer Management",
		pageTitle: "Nutzer Management",
		path: "/admin/UserManagement"
	});
};
