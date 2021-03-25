/**
 * Node.js terminal program against MySQL with command loop.
 */
"use strict";

// Read from commandline 
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Load modules for database
const exam = require("./src/exam.js");

/**
 * Main function.
 *
 * @async 
 * @returns void 
 */ 
( async function() {
    rl.on("close", exitProgram);
    rl.on("line", handleInput);

    rl.setPrompt("input your command: ");
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
                + "exit, quit, ctrl-d     - to exit the program. \n"
                + "help, menu             - to show this menu. \n"
                + "show                   - to show a report of all members. \n"
                + "search <substring>     - to show a report filtered by substring. \n"
                + "report                 - to show a fixed report of all members. \n"
            );
            break;
        case "show":
            await exam.cliShowReport('');
            break;
        case "search":
            if (commands[1] != undefined && commands[1] != "") {
                await exam.cliShowReport(commands[1]);
            } else {
                console.info("'search' command has one parameter - substring \n");
            }
            break;
        case "report":
            await exam.cliShowFixedReport();
            break;
        default:
            console.info("Unknown command! \n");
            break;
    }

    rl.prompt();
}