const pages = require("../constant").pages;
const websiteName = require("../constant").websiteName;

//for home page
const getPage = (req, res) => {
	res.render("view_userConfig", {
		tabTitle:"Blog-Einstellungen",
		headline: "Einstellungen",
		pages: pages,
		websiteName: websiteName,
		activePage: "Einstellungen"

	} );
};

module.exports =  {
	getPage,
};