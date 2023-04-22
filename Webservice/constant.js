
const pages=[
	{title:"Home", link:"/", permission:"user", icon:"bi bi-house"},
	{title:"Einstellungen", link:"/", permission:"user", icon:"bi bi-person-lines-fill"},
	{title:"User Management", link:"/", permission:"admin", icon:""},
	{title:"About", link:"/", permission:"user", icon:"bi bi-person-lines-fill"},
];
const websiteName = "Blog";

module.exports = { pages: pages	,
	websiteName: websiteName };