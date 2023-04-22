/**
 * This page includes the express logic. 
 */

const mysql = require("mysql2/promise");
const express   = require("express");
const app 	    = express();
const path = require("path");

// configure the views
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

//Routes
app.use("/", require("./router/router_user"));

const PORT = 3000;
app.listen(PORT, console.log("Server has started at port " + PORT));