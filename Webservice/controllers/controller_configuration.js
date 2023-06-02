const pages = require("../../constant").pages;
const websiteName = require("../../constant").websiteName;
const authentication = require("../../Authentication/authentication");




/**
 * Render page for User configuration 
 *
 * @param {HTTP request} req
 * @param {HTTP response} res
 */
async function  getPage(req, res){
	const user = await authentication.get_user(req);
	await authentication.check_previlege(user.privilege, 2);
	res.render("view_configuration", {
		tabTitle:"Blog-Einstellungen",
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