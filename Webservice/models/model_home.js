const Database = require("./../../Database/Database");


async function getContent(){
	const contents = await Database.load_content_from_database();
	const result = [];
	//TODO: get username for author id
	for (const content of contents){
		result.push({
			id: content.id_content,
			headline: content.headline,
			content : content.content,
			modifyed: content.modify_timestamp,
			created: content.creation_timestamp,
			author: content.id_author
		});
	}
	return result;
}

module.exports = {getContent};

