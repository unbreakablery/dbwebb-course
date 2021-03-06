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
const bank = require("./src/bank.js");

/**
 * Main function.
 *
 * @async 
 * @returns void 
 */ 
( async function() {
    rl.on("close", exitProgram);
    rl.on("line", handleInput);

    rl.setPrompt("Bank: ");
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
                + "exit, quit, ctrl-d              - to exit the program. \n"
                + "help, menu                      - to show this menu. \n"
                + "balance                         - to show all balances. \n"
                + "move                            - move 1.5 peng from Adam to Eva. \n"
                + "move <amount> <from_id> <to_id> - move <amount> peng from <from_id> to <to_id>. \n"
            );
            break;
        case "balance":
            await bank.showBalance();
            break;
        case "move":
            if (commands[1] != undefined && commands[2] != undefined && commands[3] != undefined &&
                commands[1] != "" && commands[2] != "" && commands[3] != "") {
                if (isNaN(commands[1]) == false && 
                    Number.isInteger(parseInt(commands[2])) == true && 
                    Number.isInteger(parseInt(commands[3])) == true) {
                    await bank.move(commands[1], commands[2], commands[3]);
                    break;
                } else {
                    console.info("'move' command can have 3 parameter. ([amount [from_id [to_id]]) \n");
                    break;
                }
            } else if (commands[1] != undefined && commands[1] != "") {
                if (isNaN(commands[1]) == false) {
                    await bank.move(commands[1], "1111", "2222");
                    break;
                } else {
                    console.info("'move' command can have 3 parameter. ([amount [from_id [to_id]]) \n");
                    break;
                }
            } else {
                await bank.move(1.5, "1111", "2222");
                break;
            }
        default:
            console.info("Unknown command! \n");
            break;
    }

    rl.prompt();
}