/**
 * This page includes the express logic. 
 */

const express   = require("express");
const app 	    = express();
const path = require("path");

const errorController = require(path.join(__dirname, "controllers", "controller_error.js"));

// configure the views
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

//Routes
app.use("/", require("./router/router_user"));

//Page not Found
app.use(errorController.getPage);

const PORT = 3000;
app.listen(PORT, console.log("Server has started at port " + PORT));