const authentication = require("../../Authentication/authentication");

async function getPage(req, res){
	authentication.logout(req.cookies);
	res.clearCookie("access_token").redirect("/");
}

module.exports =  {
	getPage
};