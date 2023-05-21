const pages = require("../../constant").pages;
const websiteName = require("../../constant").websiteName;
const authentication = require("../../Authentication/authentication");


/**
 * Render About page
 *
 * @async
 * @param {HTTP request} req
 * @param {HTTP response} res
 */
async function getPage(req, res){
	let user = {};
	try{
		user =  await authentication.check_login(req.cookies);
	}catch(err){
		user = await authentication.get_basic_user();
		res.clearCookie("access_token");
	}
	res.render("view_about", {
		tabTitle:"Blog-Impressum",
		headline: "Impressum",
		pages: pages,
		websiteName: websiteName,
		activePage: "Impressum",
		user: user
	} );
	
}

module.exports =  {
	getPage,
};