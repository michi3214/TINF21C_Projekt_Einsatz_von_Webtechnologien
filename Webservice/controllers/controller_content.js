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
		let user = {};
		try{
			user =  await authentication.check_login(req, res);
		}catch(err){
			user = await authentication.get_basic_user();
			res.clearCookie("access_token");
		}
		res.render("content/view_read", {
			tabTitle:"Blog-" + content.headline,
			headline: content.headline,
			pages: pages,
			websiteName: websiteName,
			activePage: "Blog",
			data: content,
			user: user
		} );
	}
	
}




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

module.exports =  {
	getRead,
	getCreate

};