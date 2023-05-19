const pages = require("../constant").pages;
const websiteName = require("../constant").websiteName;
const HomeModel = require("./../models/model_home");


/**
 * Render home page
 *
 * @async
 * @param {HTTP request} req
 * @param {HTTP response} res
 */
async function getPage(req, res){
	const contents = await HomeModel.getTeaser();
	if(typeof contents === "undefined"){
		res.redirect("/error500");
	}
	else{
		res.render("view_home", {
			tabTitle:"Blog",
			headline: "Home",
			pages: pages,
			websiteName: websiteName,
			activePage: "Home",
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