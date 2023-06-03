/**
 * This script implement all functions for connection to database. 
 * // TODO: all database function need the next() to handle errors while interaction
*/
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const Errors = require("../Errors/error");


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
		return result.reverse();
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
		console.error("Failed to load content " + id + " from database");
		console.error(error);
		return;
	}

	
}


/**
 * Add post to database
 *
 * @async
 * @param {String} headline
 * @param {String} content
 * @param {String} author_name
 */
async function add_content_to_database (headline, content, author_name){
	const author_alias = (await load_user_from_database(author_name)).alias;
	try {
		await prisma.tbl_content.create({data:{
			headline,
			content,
			author_name: author_alias
		}});
		
	} catch (error) {
		console.error("Failed to add content " + headline + " to database");
		console.error(error);
	}
}






/**
 * Delete content with the given id from the database
 *
 * @async
 * @param {String | Number} id - content id
 */
async function delete_content_from_database(id){
	id = parseInt(id);
	try {
		await prisma.tbl_content.delete({where:{id:id}});
	} catch (error) {
		console.error("Could not delete contnet " + id + " from database: ");
		console.error(error);
	}
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
		throw new Errors.DatabaseFailure(Error.message);
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
		throw new Errors.DatabaseFailure(err.message);
	}
	
}

//TODO implement function and docstring
async function delete_user_from_database(id){
	
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