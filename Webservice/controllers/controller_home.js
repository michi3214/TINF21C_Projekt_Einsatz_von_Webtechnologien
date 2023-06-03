const pages = require("../../constant").pages;
const websiteName = require("../../constant").websiteName;
const HomeModel = require("./../models/model_home");
const authentication = require("../../Authentication/authentication");
const Errors = require("../../Errors/error");



/**
 * Render home page
 *
 * @async
 * @param {HTTP request} req
 * @param {HTTP response} res
 */
async function getPage(req, res){
	const user =  await authentication.getUser(req);
	const data = await HomeModel.getBlogInformation();
	
	if(typeof data === "undefined"){
		Errors.Failure("Could not load information about the blog.");
	}
	else{
		res.render("view_home", {
			tabTitle:"Blog - Home",
			headline: "Home",
			pages: pages,
			websiteName: websiteName,
			activePage: "Home",
			contents:data.contents,
			count: data.count,
			user: user
		} );
	}
}

module.exports =  {
	getPage,
};