"use strict";

// Load config
const config = require("./config.json");

// Load mysql
const mysql = require("promise-mysql");

class Salary {
    constructor() {
        this.db = null;
    }
    
    async viewSalRevision() {
        let res;
        let sql;
        let str;
        sql = `
                SELECT
                    akronym, fornamn, efternamn, pre, nu, diff, proc, mini 
                FROM v_lonerevision
                ORDER  BY nukomp DESC , diffkomp DESC
            `;
        this.db = await mysql.createConnection(config);
        res = await this.db.query(sql);
    
        str  = "+ -------- + ------------------ + ----- + ----- + ---- + ---- + ---- + \n";
        str += "| Akronym  |       Namn         |  pre  |   nu  | diff | proc | mini | \n" ;
        str += "| -------- | ------------------ | ----- | ----- | ---- | ---- | ---- | \n";
        for (const row of res) {
            str += "|";
            str += row.akronym.padEnd(10);
            str += "|";
            str += (row.fornamn + " " + row.efternamn).padEnd(20);
            str += "|";
            str += row.pre.toString().padStart(7);
            str += "|";
            str += row.nu.toString().padStart(7);
            str += "|";
            str += row.diff.toString().padStart(6);
            str += "|";
            str += row.proc.toString().padStart(6);
            str += "|";
            str += row.mini.toString().padStart(6);
            str += "| \n";
        }
        str += "+ -------- + ------------------ + ----- + ----- + ---- + ---- + ---- + \n";
        console.info(str);
        this.db.end();
    }

    async updateSalary(acronym, salary) {
        let res;
        let sql;
        sql = `
                UPDATE 
                    larare
                SET
                    lon =?
                WHERE
                    akronym =?
            `;
        this.db = await mysql.createConnection(config);
        res = await this.db.query(sql, [salary, acronym]);
        console.info(res.message);
        this.db.end();
    }
}

module.exports = Salary;