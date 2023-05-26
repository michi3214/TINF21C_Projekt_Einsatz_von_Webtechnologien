const pages = require("../../constant").pages;
const websiteName = require("../../constant").websiteName;
const HomeModel = require("./../models/model_home");
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

	const data = await HomeModel.getBlogInformation();
	if(typeof data === "undefined"){
		res.redirect("/error500");
	}
	else{
		res.render("view_home", {
			tabTitle:"Blog-Home",
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