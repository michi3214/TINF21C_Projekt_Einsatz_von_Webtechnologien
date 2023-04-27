/**
 * This script implement all functions with connection to database. 
*/

//TODO Nicht alle Funktionen sind bereits umgestellt. 
const mysql = require("mysql2/promise");
const DATABASE = require("constant_Database");
const { database } = require("./constant_Database");

async function _create_Connection(){
	return mysql.createConnection({host: DATABASE.host, user:DATABASE.user , database: DATABASE.database});
}

async function _load_from_database(tbl_name){
	try {
		const connection = await _create_Connection(); 
		const select_string = "SELECT * FROM `" + tbl_name + "`";
		const [rows] = await connection.execute(select_string);
		return rows;
	} catch (error) {
		console.error("Can not load data from " + tbl_name + " database: " + error);
	}
}

async function _insert_to_database(tbl_name,columns ,content){
	try {
		const connection = await _create_Connection();
		await connection.execute("INSERT INTO `?` (`?`) VALUES (?);", [tbl_name,columns, content]); // array wird mit for durchgelaufen und einzeln eingefügt
		console.log("User added new content: ");
	} catch (error) {
		console.error("Failed to add new content with error:");
		console.error(error);
	}
}

async function load_content_from_database (){
	const tbl_name_content = database.tbl_names.tbl_content;
	return _load_from_database (tbl_name_content);
}

async function add_content_to_database(content){
	const tbl_name_content = database.tbl_names.tbl_content;
	await _insert_to_database(tbl_name_content, ());
	return 1;
}

async function delete_note_from_database(id){
	try {
		const connection = await mysql.createConnection({host:"localhost", user: "root", database: "tinf21C_webtechnologien"});
		await connection.execute("DELETE FROM `tbl_notes` WHERE (id=?);", [id]); // array wird mit for durchgelaufen und einzeln eingefügt DELETE FROM table_name WHERE condition;
		console.log("You deleted the note with the id:", id);
	} catch (error) {
		console.error("Failed to delete note");
		console.error(error);
	}
}

module.exports =  {
	load_content_from_database,
	add_content_to_database,
	delete_note_from_database
};