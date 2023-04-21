/**
 * This page includes the express logic and rouing. 
 */

const mysql = require("mysql2/promise");
const express   = require("express");
const app 	    = express();
const path = require("path");


app.set("views", path.join(__dirname, "views"));
app.set("view engine","pug");
app.use(express.urlencoded({extended: false}));

// Constants
const websiteTitle = "Blog";
const subPages = [
	{title: "Home", link: "/", tabTitle: "Blog", activate:false, viewPath:"user_view", icon:"bi bi-house"}, 
	{title: "Impressum", tabTitle: "Einstellungen" ,link: "/Impressum", activate:false, viewPath:"impressum", icon:"bi bi-person-lines-fill"},
	{title: "Einstellungen", tabTitle: "Impressum", link: "/Einstellungen", activate:false, viewPath:"user_information", icon:"bi bi-tools"}
];

/**
 * change_active_page
 * Change the value of the key activate to true of the loaded page and false for the other pages.
 * @param {String} route - link to the page
 */
function change_active_page(route){
	for(const page of subPages){
		if(page.link === route){
			page.activate = true;
		}else{
			page.activate = false;
		}
	}
}

/**
 * This is used to manage all get request for the different pages
 */
for (const page of subPages){
	app.get(page.link, function(req, res){
		change_active_page(page.link);
		res.render(page.viewPath, {
			navbar:{
				websiteTitle, 
				subPages
			},
			header:{tabTitle:page.tabTitle}
		});
	});
}



console.info("Start express");
app.listen(3000);