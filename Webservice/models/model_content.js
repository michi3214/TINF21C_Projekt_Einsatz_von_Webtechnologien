const Database = require("./../../Database/database");


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



/**
 * add one post
 *
 * @async
 * @param {String} username
 * @param {String} headline
 * @param {String} content
 */
async function addPost(username, headline, content){
	await Database.add_content_to_database(headline, content, username);
}





/**
 * Delete one post
 *
 * @async
 * @param {String} id - post id
 */
async function deletePost(id){
	await Database.delete_content_from_database(id);
}

module.exports = {
	getPost,
	addPost,
	deletePost
};

