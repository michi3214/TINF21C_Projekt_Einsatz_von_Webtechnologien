const pages = require("../constant").pages;
const websiteName = require("../constant").websiteName;
const ContentModel = require("./../models/model_content");

//for home page
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
			data: content
		} );
	}
	
}

async function getUpdate(req, res){
	const content = ContentModel.getPost(req.params.id);
	res.render("view_about", {
		tabTitle:"Blog-" + content.headline,
		headline: content.headline,
		pages: pages,
		websiteName: websiteName
	} );
}

async function deletePost(req, res){
	const content = ContentModel.getPost(req.params.id);
	res.render("view_about", {
		tabTitle:"Blog-" + content.headline,
		headline: content.headline,
		pages: pages,
		websiteName: websiteName
	} );
}

async function postUpdate(req, res){
	const content = ContentModel.getPost(req.params.id);
	res.render("view_about", {
		tabTitle:"Blog-" + content.headline,
		headline: content.headline,
		pages: pages,
		websiteName: websiteName
	} );
}

module.exports =  {
	getRead,
	getUpdate,
	deletePost,
	postUpdate

};