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
	//TODO: only users with privileges can open this page
	let user = {};
	try{
		user =  await authentication.check_login(req.cookies);
	}catch(err){
		user = await authentication.get_basic_user();
		res.clearCookie("access_token");
		return res.redirect("/");
	}
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

