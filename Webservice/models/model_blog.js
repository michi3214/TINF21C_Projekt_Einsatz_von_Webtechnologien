const Database = require("./../../Database/database");


/**
 * Prepare data for blogs, load posts and transform to teaser
 *
 * @async
 * @returns {array} - Each Content is in an JSON-Object 
 */
async function getTeaser(){
	const contents = await Database.load_content_from_database();
	if (typeof contents === "undefined"){
		return;
	} else {
		for (const content of contents){
			content.teaser = true;

			const break_positions = [content.content.indexOf(". "), content.content.indexOf("\n") - 1, content.content.indexOf(".\"")].filter(position => position > 0);
			content.content = content.content.substring(0,Math.min(...break_positions)) + "...";
		}
		return contents;
	}
}

module.exports = {getTeaser};

