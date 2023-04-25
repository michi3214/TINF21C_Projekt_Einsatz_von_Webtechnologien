-- This script creates the database for a blog web application
-- The path to the csv can be changed on line 33 and 43

-- Create Database
    DROP DATABASE IF EXISTS DB_TINF21C_Webtechnologien_Blog;
    CREATE DATABASE DB_TINF21C_Webtechnologien_Blog;
    USE DB_TINF21C_Webtechnologien_Blog;

-- Create tables
    CREATE TABLE tbl_user(
        id_user INT AUTO_INCREMENT,
        user_name VARCHAR(255) NOT NULL UNIQUE,
        user_password VARCHAR(255) NOT NULL,
        salt VARCHAR(255) NOT NULL,
        privilege_read boolean DEFAULT 1,
        privilege_update boolean DEFAULT 0,
        privilege_delete boolean DEFAULT 0,
        PRIMARY KEY (id_user)
    );

    CREATE TABLE tbl_content(
        id_content INT AUTO_INCREMENT,
        headline VARCHAR(255) NOT NULL,
        content VARCHAR(255) NOT NULL,
        modify_timestamp DATETIME NOT NULL,
        creation_timestamp DATETIME NOT NULL,
        id_author INT,
        PRIMARY KEY (id_content)
    );

-- Import 
    -- Import User
        LOAD DATA INFILE 'csv/Webtechnologien/user.csv'
        INTO TABLE tbl_user 
        FIELDS TERMINATED BY ';' 
        ENCLOSED BY '"'
        LINES TERMINATED BY '\n'
        IGNORE 2 ROWS
        (user_name, user_password,salt,  privilege_read, privilege_update, privilege_delete)
        SET id_user = NULL;

    -- Import Content
        LOAD DATA INFILE 'csv/Webtechnologien/content.csv' 
        INTO TABLE tbl_content 
        FIELDS TERMINATED BY ';' 
        ENCLOSED BY '"'
        LINES TERMINATED BY '\n'
        IGNORE 2 ROWS
        (headline, content, modify_timestamp,creation_timestamp, id_author)
        SET id_content = NULL;



-- Set foreign keys
    ALTER TABLE tbl_content ADD FOREIGN KEY (id_author) REFERENCES tbl_user(id_user);