"use strict";

const mysql = require("promise-mysql");
const config = require("../config/db/eshop.json");
const center = require('center-align');

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

async function showCustomer() {
    let sql = `CALL show_customer();`;
    let res;
    
    res = await db.query(sql);
    
    console.info(`SQL: ${sql} got ${res.length} rows.`);

    return res[0];
}

async function showOrders() {
    let sql = `CALL show_orders();`;
    let res;
    
    res = await db.query(sql);
    
    console.info(`SQL: ${sql} got ${res.length} rows.`);

    return res[0];
}

async function createOrder(customer_id) {
    let sql = `CALL create_order(?);`;
    let res;

    res = await db.query(sql, [customer_id]);

    console.log(res);
    console.info(`SQL: ${sql} got ${res.length} rows.`);
}

async function showOrder(order_id) {
    let sql = `CALL show_order(?);`;
    let res;

    res = await db.query(sql, [order_id]);

    console.log(res);
    console.info(`SQL: ${sql} got ${res.length} rows.`);

    return res[0];
}

async function showOrderDetail(order_id) {
    let sql = `CALL show_order_detail(?);`;
    let res;

    res = await db.query(sql, [order_id]);

    console.log(res);
    console.info(`SQL: ${sql} got ${res.length} rows.`);

    return res[0];
}

async function editOrder(
                            order_id, 
                            customer_id, 
                            status
                        ) {
    let sql = `CALL edit_order(?, ?, ?);`;
    let res;

    res = await db.query(sql, [order_id, customer_id, status]);

    console.log(res);
    console.info(`SQL: ${sql} got ${res.length} rows.`);
}

async function deleteOrder(order_id) {
    let sql = `CALL delete_order(?);`;
    let res;

    res = await db.query(sql, [order_id]);

    console.log(res);
    console.info(`SQL: ${sql} got ${res.length} rows.`);
}

async function createOrderDetail(
                                    order_id,
                                    product_id,
                                    quantity
                                ) {
    let sql = `CALL create_order_detail(?, ?, ?);`;
    let res;

    res = await db.query(sql, [order_id, product_id, quantity]);

    console.log(res);
    console.info(`SQL: ${sql} got ${res.length} rows.`);
}

async function showOrderLine(
                            order_id, 
                            product_id
                        ) {
    let sql = `CALL show_order_line(?, ?);`;
    let res;

    res = await db.query(sql, [order_id, product_id]);

    console.log(res);
    console.info(`SQL: ${sql} got ${res.length} rows.`);

    return res[0];
}

async function editOrderLine(
                                order_id,
                                product_id,
                                quantity
                            ) {
    let sql = `CALL edit_order_line(?, ?, ?);`;
    let res;

    res = await db.query(sql, [order_id, product_id, quantity]);

    console.log(res);
    console.info(`SQL: ${sql} got ${res.length} rows.`);
}

async function deleteOrderLine(order_id, product_id) {
    let sql = `CALL delete_order_line(?, ?);`;
    let res;

    res = await db.query(sql, [order_id, product_id]);

    console.log(res);
    console.info(`SQL: ${sql} got ${res.length} rows.`);
}

//functions for cli
async function cliShowOrder(search = '') {
    let sql;
    let res;
    let str;
    if (search == '') {
        sql = `CALL show_orders();`;
        res = await db.query(sql, []);
    } else {
        sql = `CALL cli_show_order(?);`;
        res = await db.query(sql, [search]);
    }

    str  = "+ --- + ------------------- + ----------- + ----------------------- + ------------- + ----------------- + \n";
    str += "|  ID |      Order Date     | Customer ID |      Customer Name      |  Order Status | Total Order Lines | \n";
    str += "| --- | ------------------- | ----------- | ----------------------- | ------------- | ----------------- | \n";
    for (const row of res[0]) {
        str += "|";
        str += center(row.id.toString(), 5);
        str += "|";
        str += row.order_date.toString().padEnd(21);
        str += "|";
        str += center(row.customer_id.toString(), 13);
        str += "|";
        str += row.customer_name.padEnd(25);
        str += "|";
        str += center(row.status, 15);
        str += "|";
        str += row.total_order_lines.toString().padStart(19);
        str += "| \n";
    }
    str += "+ --- + ------------------- + ----------- + ----------------------- + ------------- + ----------------- + \n";
    console.info(str);
}

async function cliPickList(order_id) {
    let sql;
    let res;
    let str;
    sql = `CALL show_order(?);`;
    res = await db.query(sql, [order_id]);
    console.info('****************************');
    console.info('* Order Detail Information *');
    console.info('****************************');
    str  = "+ --- + ------------------- + ----------- + ----------------------- + ------------- + ----------------- + \n";
    str += "|  ID |      Order Date     | Customer ID |      Customer Name      |  Order Status | Total Order Lines | \n";
    str += "| --- | ------------------- | ----------- | ----------------------- | ------------- | ----------------- | \n";
    for (const row of res[0]) {
        str += "|";
        str += center(row.id.toString(), 5);
        str += "|";
        str += row.order_date.toString().padEnd(21);
        str += "|";
        str += center(row.customer_id.toString(), 13);
        str += "|";
        str += row.customer_name.padEnd(25);
        str += "|";
        str += center(row.status, 15);
        str += "|";
        str += row.total_order_lines.toString().padStart(19);
        str += "| \n";
    }
    str += "+ --- + ------------------- + ----------- + ----------------------- + ------------- + ----------------- + \n";
    console.info(str);

    sql = `CALL cli_picklist(?);`;
    res = await db.query(sql, [order_id]);

    console.info('Order Lines');
    str  = "+ ---------- + -------------------- + -------- + ------------- + --------------- + \n";
    str += "| Product ID |     Product Name     | Quantity |     Shelf     | Amount in stock | \n";
    str += "| ---------- | -------------------- | -------- | ------------- | --------------- | \n";
    for (const row of res[0]) {
        str += "|";
        str += row.product_id.padEnd(12);
        str += "|";
        str += row.product_name.padEnd(22);
        str += "|";
        str += row.quantity.toString().padStart(10);
        str += "|";
        str += row.shelf.padEnd(15);
        str += "|";
        str += row.amount.toString().padStart(17);
        str += "| \n";
    }
    str += "+ ---------- + -------------------- + -------- + ------------- + --------------- + \n";
    console.info(str);
}

async function cliShipOrder(order_id) {
    let sql;
    let res;
    
    console.info('Inventory before shipped \n');
    await showInventory();

    sql = `CALL ship_order(?);`;
    res = await db.query(sql, [order_id]);

    console.info('Order ID: ' + order_id + ' was shipped! \n');
    await showInventory();
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
    delInventory        : delInventory,
    showCustomer        : showCustomer,
    showOrders          : showOrders,
    createOrder         : createOrder,
    showOrder           : showOrder,
    showOrderDetail     : showOrderDetail,
    editOrder           : editOrder,
    deleteOrder         : deleteOrder,
    createOrderDetail   : createOrderDetail,
    showOrderLine       : showOrderLine,
    editOrderLine       : editOrderLine,
    deleteOrderLine     : deleteOrderLine,

    cliShowOrder        : cliShowOrder,
    cliPickList         : cliPickList,
    cliShipOrder        : cliShipOrder
};