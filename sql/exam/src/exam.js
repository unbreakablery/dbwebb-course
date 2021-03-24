"use strict";

const mysql = require("promise-mysql");
const config = require("../config/db/exam.json");
const center = require('center-align');

let db;

(async function() {
    db = await mysql.createConnection(config);

    process.on("exit", () => {
        db.end();
    });
}) ();

async function show_report(search = '') {
    let sql = `CALL show_report(?);`;
    let res;
    
    res = await db.query(sql, [search]);
    
    console.info(`SQL: ${sql} got ${res.length} rows.`);

    return res[0];
}

//functions for cli
async function cli_show_report() {
    let sql;
    let res;
    let str;
    
    sql = `CALL show_report();`;
    res = await db.query(sql, []);
    
    str  = "+ ------------------- + -------------------- + ------------------- + ---------------- + --------------------------- + ------------- + ---------- + \n";
    str += "|     Member Name     |     Member Alias     |     Member City     |     Dog Name     |          Dog Breed          | Breed Approve | Registered | \n";
    str += "| ------------------- | -------------------- | ------------------- | ---------------- | --------------------------- | ------------- | ---------- | \n";
    for (const row of res[0]) {
        str += "|";
        str += row.member_name.padEnd(21);
        str += "|";
        str += row.member_alias.padEnd(22);
        str += "|";
        str += row.member_city.padEnd(21);
        str += "|";
        str += (row.dog_name == null ? '' : row.dog_name).padEnd(18);
        str += "|";
        str += (row.dog_breed == null ? '' : row.dog_breed).padEnd(29);
        str += "|";
        str += (row.breed_approve == null ? '' : row.breed_approve).padEnd(15);
        str += "|";
        str += center((row.registered == null ? '' : row.registered.toString()), 12);
        str += "| \n";
    }
    str += "+ ------------------- + -------------------- + ------------------- + ---------------- + --------------------------- + ------------- + ---------- + \n";
    console.info(str);
}

module.exports = {
    show_report:        show_report,
    cli_show_report:    cli_show_report
};