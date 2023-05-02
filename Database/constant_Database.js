const database_data = {
	host: "localhost",
	user: "root",
	password: "",
	database: "DB_TINF21C_Webtechnologien_Blog",
	tables:{
		tbl_content:{
			name:"tbl_content",
			column:{
				id: "id_content",
				headline: "headline",
				content: "content",
				modify_timestamp: "modify_timestamp",
				creation_timestamp: "creation_timestamp",
				id_author: "id_author",
			}
		},
		tbl_user:{
			name:"tbl_content",
			column:{
				id: "id_user",
				name: "user_name",
				password: "user_password",
				salt: "salt",
				privilege_read: "privilege_read",
				privilege_update: "privilege_update",
				privilege_delete: "privilege_delete",
			}
		},
	}
};


module.exports = { database_data };