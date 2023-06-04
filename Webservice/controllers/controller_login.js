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
		tabTitle:"Blog - Login",
		headline: "Login",
		pages: pages,
		websiteName: websiteName,
		user: await authentication.getUser(req),
		second_try: false
	});
}






/**
 * Login user or show error message to user	
 *
 * @async
 * @param {HTTP Request} req
 * @param {HTTP Response} res
 * @param {Function} next
 */
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
			tabTitle:"Blog - Login",
			headline: "Login",
			pages: pages,
			websiteName: websiteName,
			user: await authentication.getUser(req),
			second_try: true
		};
		if(error instanceof Errors.InvalidUsername){
			console.error("Not existing username used to login");
			console.debug(error);
			data.error_msg = "Der Nutzername existiert nicht, bitte <a href=\"/user/register\">registrieren</a> Sie sich oder versuchen Sie es erneut.";
			return res.status(401).render("view_login", data );
		}else if(error instanceof Errors.InvalidUserCredentials){
			console.error("Wrong user credentials used for: " + username);
			data.error_msg = "Anmeldedaten sind falsch, bitte versuchen Sie es erneut.";
			return res.status(401).render("view_login", data );
		} 
		next(error);
	}
}

module.exports =  {
	getPage,
	handle_login
};