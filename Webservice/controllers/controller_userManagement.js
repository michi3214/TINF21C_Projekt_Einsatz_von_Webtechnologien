const pages = require("../../constant").pages;
const websiteName = require("../../constant").websiteName;
const authentication = require("../../Authentication/authentication");


/**
 * Render page for User management 
 *
 * @param {HTTP request} req
 * @param {HTTP response} res
 */
async function  getPage(req, res){
	const user = await authentication.get_user(req);
	await authentication.check_previlege(user.privilege, 3);
	res.render("view_user_Management", {
		tabTitle:"Benutzerverwaltung",
		headline: "Benutzerverwaltung",
		pages: pages,
		websiteName: websiteName,
		activePage: "Benutzerverwaltung",
		user: user

	} );
}

module.exports =  {
	getPage,
};

