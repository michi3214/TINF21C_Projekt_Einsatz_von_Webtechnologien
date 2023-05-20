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
	res.render("view_about", {
		tabTitle:"Blog-Impressum",
		headline: "Impressum",
		pages: pages,
		websiteName: websiteName,
		activePage: "Impressum",
		user: await authentication.check_login(req.cookies)
	} );
}

module.exports =  {
	getPage,
};