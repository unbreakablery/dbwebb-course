"use strict";

// Load config
const config = require("./config.json");

// Load mysql
const mysql = require("promise-mysql");

class Teachers {
    constructor() {
        this.db = null;
    }
    
    async viewTeachers() {
        let res;
        let sql;
        let str;
        sql = "SELECT * FROM v_larare";
        this.db = await mysql.createConnection(config);
        res = await this.db.query(sql);
    
        str  = "+ -------- + ------------------ + --- + -------- + ----- + ---------- + ------ + --------- + \n";
        str += "| Akronym  |       Namn         | Kön |   Fodd   | Ålder |  Avdelning |   Lön  | kompetens | \n" ;
        str += "| -------- | ------------------ | --- | -------- | ----- | ---------- | ------ | --------- | \n";
        for (const row of res) {
            str += "|";
            str += row.akronym.padEnd(10);
            str += "|";
            str += (row.fornamn + " " + row.efternamn).padEnd(20);
            str += "|";
            str += row.kon.padEnd(5);
            str += "|";
            str += (row.fodd.getFullYear() + "-" + (row.fodd.getMonth() + 1) + "-" + row.fodd.getDate()).padStart(10);
            str += "|";
            str += row.Ålder.toString().padStart(7);
            str += "|";
            str += row.avdelning.padEnd(12);
            str += "|";
            str += row.lon.toString().padStart(8);
            str += "|";
            str += row.kompetens.toString().padStart(11);
            str += "| \n";
        }
        str += "+ -------- + ------------------ + --- + -------- + ----- + ---------- + ------ + --------- + \n";
        console.info(str);
        this.db.end();
    }
    
    async searchTeachers(searchStr) {
        let res;
        let sql;
        let str;
        let like = `%${searchStr}%` ;
        sql = `
                SELECT
                        akronym,
                        fornamn,
                        efternamn,
                        kon,
                        avdelning,
                        lon,
                        fodd,
                        kompetens
                FROM larare
                WHERE
                    akronym LIKE?
                    OR fornamn LIKE?
                    OR efternamn LIKE?
                    OR kon LIKE?
                    OR avdelning LIKE?
                    OR lon =?
                    OR kompetens =?
                ORDER BY akronym;
            `;
        this.db = await mysql.createConnection(config);
        res = await this.db.query(sql, [like, like, like, like, like, searchStr, searchStr]);
    
        str  = "+ -------- + ------------------ + --- + -------- + ---------- + ------ + --------- + \n";
        str += "| Akronym  |       Namn         | Kön |   Fodd   |  Avdelning |   Lön  | kompetens | \n" ;
        str += "| -------- | ------------------ | --- | -------- | ---------- | ------ | --------- | \n";
        for (const row of res) {
            str += "|";
            str += row.akronym.padEnd(10);
            str += "|";
            str += (row.fornamn + " " + row.efternamn).padEnd(20);
            str += "|";
            str += row.kon.padEnd(5);
            str += "|";
            str += (row.fodd.getFullYear() + "-" + (row.fodd.getMonth() + 1) + "-" + row.fodd.getDate()).padStart(10);
            str += "|";
            str += row.avdelning.padEnd(12);
            str += "|";
            str += row.lon.toString().padStart(8);
            str += "|";
            str += row.kompetens.toString().padStart(11);
            str += "| \n";
        }
        str += "+ -------- + ------------------ + --- + -------- + ---------- + ------ + --------- + \n";
        console.info(str);
        this.db.end();
    }
    
}

module.exports = Teachers;