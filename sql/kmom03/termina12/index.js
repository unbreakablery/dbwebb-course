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
const Teachers = require("./teachers.js");
const Salary = require("./lon.js");
const Competence = require("./kompetens.js");

const teachers = new Teachers();
const salary = new Salary();
const competence = new Competence();

/**
 * Main function.
 *
 * @async 
 * @returns void 
 */ 
( async function() {
    rl.on("close", exitProgram);
    rl.on("line", handleInput);

    rl.setPrompt("Your command -->");
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
                + "exit, quit, ctrl-d - to exit the program. \n"
                + "help, menu - to show this menu. \n"
                + "larare - to displays all information about teachers, including their age. \n"
                + "kompetens - to shows a report on how the competence has changed in the latest salary revision. \n"
                + "lon - to shows a report of how the salary has changed in the most recent salary revision. \n"
                + "sok <sokstrang> - to search among all the information in the teacher and shows the teachers that match the search string. \n"
                + "nylon <akronym> <lon> - to take the arguments for the teacher's acronym and the new salary and updates the teacher's salary. \n"
            );
            break;
        case "larare":
            await teachers.viewTeachers();
            break;
        case "kompetens":
            await competence.viewCompRevision();
            break;
        case "lon":
            await salary.viewSalRevision();
            break;
        case "sok":
            if (commands[1] != undefined && commands[1] != "") {
                await teachers.searchTeachers(commands[1]);
                break;
            }
            console.info("'sok' command has 1 parameter. (like string for searching teachers) \n");
            break;
        case "nylon":
            if (commands[1] != undefined && commands[2] != undefined && commands[1] != "" && commands[2] != "") {
                await salary.updateSalary(commands[1], commands[2]);
                break;
            }
            console.info("'nylon' command has 2 parameters. (akronym and value for updating teacher's salary) \n");
            break;
        default:
            console.info("Unknown command! \n");
            break;
    }

    rl.prompt();
}