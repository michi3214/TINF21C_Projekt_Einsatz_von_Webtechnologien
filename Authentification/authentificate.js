const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const dotenv = require("dotenv");

let users = [];

async function get_secret_key(){
	let key = "";
	dotenv.config();
	if (!process.env.TOKEN_SECRET){
		key = crypto.randomBytes(64).toString("hex");
	}else{
		dotenv.config();
		key = process.env.TOKEN_SECRET;
	}
	return key;
}


async function login(username, password){
	const key = await get_secret_key();
	users.append(
		{
			username: "",
			token: "",
			issued_on: ""
		}
	);
	return   jwt.sign(username, key, { expiresIn: "1800s" });
}

async function logout(username){
	for (let i = 0; i < users.length; i++) { 
		if (users[i].username === username){
			users.splice(i);
			break;
		}
	}
}

async function register(username, alias, password){
}

async function permit(token){

}