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
	handleUserDelete
};