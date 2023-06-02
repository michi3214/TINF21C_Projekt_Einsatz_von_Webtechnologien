const pages = require("../../constant").pages;
const websiteName = require("../../constant").websiteName;
const ContentModel = require("./../models/model_content");
const authentication = require("../../Authentication/authentication");
const Errors = require("../../Errors/error");



/**
 * Render page to read full post
 *
 * @async
 * @param {HTTP request} req
 * @param {HTTP response} res
 */
async function getRead(req, res){
	console.log("Read article : " + req.params.id);
	const content = await ContentModel.getPost(req.params.id);
	if(typeof content === "undefined"){
		throw Errors.Failure("Could not found content.");
	}
	else{
		res.render("content/view_read", {
			tabTitle:"Blog-" + content.headline,
			headline: content.headline,
			pages: pages,
			websiteName: websiteName,
			activePage: "Blog",
			data: content,
			user: await authentication.get_user(req)
		} );
	}
	
}





/**
 * Render page to create new post
 *
 * @async
 * @param {HTTP Request} req
 * @param {HTTP Response} res
 */
async function getCreate(req, res){
	res.render("content/view_create", {
		tabTitle:"Blog-Create new Post",
		headline: "Create new Post",
		pages: pages,
		websiteName: websiteName,
		user: await authentication.get_user(req),
		activePage: "Blog"
	} );
}





/**
 * add one post to database
 *
 * @async
 * @param {HTTP Request} req
 * @param {HTTP Response} res
 */
async function postCreate(req, res, next){
	const user = await authentication.get_user(req);
	await authentication.check_privilege(user.privilege, 2, next);

	const headline = req.body.headlineInput;
	const content = req.body.contentInput;

	await ContentModel.addPost(user.username, headline, content);
	res.redirect("/blog");
}




async function deletePost(req, res, next){
	const user = await authentication.get_user(req);
	await authentication.check_privilege(user.privilege, 2, next);
	//TODO check if author delete or admin
	console.log("Delete article : " + req.params.id);

	await ContentModel.deletePost(req.params.id);
	res.redirect("/blog");
}
module.exports =  {
	getRead,
	getCreate,
	postCreate,
	deletePost

};