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

async function getBalance() {
    return findAllInTable("account");
}

async function showBalance() {
    let sql;
    let res;
    let str;
    sql = `SELECT * FROM account;`;
    res = await db.query(sql);
    
    str  = "+ ---- + -------- + ------- + \n";
    str += "|  ID  |   Name   | Balance | \n" ;
    str += "| ---- | -------- | ------- | \n";
    for (const row of res) {
        str += "|";
        str += row.id.toString().padStart(6);
        str += "|";
        str += row.name.padEnd(10);
        str += "|";
        str += row.balance.toFixed(1).toString().padStart(9);
        str += "| \n";
    }
    str += "+ ---- + -------- + ------- + \n";
    console.info(str);
    console.info(`SQL: ${sql} got ${res.length} rows.`);
}

async function findAllInTable(table) {
    let sql = `SELECT * FROM ??;`;
    let res;

    res = await db.query(sql, [table]);
    console.info(`SQL: ${sql} ( ${table} ) got ${res.length} rows. \n`);

    return res;
}

async function move(amount = 1.5, from = "2222", to = "1111") {
    return moveMoney(amount, from, to);
}

async function moveMoney(amount, from, to) {
    let sql = `
                START TRANSACTION;

                UPDATE account 
                SET 
                    balance = balance + ${amount} 
                WHERE 
                    id = ${to};
                
                UPDATE account 
                SET 
                    balance = balance - ${amount} 
                WHERE 
                    id = ${from};
                
                COMMIT;
                
                SELECT * FROM account;
            `;
    let res;

    res = await db.query(sql, [amount, from, to]);
    console.info(`Transaction SQL: ${sql}`);
    
    //let from_name = await getName(from);
    let to_name = await getName(to);
    console.info("(Moved " + amount.toString() + " money from " + from.toString() + " to " + to.toString() + ") \n");
    console.info(to_name + " got " + amount + " pengar, he/she is currently checking out his/her account balance. \n");
    return res;
}

async function getName(id) {
    let sql = `
                SELECT
                    name 
                FROM 
                    account 
                WHERE 
                    id = ${id};
            `;
    let res;

    res = await db.query(sql, [id]);
    return res[0].name;
}

module.exports = {
    getBalance: getBalance,
    showBalance: showBalance,
    move: move
};