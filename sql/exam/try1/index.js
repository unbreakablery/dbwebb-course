"use strict";

const port = process.env.DBWEBB_PORT || 1337;
const express = require ( "express" );
const app = express();
const routeExam = require( "./route/exam.js" );
const path = require ( "path" );

app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");

app.use("/exam", routeExam);
app.use((req, res, next) => {
    console.info(`Got request on ${req.path} ( ${req.method} ) .`);
    next();
});

app.listen(port, () => {
    console.info(`Server is listening on port ${port} .`);
});