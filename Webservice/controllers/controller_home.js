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
	res.render("view_home", {
		tabTitle:"Blog-Home",
		headline: "Home",
		pages: pages,
		websiteName: websiteName,
		activePage: "Home",
		user: await authentication.check_login(req.cookies)
	
	} );
}

module.exports =  {
	getPage,
};