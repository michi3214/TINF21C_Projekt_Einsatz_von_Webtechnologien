const Database = require("./../../Database/Database");


/**
 * Prepare data for the read page. The data is parsed in a readable manner.
 *
 * @async
 * @returns {JSON} - Content
 */
async function getPost(id){
	const post = await Database.load_content_by_id(id);
	if(typeof post === "undefined"){
		return;
	}
	post.modified = post.modified.toDateString();
	post.created = post.created.toDateString();
	return post;
}

module.exports = {getPost};

