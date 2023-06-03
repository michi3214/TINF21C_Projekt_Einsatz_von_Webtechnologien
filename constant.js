const privileges = {
	"basic":1,
	"user":2,
	"admin":3
};

const pages=[
	{title:"Home", link:"/",  icon:"bi bi-house", privilege:privileges["basic"]},
	{title:"Blog", link:"/blog",  icon:"bi bi-journal", privilege:privileges["basic"]},
	{title:"Einstellungen", link:"/user/configuration",  icon:"bi bi-tools", privilege:privileges["user"]},
	{title:"Impressum", link:"/about", icon:"bi bi-person-lines-fill", privilege:privileges["basic"]},
];

const websiteName = "Blog";



module.exports = { 
	pages: pages	,
	websiteName: websiteName,
	privileges: privileges
};