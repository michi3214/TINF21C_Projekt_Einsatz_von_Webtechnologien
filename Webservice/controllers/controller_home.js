const pages = require("../constant").pages;
const websiteName = require("../constant").websiteName;
const HomeModel = require("./../models/model_home");

//for home page
async function getPage(req, res){
	const contents = await HomeModel.getTeaser();
	res.render("view_home", {
		tabTitle:"Blog",
		headline: "Home",
		pages: pages,
		websiteName: websiteName,
		activePage: "Home",
		contents:contents

	} );
}

module.exports =  {
	getPage,
};