/**
 * In this file are own errors defined.
 */



/**
 * Error for unauthorized Access (e.g. User is not allowed to do the requested action)
 *
 * @class UnauthorizedAccess
 * @typedef {UnauthorizedAccess}
 * @extends {Error}
 */
class UnauthorizedAccess extends Error {
	constructor (messsage){
		super(messsage);

		this.name = this.constructor.name;
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
		const messsage = "Your login is expired, please login again.";
		super(messsage);

		this.name = this.constructor.name;
	}
}




/**
 * Failure while interaction with the database happened.
 *
 * @class DatabaseFailure
 * @typedef {DatabaseFailure}
 * @extends {Error}
 */
class DatabaseFailure extends Error {
	constructor (messsage){
		super(messsage);

		this.name = this.constructor.name;
		Error.captureStackTrace(this, this.constructor);
		this.status = 500;
	}
}



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

		this.name = this.constructor.name;
		Error.captureStackTrace(this, this.constructor);
		this.status = 500;
	}
}

module.exports = {
	UnauthorizedAccess: UnauthorizedAccess,
	InvalidToken:       InvalidToken,
	DatabaseFailure:    DatabaseFailure,
	Failure:            Failure
};