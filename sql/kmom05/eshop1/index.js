"use strict" ;

const port = process.env.DBWEBB_PORT || 1337;
const express = require ( "express" );
const app = express();
const routeEshop = require( "./route/eshop.js" );
const path = require ( "path" );

app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");

app.use("/eshop", routeEshop);
app.use((req, res, next) => {
    console.info(`Got request on ${req.path} ( ${req.method} ) .`);
    next();
});

app.listen(port, () => {
    console.info(`Server is listening on port ${port} .`);
});