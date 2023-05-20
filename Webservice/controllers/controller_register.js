const pages = require("../../constant").pages;
const websiteName = require("../../constant").websiteName;
const authentication = require("../../Authentication/authentication");


/**
 * Render login page
 *
 * @async
 * @param {HTTP request} req
 * @param {HTTP response} res
 */
async function getPage(req, res){
	res.render("view_register", {
		tabTitle:"Blog-Register",
		headline: "Register",
		pages: pages,
		websiteName: websiteName,
		user:{
			login:false,
			name:"Hallo",
			privilege:1 // use privileges from constants
		}
	} );
}

async function handle_register(req, res){
	const username = req.body.usernameInput;
	const password = req.body.passwordInput;
	const alias = req.body.aliasInput;
	const token = await authentication.register(username, alias, password);
	console.log("token set to: " + token);
	res.cookie(
		"access_token", 
		token, 
		{
			httpOnly: true,
			secure: true,
		}
	).status(200).redirect("/");
}

module.exports =  {
	getPage,
	handle_register
};