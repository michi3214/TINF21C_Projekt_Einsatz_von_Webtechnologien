const pages = require("../../constant").pages;
const websiteName = require("../../constant").websiteName;
const ContentModel = require("./../models/model_content");
const authentication = require("../../Authentication/authentication");



/**
 * Render page to read full post
 *
 * @async
 * @param {HTTP request} req
 * @param {HTTP response} res
 */
async function getRead(req, res){
	const content = await ContentModel.getPost(req.params.id);
	if(typeof content === "undefined"){
		res.redirect("/error500");
	}
	else{
		res.render("view_read_Content", {
			tabTitle:"Blog-" + content.headline,
			headline: content.headline,
			pages: pages,
			websiteName: websiteName,
			data: content,
			user: await authentication.check_login(req.cookies)
		} );
	}
	
}

async function getUpdate(req, res){
	const content = ContentModel.getPost(req.params.id);
	res.render("view_about", {
		tabTitle:"Blog-" + content.headline,
		headline: content.headline,
		pages: pages,
		websiteName: websiteName,
		user: await authentication.check_login(req.cookies)
	} );
}

async function deletePost(req, res){
	const content = ContentModel.getPost(req.params.id);
	res.render("view_about", {
		tabTitle:"Blog-" + content.headline,
		headline: content.headline,
		pages: pages,
		websiteName: websiteName,
		user: await authentication.check_login(req.cookies)
	} );
}

async function postUpdate(req, res){
	const content = ContentModel.getPost(req.params.id);
	res.render("view_about", {
		tabTitle:"Blog-" + content.headline,
		headline: content.headline,
		pages: pages,
		websiteName: websiteName,
		user: await authentication.check_login(req.cookies)
	} );
}

module.exports =  {
	getRead,
	getUpdate,
	deletePost,
	postUpdate

};