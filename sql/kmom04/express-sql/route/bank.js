/**
 * Route for bank.
 */ 
"use strict" ;

const express = require("express");
const router = express.Router();
const bank = require("../src/bank.js");

router.get("/index", (req, res) => {
    let data = {
        title: "Welcome | The Bank"
    };

    res.render("bank/index", data);
});

router.get("/balance", async (req, res) => {
    let data = {
        title: "Account balance | The Bank"
    };

    data.res = await bank.getBalance();

    res.render("bank/balance", data);
});

router.get("/move-to-adam", async (req, res) => {
    let data = {
        title: "Moving 1.5 peng to Adam | The Bank"
    };

    data.res = await bank.move();

    res.render("bank/move-to-adam", data);
});

module.exports = router;