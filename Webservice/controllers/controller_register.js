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
	res.render("view_register", {
		tabTitle:"Blog - Register",
		headline: "Register",
		pages: pages,
		websiteName: websiteName,
		user: await authentication.get_user(req)
	} );
}

async function handle_register(req, res, next){
	// TDOD: JSDOC 
	const username = req.body.usernameInput;
	const password = req.body.passwordInput;
	const alias = req.body.aliasInput;
	try {
		const token = await authentication.register(username, alias, password);
		return res.cookie(
			"access_token", 
			token, 
			{
				httpOnly: true,
				secure: true
			}
		).status(200).redirect("/");
		
	} catch (error) {
		console.error("Could not register user: " + username);
		if(error instanceof Errors.DatabaseFailure){
			const data = {
				tabTitle:"Blog - Register",
				headline: "Register",
				pages: pages,
				websiteName: websiteName,
				user: await authentication.get_user(req),
				username: username,
				password: password,
				alias: alias
			};
			if(error.message.includes("Unique constraint failed on the fields: (`alias`)")){
				console.debug("Alias wrong");
				data.error_msg = "Der Alias existiert bereits. Bitte nutzen Sie einen anderen.";
				return res.render("view_register", data);
			}else if(error.message.includes("Unique constraint failed on the fields: (`name`)")){
				console.debug("Username wrong");
				data.error_msg = "Der Benutzername wird bereits genutzt. Bitte versuchen Sie einen anderen.";
				return res.render("view_register", data);
			}
		}
		next(error);
	}
}

module.exports =  {
	getPage,
	handle_register
};