const pages = require("../../constant").pages;
const websiteName = require("../../constant").websiteName;
const BlogModel = require("./../models/model_blog");


/**
 * Render home page
 *
 * @async
 * @param {HTTP request} req
 * @param {HTTP response} res
 */
async function getPage(req, res){
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
			user:{
				login:false,
				name:"Hallo",
				privilege:1 // use privileges from constants
			}
	
		} );
	}
}

module.exports =  {
	getPage,
};