"use strict";

const mysql = require("promise-mysql");
const config = require("../config/db/bank.json");

let db;

(async function() {
    db = await mysql.createConnection(config);

    process.on("exit", () => {
        db.end();
    });
}) ();


async function showBalance() {
    let sql = `CALL show_balance();`;
    let res;
    
    res = await db.query(sql);
    
    console.info(`SQL: ${sql} got ${res.length} rows.`);

    return res[0];
}

async function createAccount(id, name, balance) {
    let sql = `CALL create_account(?, ?, ?);`;
    let res;

    res = await db.query(sql, [id, name, balance]);

    console.log(res);
    console.info(`SQL: ${sql} got ${res.length} rows.`);
}

async function showAccount(id) {
    let sql = `CALL show_account(?);`;
    let res;

    res = await db.query(sql, [id]);

    console.log(res);
    console.info(`SQL: ${sql} got ${res.length} rows.`);

    return res[0];
}

async function editAccount(id, name, balance) {
    let sql = `CALL edit_account(?, ?, ?);`;
    let res;

    res = await db.query(sql, [id, name, balance]);

    console.log(res);
    console.info(`SQL: ${sql} got ${res.length} rows.`);
}

async function deleteAccount(id) {
    let sql = `CALL delete_account(?);`;
    let res;

    res = await db.query(sql, [id]);

    console.log(res);
    console.info(`SQL: ${sql} got ${res.length} rows.`);
}

module.exports = {
    showBalance: showBalance,
    createAccount: createAccount,
    showAccount: showAccount,
    editAccount: editAccount,
    deleteAccount: deleteAccount
};