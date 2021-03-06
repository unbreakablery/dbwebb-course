"use strict";

const mysql = require("promise-mysql");
const config = require("../config/db/eshop.json");

let db;

(async function() {
    db = await mysql.createConnection(config);

    process.on("exit", () => {
        db.end();
    });
}) ();


async function showCategory() {
    let sql = `CALL show_category();`;
    let res;
    
    res = await db.query(sql);
    
    console.info(`SQL: ${sql} got ${res.length} rows.`);

    return res[0];
}

async function showProduct() {
    let sql = `CALL show_product();`;
    let res;
    
    res = await db.query(sql);
    
    console.info(`SQL: ${sql} got ${res.length} rows.`);

    return res[0];
}

async function createProduct(
                                product_id, 
                                name, 
                                price,
                                image_link,
                                description) {
    let sql = `CALL create_product(?, ?, ?, ?, ?);`;
    let res;

    res = await db.query(sql, [product_id, name, price, image_link, description]);

    console.log(res);
    console.info(`SQL: ${sql} got ${res.length} rows.`);
}

async function showProductDetail(product_id) {
    let sql = `CALL show_product_detail(?);`;
    let res;

    res = await db.query(sql, [product_id]);

    console.log(res);
    console.info(`SQL: ${sql} got ${res.length} rows.`);

    return res[0];
}

async function editProduct(
                                product_id, 
                                name, 
                                price,
                                image_link,
                                description
                            ) {
    let sql = `CALL edit_product(?, ?, ?, ?, ?);`;
    let res;

    res = await db.query(sql, [product_id, name, price, image_link, description]);

    console.log(res);
    console.info(`SQL: ${sql} got ${res.length} rows.`);
}

async function deleteProduct(product_id) {
    let sql = `CALL delete_product(?);`;
    let res;

    res = await db.query(sql, [product_id]);

    console.log(res);
    console.info(`SQL: ${sql} got ${res.length} rows.`);
}

async function showLog(row_count = 10) {
    let sql;
    let res;
    let str;
    sql = `CALL show_log(?);`;
    res = await db.query(sql, [row_count]);
    
    str  = "+ ----------------- + ---------------------------------------------------------- + \n";
    str += "|     TimeStamp     |                           Event                            | \n" ;
    str += "| ----------------- | ---------------------------------------------------------- | \n";
    for (const row of res[0]) {
        str += "|";
        str += (row.timestamp.getFullYear().toString() + "-" +
                (row.timestamp.getMonth() + 1).toString() + "-" +
                row.timestamp.getDate().toString() + " " +
                row.timestamp.getHours().toString() + ":" +
                row.timestamp.getMinutes().toString() + ":" +
                row.timestamp.getSeconds().toString()
                ).padEnd(19);
        str += "|";
        str += row.event.padEnd(60);
        str += "| \n";
    }
    str += "+ ----------------- + ---------------------------------------------------------- + \n";
    console.info(str);
}

async function showShelf() {
    let sql;
    let res;
    let str;
    sql = `CALL show_shelf();`;
    res = await db.query(sql);
    
    str  = "+ ------------- + \n";
    str += "|     Shelf     | \n" ;
    str += "| ------------- | \n";
    for (const row of res[0]) {
        str += "|";
        str += row.shelf.padEnd(15);
        str += "| \n";
    }
    str += "+ ------------- + \n";
    console.info(str);
}

async function showInventory(filter_str = '') {
    let sql;
    let res;
    let str;
    sql = `CALL show_inventory(?);`;
    res = await db.query(sql, [filter_str]);
    
    str  = "+ ------------------ + -------------------- + ------------- + ---------------- + \n";
    str += "|     Product_ID     |     Product Name     |     Shelf     |     Quantity     | \n" ;
    str += "| ------------------ | -------------------- | ------------- | ---------------- | \n";
    for (const row of res[0]) {
        str += "|";
        str += row.product_id.padEnd(20);
        str += "|";
        str += row.name.padEnd(22);
        str += "|";
        str += row.shelf.padEnd(15);
        str += "|";
        str += row.quantity.toString().padStart(18);
        str += "| \n";
    }
    str += "+ ------------------ + -------------------- + ------------- + ---------------- + \n";
    console.info(str);
}

async function addInventory(product_id, shelf, quantity) {
    let sql;
    let res;
    sql = `CALL add_inventory(?, ?, ?);`;
    res = await db.query(sql, [product_id, shelf, quantity]);
    
    console.info('Added into inventory!');
}

async function delInventory(product_id, shelf, quantity) {
    let sql;
    let res;
    sql = `CALL del_inventory(?, ?, ?);`;
    res = await db.query(sql, [product_id, shelf, quantity]);
    
    console.info('Deleted from inventory!');
}

module.exports = {
    showCategory        : showCategory,
    showProduct         : showProduct,
    createProduct       : createProduct,
    showProductDetail   : showProductDetail,
    editProduct         : editProduct,
    deleteProduct       : deleteProduct,
    showLog             : showLog,
    showShelf           : showShelf,
    showInventory       : showInventory,
    addInventory        : addInventory,
    delInventory        : delInventory
};