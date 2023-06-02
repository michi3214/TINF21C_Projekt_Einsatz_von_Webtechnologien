/**
 * This page includes the express logic. 
 */

const dotenv = require("dotenv");
const express   = require("express");
const app 	    = express();
const path = require("path");
const cookieParser = require("cookie-parser");

const errorController = require(path.join(__dirname, "controllers", "controller_error.js"));
const Errors = require("../Errors/error");


// Add WYSIWYG editor
app.use("/tinymce", express.static(path.join(__dirname, "..", "node_modules", "tinymce")));

// Module to work with cookies
app.use(cookieParser());

// Load global config from .env file
dotenv.config();


// configure the views
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.urlencoded({extended: false}));

//Routes
app.use("/", require(path.join(__dirname, "router", "router_pages")));
app.use("/user", require(path.join(__dirname, "router", "router_user")));
app.use("/content",  require(path.join(__dirname, "router", "router_content")));


//Page not Found
// TODO: Can be changed to /:page/error...
app.use("/error404", errorController.getError404);
app.use("/error403", errorController.getError403);
app.use("/error500", errorController.getError500);
app.use("/test", ()=>{throw new Errors.UnauthorizedAccess();}); // TODO: delete later
app.use(errorController.getError404);
app.use(errorController.getError);




const PORT = parseInt(process.env.SERVER_PORT) || 3000;
app.listen(PORT, console.log("Server has started at port " + PORT));