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
	let user = {};
	try{
		user =  await authentication.check_login(req.cookies);
	}catch(err){
		user = await authentication.get_basic_user();
		res.clearCookie("access_token");
		return res.redirect("/");
	}
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