const pages = require("../../constant").pages;
const websiteName = require("../../constant").websiteName;
const BlogModel = require("./../models/model_blog");
const authentication = require("../../Authentication/authentication");



/**
 * Render home page
 *
 * @async
 * @param {HTTP request} req
 * @param {HTTP response} res
 */
async function getPage(req, res){
	let user = {};
	try{
		user =  await authentication.check_login(req.cookies);
	}catch(err){
		user = await authentication.get_basic_user();
		res.clearCookie("access_token");
	}
	const contents = await BlogModel.getTeaser();
	if(typeof contents === "undefined"){
		res.redirect("/error500");
	}
	else{
		res.render("view_blog", {
			tabTitle:"Blog",
			headline: "Blog",
			pages: pages,
			websiteName: websiteName,
			activePage: "Blog",
			contents:contents,
			user: user
		} );
	}
}

module.exports =  {
	getPage,
};