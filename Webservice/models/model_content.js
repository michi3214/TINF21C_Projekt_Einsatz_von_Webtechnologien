const Database = require("./../../Database/Database");


/**
 * Prepare data for Home page.
 *
 * @async
 * @returns {array} - Each Content is in an JSON-Object 
 */
async function getPost(id){
	const post = await Database.load_content_by_id(id);
	console.log("model: " + JSON.stringify(post));
	post.modified = post.modified.toDateString();
	post.created = post.created.toDateString();
	return post;
}

module.exports = {getPost};

