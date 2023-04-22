
const pages=[
	{title:"Home", link:"/", permission:"user", icon:"bi bi-house"},
	{title:"Einstellungen", link:"/userConfig", permission:"user", icon:"bi bi-tools"},
	{title:"User Management", link:"/", permission:"admin", icon:""},
	{title:"Impressum", link:"/about", permission:"user", icon:"bi bi-person-lines-fill"},
];
const websiteName = "Blog";

module.exports = { pages: pages	,
	websiteName: websiteName };