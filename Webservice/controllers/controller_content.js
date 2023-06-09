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
		throw new Errors.Failure("Could not found content.");
	}
	else{
		res.render("content/view_read", {
			tabTitle:"Blog - " + content.headline,
			headline: content.headline,
			pages: pages,
			websiteName: websiteName,
			activePage: "Blog",
			data: content,
			user: await authentication.getUser(req)
		});
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
		tabTitle:"Blog - Erstelle neuen Beitrag",
		headline: "Erstelle neuen Beitrag",
		pages: pages,
		websiteName: websiteName,
		user: await authentication.getUser(req),
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
	const user = await authentication.getUser(req);
	await authentication.check_privilege(user.privilege, 2, next);

	const headline = req.body.headlineInput;
	const content = req.body.contentInput;

	await ContentModel.addPost(user.username, headline, content);
	res.redirect("/blog");
}




/**
 * handle request to delete one post
 *
 * @async
 * @param {HTTP Request} req
 * @param {HTTP Response} res
 * @param {Function} next
 */
async function deletePost(req, res, next){
	const user = await authentication.getUser(req);
	await authentication.check_privilege(user.privilege, 3, next);
	console.log("Delete article : " + req.id);

	await ContentModel.deletePost(req.params.id);
	res.redirect("/blog");
}




/**
 * Render page to edit existing post
 *
 * @async
 * @param {HTTP Request} req
 * @param {HTTP Response} res
 */
async function getEdit(req, res, next){
	const user = await authentication.getUser(req);
	await authentication.check_privilege(user.privilege, 3, next);
	const content = await ContentModel.getPost(req.params.id);
	res.render("content/view_edit", {
		tabTitle:"Blog - Bearbeite den Beitrag",
		headline: "Bearbeite den Beitrag",
		pages: pages,
		websiteName: websiteName,
		user: await authentication.getUser(req),
		activePage: "Blog",
		content: {
			headline: content.headline,
			content: content.content
		}
	} );
}




/**
 * process edit of one post. 
 *
 * @async
 * @param {HTTP Request} req
 * @param {HTTP Response} res
 * @param {Function} next
 */
async function editPost(req, res, next){
	const user = await authentication.getUser(req);
	await authentication.check_privilege(user.privilege, 3, next);

	const content_id = req.params.id;
	const headline = req.body.headlineInput;
	const content = req.body.contentInput;
	try{
		await ContentModel.editPost(user.alias, content_id, headline, content);
	}catch(error){
		console.error("Could not edit post " + content_id);
		next(error);
	}
	res.redirect("/content/read/" + content_id);

}




module.exports =  {
	getRead,
	getCreate,
	postCreate,
	deletePost,
	getEdit,
	editPost

};