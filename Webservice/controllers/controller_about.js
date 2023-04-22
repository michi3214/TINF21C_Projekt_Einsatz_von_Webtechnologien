const pages = require("../constant").pages;
const websiteName = require("../constant").websiteName;

//for home page
const getPage = (req, res) => {
	res.render("view_about", {
		tabTitle:"Blog-Impressum",
		headline: "Impressum",
		pages: pages,
		websiteName: websiteName,
		activePage: "Impressum"

	} );
};

module.exports =  {
	getPage,
};