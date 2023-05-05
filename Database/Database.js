/**
 * This script implement all functions for connection to database. 
*/
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();





// TODO: Add jsdoc
async function _insert_to_database(tbl_name,columns ,content){
}



/**
 * Get all contents from database
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

async function load_content_by_id(id){
	try{
		const content = await prisma.tbl_content.findUnique({ where: { id: parseInt(id) } });
		console.log("Database: " + content);
		return ;
		/*{
			"id": 	     content.id,
			"headline":  content.headline,
			"content":   content.content,
			"modified":  content.modify_timestamp,
			"created":   content.creation_timestamp,
			"author":    content.author_name
		};*/
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
 * Load all datas for the users
 *
 * @async
 * @returns {array}
 */
async function load_user_from_database (){

}



//TODO implement function and docstring
async function add_user_to_database (){
	
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