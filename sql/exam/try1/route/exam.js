/**
 * Route for exam.
 */ 
"use strict";

const express = require("express");
const router = express.Router();
const exam = require("../src/exam.js");

const bodyParser = require ( "body-parser" );
const urlencodedParser = bodyParser.urlencoded ({ extended: false });

const sitename = "My Exam";

router.get("/index", (req, res) => {
    let data = {
        title: `Welcome | ${sitename}`,
        page: 'home'
    };

    res.render("exam/index", data);
});

router.get("/show", async (req, res) => {
    let data = {
        title: `Report | ${sitename}`,
        page: 'report'
    };

    data.res = await exam.showReport('');
    res.render("exam/report", data);
});

router.get("/search", async (req, res) => {
    let data = {
        title: `Search | ${sitename}`,
        page: 'search',
        search: ''
    };

    data.res = await exam.showReport();
    res.render("exam/search", data);
});

router.post("/search", urlencodedParser, async (req, res) => {
    let data = {
        title: `Search | ${sitename}`,
        page: 'search',
        search: req.body.search
    };

    data.res = await exam.showReport(req.body.search);
    res.render("exam/search", data);
});

router.get("/about-us", async (req, res) => {
    let data = {
        title: `About Us | ${sitename}`,
        page: 'about'
    };

    res.render("exam/about-us", data);
});

module.exports = router;