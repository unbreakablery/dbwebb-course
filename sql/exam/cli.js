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
            );
            break;
        
        case "show":
            await exam.cli_show_report();
            break;
        
        default:
            console.info("Unknown command! \n");
            break;
    }

    rl.prompt();
}