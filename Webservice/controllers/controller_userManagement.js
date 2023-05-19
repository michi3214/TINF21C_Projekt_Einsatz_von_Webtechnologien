const pages = require("../constant").pages;
const websiteName = require("../constant").websiteName;

/**
 * Render page for User management 
 *
 * @param {HTTP request} req
 * @param {HTTP response} res
 */
async function  getPage(req, res){
	res.render("view_user_Management", {
		tabTitle:"Benutzerverwaltung",
		headline: "Benutzerverwaltung",
		pages: pages,
		websiteName: websiteName,
		activePage: "Benutzerverwaltung",
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

