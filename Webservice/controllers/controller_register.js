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
// TODO only not ligged in user can open this page
async function getPage(req, res){
	res.render("view_register", {
		tabTitle:"Blog-Register",
		headline: "Register",
		pages: pages,
		websiteName: websiteName,
		user: await authentication.check_login(req.cookies)
	} );
}

async function handle_register(req, res){
	// TDOD: JSDOC 
	//TODO: only not loggined user can user
	const username = req.body.usernameInput;
	const password = req.body.passwordInput;
	const alias = req.body.aliasInput;
	const token = await authentication.register(username, alias, password);
	res.cookie(
		"access_token", 
		token, 
		{
			httpOnly: true,
			secure: true
		}
	).status(200).redirect("/");
}

module.exports =  {
	getPage,
	handle_register
};