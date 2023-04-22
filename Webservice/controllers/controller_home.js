const pages = require("../constant").pages;
const websiteName = require("../constant").websiteName;

//for home page
const getPage = (req, res) => {
	res.render("view_home", {
		tabTitle:"Blog",
		headline: "Home",
		pages: pages,
		websiteName: websiteName,
		activePage: "Home"

	} );
};

module.exports =  {
	getPage,
};