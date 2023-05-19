const pages = require("../constant").pages;
const websiteName = require("../constant").websiteName;


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
		user:{
			login:false,
			name:"Hallo",
			privilege:1 // use privileges from constants
		}
	} );
}

module.exports =  {
	getPage,
};