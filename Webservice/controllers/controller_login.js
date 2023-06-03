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
		user: await authentication.get_user(req),
		second_try: false
	});
}

async function handle_login(req, res, next){
	const username = req.body.usernameInput;
	const password = req.body.passwordInput;
	try{
		const token = await authentication.login(username, password);
		return res.cookie(  
			"access_token", 
			token, 
			{
				httpOnly: true,
				secure: true
			}
		).status(200).redirect("/");
	}catch(error){
		const data = {
			tabTitle:"Blog-Login",
			headline: "Login",
			pages: pages,
			websiteName: websiteName,
			user: await authentication.get_user(req),
			second_try: true
		};
		if(error instanceof Errors.InvalidUsername){
			data.error_msg = "Username is not existing, please <a href=\"/user/register\">register</a> or try again.";
			return res.status(401).render("view_login", data );
		}else if(error instanceof Errors.InvalidUserCredentials){
			console.error("Wrong user credentials used for: " + username);
			data.error_msg = "Credentials were wrong. Please try again.";
			return res.status(401).render("view_login", data );
		} 
		next(error);
	}
}

module.exports =  {
	getPage,
	handle_login
};