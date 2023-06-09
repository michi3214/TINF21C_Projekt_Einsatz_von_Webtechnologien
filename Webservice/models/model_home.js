const Database = require("../../Database/database");

/**
 * Prepare data for blogs, load posts and transform to teaser
 *
 * @async
 * @returns {array} - Each Content is in an JSON-Object 
 */
async function getBlogInformation(){
	const contents = await Database.load_content_from_database();
	if (typeof contents === "undefined"){
		return;
	} else {
		const count = contents.length;
		let sorted_contents = contents.sort((contentA, contentB)=>{
			return new Date(contentA.created).getTime() - new Date(contentB.created).getTime();
		}).reverse();
		sorted_contents = sorted_contents.slice(0,1);
		for (const content of sorted_contents){
			content.teaser = false;
			const break_positions = [content.content.indexOf(". "), content.content.indexOf("\n") - 1, content.content.indexOf(".\"")].filter(position => position > 0);
			if(content.content.length > Math.min(...break_positions)){
				content.content = content.content.substring(0,Math.min(...break_positions)) + "...";
				content.teaser = true;
			}
		}
		return {contents: sorted_contents, count: count};

	}
}

module.exports = {
	getBlogInformation
};