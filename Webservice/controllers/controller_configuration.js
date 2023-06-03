const pages = require("../../constant").pages;
const websiteName = require("../../constant").websiteName;
const authentication = require("../../Authentication/authentication");




/**
 * Render page for User configuration 
 *
 * @param {HTTP request} req
 * @param {HTTP response} res
 */
async function  getPage(req, res, next){
	const user = await authentication.get_user(req);
	await authentication.check_privilege(user.privilege, 2, next);
	res.render("view_configuration", {
		tabTitle:"Blog - Einstellungen",
		headline: "Einstellungen",
		pages: pages,
		websiteName: websiteName,
		activePage: "Einstellungen",
		user: user

	} );
}

module.exports =  {
	getPage,
};