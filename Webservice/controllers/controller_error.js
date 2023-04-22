const pages = require("../constant").pages;
const websiteName = require("../constant").websiteName;

//for home page
const getPage = (req, res) => {
	res.render("error404", {
		tabTitle:"Blog - Not found",
		headline: "Page not found!",
		pages: pages,
		websiteName: websiteName,
		activePage: ""
	} );
};

module.exports =  {
	getPage,
};