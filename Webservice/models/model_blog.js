const Database = require("./../../Database/Database");


/**
 * Prepare data for Home page.
 *
 * @async
 * @returns {array} - Each Content is in an JSON-Object 
 */
async function getTeaser(){
	const teaserLength = 200;
	const contents = await Database.load_content_from_database();
	if (typeof contents === "undefined"){
		return;
	} else {
		for (const content of contents){
			content.teaser = false;
			if(content.content.length > teaserLength){
				content.content = content.content.substring(0,teaserLength) + "...";
				content.teaser = true;
			}
		}
		return contents;

	}
	//TODO: get alias for author id
	
}

module.exports = {getTeaser};

