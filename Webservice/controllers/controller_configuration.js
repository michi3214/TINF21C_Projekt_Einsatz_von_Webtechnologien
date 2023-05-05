const pages = require("../constant").pages;
const websiteName = require("../constant").websiteName;



/**
 * Render page for User configuration 
 *
 * @param {HTTP request} req
 * @param {HTTP response} res
 */
async function  getPage(req, res){
	res.render("view_configuration", {
		tabTitle:"Blog-Einstellungen",
		headline: "Einstellungen",
		pages: pages,
		websiteName: websiteName,
		activePage: "Einstellungen"

	} );
}

module.exports =  {
	getPage,
};