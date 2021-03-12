/**
 * Node.js terminal program against MySQL with command loop.
 */
"use strict" ;

// Read from commandline 
const readline = require("readline");
const rl = readline.createInterface({
     input : process.stdin,
     output : process.stdout
});

// Load modules for database
const eshop = require("./src/eshop.js");

/**
 * Main function.
 *
 * @async 
 * @returns void 
 */ 
( async function() {
    rl.on("close", exitProgram);
    rl.on("line", handleInput);

    rl.setPrompt("eshop: ");
    rl.prompt();
   
}) ();

function exitProgram(code) {
    code = code || 0;
    console.info("Exiting with status code " + code);
    process.exit(code);
}

async function handleInput(line) {
    let commands = [];
    
    line.trim().split(" ").forEach(function(item) {
        if (item != "") {
            commands.push(item);
        }
    });
    
    switch (commands[0]) {
        case "quit":
        case "exit":
            exitProgram();
            break;
        case "help":
        case "menu":
            console.info(
                "You can choose from the following commands. \n"
                + "exit, quit, ctrl-d                       - to exit the program. \n"
                + "help, menu                               - to show this menu. \n"
                + "log <number>                             - to show the last <number> rows in the log table. \n"
                + "shelf                                    - to show which storage shelves are in the inventory. \n"
                + "inventory                                - to shows products in inventory with product ID, name, shelf and quantity. \n"
                + "inventory <str>                          - to shows filtered products in inventory by str. \n"
                + "invadd <product_id> <shelf> <quantity>   - to add into inventory. \n"
                + "invdel <product_id> <shelf> <quantity>   - to delete from inventory. \n"
                + "order <search>                           - to show orders filtered by order ID and customer ID. \n"
                + "picklist <order_id>                      - to picklist order and order lines. \n"
                + "ship <order_id>                          - to ship order. \n"
            );
            break;
        case "log":
            if (commands[1] != undefined && commands[1] != "") {
                if (Number.isInteger(parseInt(commands[1])) == true) {
                    await eshop.showLog(commands[1]);
                } else {
                    console.info("'log' command can have 1 parameter. (number) \n");
                }
            } else {
                await eshop.showLog();
            }
            break;
        case "shelf":
            await eshop.showShelf();
            break;
        case "inventory":
            await eshop.showInventory(commands[1]);
            break;

        case "invadd":
            await eshop.addInventory(commands[1], commands[2], commands[3]);
            await eshop.showInventory();
            break;
        case "invdel":
            await eshop.delInventory(commands[1], commands[2], commands[3]);
            await eshop.showInventory();
            break;
        case "order":
            await eshop.cliShowOrder(commands[1]);
            break;
        case "picklist":
            if (commands[1] != undefined && commands[1] != "") {
                await eshop.cliPickList(commands[1]);
                break;
            } else {
                console.info("'picklist' command can have 1 parameter. (order_id) \n");
                break;
            }
        case "ship":
            if (commands[1] != undefined && commands[1] != "") {
                await eshop.cliShipOrder(commands[1]);
                break;
            } else {
                console.info("'ship' command can have 1 parameter. (order_id) \n");
                break;
            }
        default:
            console.info("Unknown command! \n");
            break;
    }

    rl.prompt();
}