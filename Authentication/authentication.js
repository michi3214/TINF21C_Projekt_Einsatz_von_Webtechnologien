const JWT = require("jsonwebtoken");
const BCRYPT = require("bcrypt");

const Database = require("./../Database/database");
const Privileges = require("../constant").privileges;
const Errors = require("../Errors/error");

const users = [];
const [secret_key, expireTime] = _get_configurations();



/**
 * check for expired users in the users array and delete them
 */
const check_period = 5; 
const check_interval = check_period * 60 * 1000;
setInterval(() => {
	for (let i = 0; i < users.length; i++) { 
		if ((new Date().getTime() - new Date(users[i].issued_on).getTime()) > (expireTime * 1000)){ 
			users.splice(i);
		}
	}
}, check_interval);



/**
 * Read TOKEN_SECRET and TOKEN_EXPIRE_TIME from the process.env variable and save it into local variables
 *
 * @returns {Array} - TOKEN_SECRET as String and TOKEN_EXPIRE_TIME as Integer
 */
function _get_configurations(){
	if (!process.env.TOKEN_SECRET || !process.env.TOKEN_EXPIRE_TIME){
		console.error("No secret key found in config File.");
		throw new Error("No secret key or expire time found in config File.");
	}
	return [process.env.TOKEN_SECRET.trim(), parseInt(process.env.TOKEN_EXPIRE_TIME.trim())];
}





/**
 * add the user to the local users variable
 *
 * @async
 * @param {string} username
 * @param {string} privilege
 * @returns {JsonWebToken} 
 */
async function _add_user(username, privilege){
	const user = {
		username: username,
		privilege: privilege,
		issued_on: new Date().getTime()
	};
	const token = JWT.sign(
		{username: username}, 
		secret_key, { expiresIn: expireTime}
	);
	user.token = token;
	users.push(user);
	return token;
}






/**
 * process the login
 *
 * @async
 * @param {string} username
 * @param {string} password
 * @returns {JsonWebToken}
 */
async function login(username, password){
	const user = await Database.load_user_from_database(username);
	const hash_password = user.hash_password;
	const privilege = user.privilege;
	if (await BCRYPT.compare(password, hash_password)){
		return await _add_user(username, privilege);
	}else{
		throw new Errors.InvalidUserCredentials(); 
	}
}




/**
 * process logout of one user
 *
 * @async
 * @param {*} cookies - cookie with the given token
 */
async function logout(cookies){
	if(Object.prototype.hasOwnProperty.call(cookies, "access_token")){
		const token = cookies.access_token;

		for (let i = 0; i < users.length; i++) { 
			if (users[i].token === token){
				users.splice(i);
				break;
			}
		}
	}
}



/**
 * process register of new user
 * on error return error message
 *
 * @async
 * @param {string} username
 * @param {string} alias
 * @param {string} password
 * @returns {JsonWebToken | string}
 */
async function register(username, alias, password){
	const privilege = Privileges["user"];
	const salt = await BCRYPT.genSalt(15);
	const password_hash = await BCRYPT.hash(password, salt);
	const result = await Database.add_user_to_database(username,alias,privilege,password_hash);
	if (!result){
		const token = await _add_user(username, privilege);
		return token;
	}
}



/**
 * Function to define not logged in user
 *
 * @async
 * @returns {JSON}
 */
async function _get_basic_user(){
	return {
		login: false,
		privilege: Privileges["basic"]
	};
}


/**
 * check if the token is listed in the user array and not expired
 *
 * @async
 * @param {HTTP Request} req
 * @param {HTTP Response} res
 * @param {Function} next
 * @returns {Object} - user object with username, permission and status of user (logged in or not)
 */
async function check_login(req,res, next){
	const cookies = req.cookies;


	try{
		const token = cookies.access_token;
		const dec_token = JWT.verify(token, secret_key);
		const verify = users.filter((user)=> user.username === dec_token.username && user.token === token);

		if(verify.length === 1){
			verify[0].issued_on = new Date().getTime();

		}else if(verify.length > 1){
			console.error("Internal server error, too many valid users for token found.\n Can not accept: " + dec_token.username);
			next(new Errors.Failure("More than one user with this token. Could not check login."));
		
		}else{
			console.error("Unauthorized token used.");
			res.clearCookie("access_token");
			next(new Errors.InvalidToken());
		}
	}
	catch(err){
		if(typeof err === Errors.Failure){
			next(err);
		}
		
		console.error("Can not verify user. " + err);
		res.clearCookie("access_token");
		next(new Errors.InvalidToken());
	}
}




async function get_user(req){
	const cookies = req.cookies;
	try{
		const token = cookies.access_token;
		const dec_token = JWT.verify(token, secret_key);
		const verify = users.filter((user)=> user.username === dec_token.username && user.token === token);
		const user = {
			username: verify[0].username,
			login: true,
			privilege: verify[0].privilege
		};
		return user;
	}catch{
		return await _get_basic_user();
	}
}



module.exports =  {
	login,
	logout,
	register,
	check_login,
	get_user
};