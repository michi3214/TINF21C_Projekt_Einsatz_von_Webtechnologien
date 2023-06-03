const pages = require("../../constant").pages;
const websiteName = require("../../constant").websiteName;
const authentication = require("../../Authentication/authentication");
const database = require("../../Database/database");
const Errors = require("../../Errors/error");





/**
 * Render page for User configuration 
 *
 * @param {HTTP request} req
 * @param {HTTP response} res
 */
async function  getPage(req, res, next){
	const user = await authentication.getUser(req);
	await authentication.check_privilege(user.privilege, 2, next);
	res.render("view_configuration", {
		tabTitle:"Blog - Einstellungen",
		headline: "Einstellungen",
		pages: pages,
		websiteName: websiteName,
		activePage: "Einstellungen",
		user: user

	} );
}



/**
 * Process changes of username, alias or/and password
 *
 * @async
 * @param {HTTP Request} req
 * @param {HTTP Response} res
 * @param {Function} next
 */
async function postPage(req, res, next){
	const new_username = req.body.usernameInput;
	const new_alias = req.body.aliasInput;
	const new_password = req.body.passwordInput;

	console.debug(new_username + " " + new_alias + " " + new_password);
	try {
		const user = await authentication.getUser(req);
	
		if(new_alias !== user.alias){
			const dummy_user = {
				username: "dummy_user123321",
				alias: "dummy_alias123321",
				privilege: 0,
				password:"1234"
			};
			await database.add_user_to_database(dummy_user.username, dummy_user.alias, dummy_user.privilege, dummy_user.password);
			const posts = (await database.load_content_from_database()).filter(post=> post.author === user.alias);
			let promises = [];
			for(const post of posts){
				promises.push(database.changeAuthor(post.id, dummy_user));
			}
			await Promise.all(promises);
			await database.changeAlias(user.username, new_alias);
			promises = [];
			for(const post of posts){
				promises.push(database.changeAuthor(post.id, new_alias));
			}
			await Promise.all(promises);

			await database.delete_user_from_database(dummy_user.username);
		}
	
		if(new_password !== ""){
			await authentication.changePassword(new_password, user.username);
		}

		if(new_username !== user.username){
			await database.changeUsername(user.username, new_username);
		}


		res.redirect("/user/configuration");
	} catch (error) {
		next(error);
	}
}




/**
 * Delete own user from database and delete all posts of the user
 *
 * @async
 * @param {HTTP Request} req
 * @param {HTTP Response} res
 * @param {Function} next
 */
async function handleUserDelete(req, res, next){
	const username = req.params.username;
	try {
		if(username !== (await authentication.getUser(req)).username){
			throw new Errors.UnauthorizedAccess("Es ist Ihnen nicht erlaubt einen anderen Nutzer zu löschen.");
		}
		const user = await database.load_user_from_database(username);
		const posts = (await database.load_content_from_database()).filter(post => post.author === user.alias);
		const promises = [];
		for(const post of posts){
			promises.push(database.delete_content_from_database(post.id));
		}
		await Promise.all(promises);
		res.redirect("/user/logout");     
		await database.delete_user_from_database(username);

	} catch (error) {
		console.error("Could not delete user " + username );
		next(error);
	}
}





module.exports =  {
	getPage,
	postPage,
	handleUserDelete
};