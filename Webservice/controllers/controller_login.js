const pages = require("../constant").pages;
const websiteName = require("../constant").websiteName;


/**
 * Render login page
 *
 * @async
 * @param {HTTP request} req
 * @param {HTTP response} res
 */
async function getPage(req, res){
	res.render("view_login", {
		tabTitle:"Blog-Login",
		headline: "Login",
		pages: pages,
		websiteName: websiteName
	} );
}

module.exports =  {
	getPage,
};