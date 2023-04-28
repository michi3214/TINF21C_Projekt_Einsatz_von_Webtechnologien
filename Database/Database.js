/**
 * This script implement all functions for connection to database. 
*/
const mysql = require("mysql2/promise");
const DATABASE = require("constant_Database");
const { database } = require("./constant_Database");


/** 
 * create the connection to the database and use the data from the constant_Database.
 * 
 * Please use this function only in a try and catch
 * @returns {mysql.Connection} connection
 */
async function _create_Connection(){
	return await mysql.createConnection({host: DATABASE.host, user:DATABASE.user , database: DATABASE.database});
}


/**
 * Read all columns from the given table.
 * @param {String} tbl_name - name of the table, which should be read
 * @returns { mysql.RowDataPacket | String} columns, on error: errorMsg
 */
async function _load_from_database(tbl_name){
	try {
		const connection = await _create_Connection(); 
		const select_string = "SELECT * FROM `" + tbl_name + "`";
		const [rows] = await connection.execute(select_string);
		return rows;
	} catch (error) {
		const errMsg = "The access to the database failed. Error: \n" + error;
		console.error("_load_from_database: " + errMsg);
		return errMsg;
	}
}

//TODO -[] Create docstring 
async function _insert_to_database(tbl_name,columns ,content){
	try {
		const connection = await _create_Connection();
		await connection.execute("INSERT INTO `?` (`?`) VALUES (?);", [tbl_name,columns, content]); 
	} catch (error) {
		const errMsg = "Can not insert values. Error: \n" + error;
		console.error("_insert_to_database: " + errMsg);
		return errMsg;
	}
}

async function load_content_from_database (){
	const tbl_name_content = database.tbl_names.tbl_content;
	return _load_from_database (tbl_name_content);
}

//TODO implement function and docstring
async function add_content_to_database (){
	
}

//TODO implement function and docstring
async function delete_content_from_database (){
	
}

//TODO implement function and docstring
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
	delete_content_from_database,
	load_user_from_database,
	add_user_to_database,
	delete_user_from_database
};