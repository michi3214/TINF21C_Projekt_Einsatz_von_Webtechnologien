/**
 * This script implement all functions for connection to database. 
*/
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


/**
 * Get all contents (posts) from database
 *
 * @async
 * @returns {array} - All contents in JSON structure
 */
async function load_content_from_database (){
	try{
		const contents = await prisma.tbl_content.findMany();
		const result = [];
		for(const content of contents){
			const contentObj = {
				"id": 	     content.id,
				"headline":  content.headline,
				"content":   content.content,
				"modified":  content.modify_timestamp,
				"created":   content.creation_timestamp,
				"author":    content.author_name
			};
			result.push(contentObj);
		}
		return result;
	}catch(error){
		console.error("Failed to load content from database");
		console.error(error);
		return;
	}
}




/**
 * Load a post from the database, which is specified by the id. 
 *
 * @async
 * @param {number} id - content id
 */
async function load_content_by_id(id){
	try{
		const content = await prisma.tbl_content.findUnique({ where: { id: parseInt(id) } });
		return {
			"id": 	     content.id,
			"headline":  content.headline,
			"content":   content.content,
			"modified":  content.modify_timestamp,
			"created":   content.creation_timestamp,
			"author":    content.author_name
		};
	}catch(error){
		console.error("Failed to load content from database");
		console.error(error);
		return;
	}

	
}

//TODO implement function and docstring
async function add_content_to_database (){
	
}

//TODO implement function and docstring
async function delete_content_from_database (){
	
}


/**
 * Load specific information for given username
 *
 * @async
 * @returns {array}
 */
async function load_user_from_database (username){
	try{
		const user = await prisma.tbl_author.findUnique({ where: { name: username } });
		return {
			username: user.name,
			alias: user.alias,
			hash_password: user.password,
			privilege: user.privilege
		};
	}catch(error){
		console.error("Failed to load user: " + username + " from database");
		console.error(error);
		return;
	}

}




/**
 * Add one user to the database
 *
 * @async
 * @param {string} username
 * @param {string} alias
 * @param {string} privilege
 * @param {string} password
 */
async function add_user_to_database (username, alias, privilege, password){
	try{
		await prisma.tbl_author.create({
			data:{
				name : username,
				alias: alias,
				password: password,
				privilege: privilege
			}
		});
		return 0;
	}catch(err){
		console.error("Can not add user: " + username);
		console.error(String(err));
		return {
			msg: "Can not add user. Reason: " + String(err)
		};
	}
	
}

//TODO implement function and docstring
async function delete_user_from_database (){
	
}


module.exports =  {
	load_content_from_database,
	add_content_to_database,
	load_content_by_id,
	delete_content_from_database,
	load_user_from_database,
	add_user_to_database,
	delete_user_from_database
};