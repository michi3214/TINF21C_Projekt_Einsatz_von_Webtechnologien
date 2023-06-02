const pages = require("../../constant").pages;
const websiteName = require("../../constant").websiteName;
const authentication = require("../../Authentication/authentication");
const Errors = require("../../Errors/error");


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
		user: await authentication.get_user(req)
	} );
}

async function handle_login(req, res, next){
	const username = req.body.usernameInput;
	const password = req.body.passwordInput;
	try{
		const token = await authentication.login(username, password);
		res.cookie(  
			"access_token", 
			token, 
			{
				httpOnly: true,
				secure: true
			}
		).status(200).redirect("/");
	}catch(error){
		console.error(error);
		next(new Errors.InvalidUserCredentials("Check your input and try again."));
	}
}

module.exports =  {
	getPage,
	handle_login
};