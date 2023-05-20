const pages = require("../../constant").pages;
const websiteName = require("../../constant").websiteName;


/**
 * Render page not found 
 *
 * @async
 * @param {HTTP request} req
 * @param {HTTP response} res
 */
async function getError404 (req, res){
	res.status(404).render("error", {
		tabTitle:"Blog - Not found",
		headline: "Page not found!",
		pages: pages,
		websiteName: websiteName,
		message: "Sorry page could not be found.",
		user:{
			login:false,
			name:"Hallo",
			privilege:1 // use privileges from constants
		}
	} );
}

/**
 * Render page for forbidden interaction
 *
 * @async
 * @param {HTTP request} req
 * @param {HTTP response} res
 */
async function getError403 (req, res){
	res.status(403).render("error", {
		tabTitle:"Blog - Forbidden",
		headline: "Forbidden interaction",
		pages: pages,
		websiteName: websiteName,
		message: "You are not allowed to do that! Please check your login.",
		user:{
			login:false,
			name:"Hallo",
			privilege:1 // use privileges from constants
		}
	} );
}

/**
 * Render page for internal server error
 *
 * @async
 * @param {HTTP request} req
 * @param {HTTP response} res
 */
async function getError500 (req, res){
	res.status(500).render("error", {
		tabTitle:"Blog - Internal Server Error",
		headline: "Internal server error",
		pages: pages,
		websiteName: websiteName,
		message: "Something went wrong. Internal Server Error",
		user:{
			login:false,
			name:"Hallo",
			privilege:1 // use privileges from constants
		}
	} );
}

module.exports =  {
	getError404,
	getError403,
	getError500

};