const pages = require("../../constant").pages;
const websiteName = require("../../constant").websiteName;
const authentication = require("../../Authentication/authentication");
const Errors = require("../../Errors/error");




/**
 * define error message (default message or special message)
 *
 * @async
 * @param {String} errMsg - Message from error class
 * @param {String} defaultMsg - default error message
 * @returns {String}
 */
async function _checkMessage(errMsg, defaultMsg){
	if (typeof errMsg === "undefined" | errMsg === "" | errMsg.toString() === "0"){
		return defaultMsg;
	}
	return errMsg;
}



/**
 * Page rendering for not found page
 *
 * @async
 * @param {HTTP request} req
 * @param {HTTP response} res
 * @param {String} msg
 */
async function getError404 (req, res,next, msg=""){
	res.status(404).render("error", {
		tabTitle:"Blog - Not found",
		headline: "Page not found!",
		pages: pages,
		websiteName: websiteName,
		message: await _checkMessage(msg, "Sorry page could not be found."),
		user: await authentication.get_user(req)
	} );
}

/**
 * Render page for forbidden interaction
 *
 * @async
 * @param {HTTP request} req
 * @param {HTTP response} res
 * @param {String} msg
 * 
 */
async function getError403 (req, res,next, msg=""){
	res.status(403).render("error", {
		tabTitle:"Blog - Forbidden",
		headline: "Forbidden interaction",
		pages: pages,
		websiteName: websiteName,
		message: await _checkMessage(msg, "You are not allowed to do that! Please check your login."),
		user: await authentication.get_user(req)
	} );
}

/**
 * Render page for internal server error
 *
 * @async
 * @param {HTTP request} req
 * @param {HTTP response} res
 * @param {String} msg
 */
async function getError500 (req, res,next, msg=""){
	res.status(500).render("error", {
		tabTitle:"Blog - Internal Server Error",
		headline: "Internal server error",
		pages: pages,
		websiteName: websiteName,
		message: await _checkMessage(msg, "Something went wrong. Internal Server Error"),
		user: await authentication.get_user(req)
	} );
}





/**
 * Middleware to handle errors:
 * process errors happening while processing
 *
 * @async
 * @param {Error} err
 * @param {HTTP request} req
 * @param {HTTP response} res
 * @param {Function} next
 */
async function getError(err, req, res, next){
	console.error("Error happened while interaction:");
	console.error(err.stack);

	if(err instanceof Errors.InvalidToken){
		await getError403(req, res,next, err.message);

	}else if(err instanceof Errors.UnauthorizedAccess){
		await getError403(req, res,next, err.message);

	}else if(err instanceof Errors.DatabaseFailure){
		await getError500(req, res,next, err.message);

	}else if(err instanceof Errors.Failure){
		await getError403(req, res,next, err.message);
	}else {
		console.error("Undefined error found: " + err);
		await getError500(req, res,next, err.message | "Internal Server Error");
	}	
}



module.exports =  {
	getError403,
	getError404,
	getError500,
	getError

};