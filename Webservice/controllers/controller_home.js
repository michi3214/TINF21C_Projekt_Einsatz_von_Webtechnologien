const pages = require("../../constant").pages;
const websiteName = require("../../constant").websiteName;
const HomeModel = require("./../models/model_home");
const authentication = require("../../Authentication/authentication");



/**
 * Render home page
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
	res.render("view_home", {
		tabTitle:"Blog-Home",
		headline: "Home",
		pages: pages,
		websiteName: websiteName,
		activePage: "Home",
		user: user
	
	} );
}

module.exports =  {
	getPage,
};