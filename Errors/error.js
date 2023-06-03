/**
 * In this file are own errors defined.
 */

/**
 * Universal error. Should be used if the error cannot be assigned to a clear reason. 
 *
 * @class Failure
 * @typedef {Failure}
 * @extends {Error}
 */
class Failure extends Error {
	constructor (messsage){
		super(messsage);

		this.name = "Failure";
		Error.captureStackTrace(this, this.constructor);
		this.status = 500;
	}
}


/**
 * Error for unauthorized Access (e.g. User is not allowed to do the requested action)
 *
 * @class UnauthorizedAccess
 * @typedef {UnauthorizedAccess}
 * @extends {Error}
 */
class UnauthorizedAccess extends Failure {
	constructor (messsage){
		super(messsage);

		this.name = "UnauthorizedAccess";
		Error.captureStackTrace(this, this.constructor);
		this.status = 403;
	}
}





/**
 * This error should be used if a jwt token exists, but is not valid anymore
 *
 * @class InvalidToken
 * @typedef {InvalidToken}
 * @extends {Error}
 */
class InvalidToken extends UnauthorizedAccess {
	constructor (){
		const messsage = "Ihr Login ist abgelaufen, bitte loggen Sie sich erneut ein.";
		super(messsage);
		this.name = "InvalidToken";
	}
}





/**
 * Error for Invalid User Credentials used to login
 *
 * @class InvalidUserCredentials
 * @typedef {InvalidUserCredentials}
 * @extends {Failure}
 */
class InvalidUserCredentials extends Failure {
	constructor(messsage="Falsche Anmeldedaten wurden genutzt."){
		super(messsage);
		this.name = "InvalidUserCredentials";
	}
}



class InvalidUsername extends InvalidUserCredentials{
	constructor(messsage="Benutzername ist nicht valide."){
		super(messsage);
		this.name = "InvalidUsername";
	}
}




/**
 * Failure while interaction with the database happened.
 *
 * @class DatabaseFailure
 * @typedef {DatabaseFailure}
 * @extends {Error}
 */
class DatabaseFailure extends Failure {
	constructor (messsage="Fehler bei der Interaktion mit der Datenbank"){
		super(messsage);

		this.name = "DatabaseFailure";
		Error.captureStackTrace(this, this.constructor);
		this.status = 500;
	}
}





module.exports = {
	UnauthorizedAccess,
	InvalidToken,
	InvalidUserCredentials,
	InvalidUsername,
	DatabaseFailure,
	Failure
};