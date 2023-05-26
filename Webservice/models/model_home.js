const Database = require("../../Database/database");

/**
 * Prepare data for blogs, load posts and transform to teaser
 *
 * @async
 * @returns {array} - Each Content is in an JSON-Object 
 */
async function getBlogInformation(){
	const teaserLength = 200;
	const contents = await Database.load_content_from_database();
	if (typeof contents === "undefined"){
		return;
	} else {
		const count = contents.length;
		let sorted_contents = contents.sort((contentA, contentB)=>{
			return new Date(contentA.created).getTime() - new Date(contentB.created).getTime();
		}).reverse();
		sorted_contents = sorted_contents.slice(0,1);
		console.log(sorted_contents);
		for (const content of sorted_contents){
			content.teaser = false;
			if(content.content.length > teaserLength){
				content.content = content.content.substring(0,teaserLength) + "...";
				content.teaser = true;
			}
		}
		return {contents: sorted_contents, count: count};

	}
	//TODO: get alias for author id
	
}

module.exports = {
	getBlogInformation
};