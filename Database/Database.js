/**
 * This script implement all functions for connection to database. 
*/
const mysql = require("mysql2/promise");
const DATABASE_CONSTANTS = require("./constant_Database").database_data;


/** 
 * create the connection to the database and use the data from the constant_Database.
 * 
 * Please use this function only in a try and catch
 * @returns {mysql.Connection} connection
 */
async function _create_Connection(){
	return await mysql.createConnection({host: DATABASE_CONSTANTS.host, user:DATABASE_CONSTANTS.user , database: DATABASE_CONSTANTS.database});
}


/**
 * Read all columns from the given table.
 * @param {String} tbl_name - name of the table, which should be read
 * @returns { mysql.RowDataPacket | String} columns, on error: errorMsg
 */
async function _load_from_database(tbl_name){
	try {
		const connection = await _create_Connection(); 
		const selectString = "SELECT * FROM " + tbl_name + ";";
		const [rows] = await connection.execute(selectString );
		return rows;
	} catch (error) {
		const errMsg = "The access to the database failed. Error: \n" + error;
		console.error("_load_from_database: " + errMsg);
		return {};
	}
}

// TODO: Add jsdoc
async function _insert_to_database(tbl_name,columns ,content){
	try {
		const connection = await _create_Connection();
		await connection.execute("INSERT INTO `?` (`?`) VALUES (?);", [tbl_name,columns, content]); 
	} catch (error) {
		const errMsg = "Can not insert values. Error: \n" + error;
		console.error("_insert_to_database: " + errMsg);
		return {};
	}
}



/**
 * Get all contents from database
 *
 * @async
 * @returns {unknown}
 */
async function load_content_from_database (){
	const tbl_name_content = DATABASE_CONSTANTS.tables.tbl_content.name;
	const contents = await _load_from_database (tbl_name_content);
	return contents;
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
	const tbl_name_user = DATABASE_CONSTANTS.tables.tbl_user.name;
	const user = await _load_from_database (tbl_name_user);
	return user;
}

/**
 * 
 */
async function get_user_name(id){
	const users = await load_user_from_database();
	for (const user of users){
		if(user[DATABASE_CONSTANTS.tables.tbl_user.column.id] === id){
			return user[DATABASE_CONSTANTS.tables.tbl_user.column.name];
		}
	}
	return ""; 
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
	delete_content_from_database,
	load_user_from_database,
	add_user_to_database,
	delete_user_from_database,
	get_user_name
};