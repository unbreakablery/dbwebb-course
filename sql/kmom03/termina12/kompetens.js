"use strict";

// Load config
const config = require("./config.json");

// Load mysql
const mysql = require("promise-mysql");

class Competence {
    constructor() {
        this.db = null;
    }
    
    async viewCompRevision() {
        let res;
        let sql;
        let str;
        sql = `
                SELECT
                    akronym, fornamn, efternamn, prekomp, nukomp, diffkomp
                FROM v_lonerevision
                ORDER  BY nukomp DESC , diffkomp DESC
            `;
        this.db = await mysql.createConnection(config);
        res = await this.db.query(sql);
    
        str  = "+ -------- + ------------------ + ------- + ------ + -------- + \n";
        str += "| Akronym  |       Namn         | prekomp | nukomp | diffkomp | \n" ;
        str += "| -------- | ------------------ | ------- | ------ | -------- | \n";
        for (const row of res) {
            str += "|";
            str += row.akronym.padEnd(10);
            str += "|";
            str += (row.fornamn + " " + row.efternamn).padEnd(20);
            str += "|";
            str += row.prekomp.toString().padStart(9);
            str += "|";
            str += row.nukomp.toString().padStart(8);
            str += "|";
            str += row.diffkomp.toString().padStart(10);
            str += "| \n";
        }
        str += "+ -------- + ------------------ + ------- + ------ + -------- + \n";
        console.info(str);
        this.db.end();
    }
}

module.exports = Competence;