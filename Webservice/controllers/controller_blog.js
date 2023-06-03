const pages = require("../../constant").pages;
const websiteName = require("../../constant").websiteName;
const BlogModel = require("./../models/model_blog");
const authentication = require("../../Authentication/authentication");
const Errors = require("../../Errors/error");



/**
 * Render home page
 *
 * @async
 * @param {HTTP request} req
 * @param {HTTP response} res
 */
async function getPage(req, res, next){
	const contents = await BlogModel.getTeaser();
	if(typeof contents === "undefined"){
		next(new Errors.Failure("Could not load blog teaser. Please try again later."));
	}
	else{
		res.render("view_blog", {
			tabTitle:"Blog",
			headline: "Blog",
			pages: pages,
			websiteName: websiteName,
			activePage: "Blog",
			contents:contents,
			user: await authentication.get_user(req)
		} );
	}
}

module.exports =  {
	getPage,
};