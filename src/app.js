require('./db/mongoose');
const express = require("express");
const CourseRoute = require("./routes/course");
const UsersRoute = require('./routes/user');

//Init app
const app = express();
const port = process.env.PORT;

//middlewares
app.use(express.json());
app.use(CourseRoute);
app.use(UsersRoute);


module.exports = app;