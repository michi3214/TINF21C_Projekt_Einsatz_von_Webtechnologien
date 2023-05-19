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
		websiteName: websiteName,
		user:{
			 login:false,
			name:"Hallo",
			privilege:1 // use privileges from constants
		}
	} );
}

async function handle_login(req, res){
	console.log("User want to log in");
	res.redirect("/");
}

module.exports =  {
	getPage,
	handle_login
};