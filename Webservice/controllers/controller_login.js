const pages = require("../constant").pages;
const websiteName = require("../constant").websiteName;
const authentication = require("../../Authentication/authentication");


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
	const username = req.body.usernameInput;
	const password = req.body.passwordInput;
	try{
		const token = await authentication.login(username, password);
		res.status(200).redirect("/");
	}catch(error){
		res.redirect("/error500");
	}
}

module.exports =  {
	getPage,
	handle_login
};