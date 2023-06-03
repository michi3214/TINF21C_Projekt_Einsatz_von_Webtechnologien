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
 * Render page for forbidden interaction
 *
 * @async
 * @param {HTTP request} req
 * @param {HTTP response} res
 * @param {String} msg
 * 
 */
async function getError401 (req, res,next, msg=""){
	res.status(401).render("error", {
		tabTitle:"Blog - Unerlaubter Zugang",
		headline: "Unerlaubter Zugang",
		pages: pages,
		websiteName: websiteName,
		message: await _checkMessage(msg, "Sie haben keine Berechtigung für diese Interaktion. Bitte prüfen Sie Ihren Login-Status."),
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
		tabTitle:"Blog - Unerlaubt",
		headline: "Unerlaubte Interaktion",
		pages: pages,
		websiteName: websiteName,
		message: await _checkMessage(msg, "Sie haben keine Berechtigung für diese Interaktion. Bitte prüfen Sie Ihren Login-Status."),
		user: await authentication.get_user(req)
	} );
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
		tabTitle:"Blog - Nicht gefunden",
		headline: "Seite wurde nicht gefunden.",
		pages: pages,
		websiteName: websiteName,
		message: await _checkMessage(msg, "Entschuldigung, Seite konnte nicht gefunden werden."),
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
		tabTitle:"Blog - Interner Serverfehler",
		headline: "Interner Serverfehler",
		pages: pages,
		websiteName: websiteName,
		message: await _checkMessage(msg, "Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut."),
		user: await authentication.get_user(req)
	} );
}





/**
 * Middleware to handle errors:
 * process errors happening while processing, choose the correct error page
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
		await getError401(req, res,next, err.message);

	}else if(err instanceof Errors.DatabaseFailure){
		await getError500(req, res,next, err.message);

	}else if(err instanceof Errors.Failure){
		await getError403(req, res,next, err.message);
	}else {
		console.error("Undefined error found: " + err);
		await getError500(req, res,next, err.message | "Interner Serverfehler");
	}	
}



module.exports =  {
	getError401,
	getError403,
	getError404,
	getError500,
	getError

};