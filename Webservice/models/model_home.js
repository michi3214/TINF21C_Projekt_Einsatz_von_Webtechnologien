const Database = require("./../../Database/Database");


/**
 * Prepare data for Home page.
 *
 * @async
 * @returns {array} - Each Content is in an JSON-Object 
 */
async function getTeaser(){
	const contents = await Database.load_content_from_database();
	const result = [];
	//TODO: get username for author id
	for (const content of contents){
		let teaser = "";
		if(content.content.length > 25){
			teaser = content.content.substring(0,25) + "...";
		}else {
			teaser = content.content;
		}
		const author = await Database.get_user_name(content.id_author);
		result.push({
			id: content.id_content,
			headline: content.headline,
			content : teaser,
			modified: content.modify_timestamp,
			created: content.creation_timestamp,
			author: author
		});
	}
	return result;
}

module.exports = {getTeaser};

