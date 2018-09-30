/*
 * Handle the command user input for the initialization of the server, 
 * once './app.js' is called from the command line. 
 * 
 * The parameter should be -p [port_number] with 'port_number' the number 
 * of the port.  
 * 
 * The script exit the process with an error message with any other parameter. 
 * 
 * Script used by './app.js'. 
 * 
 */ 

const chalk = require('chalk'); // to colorize console log error message

/*
 * Entry point to handle the command input by the user.
 * Exit process with an error message if the parameters input are invalid, 
 * or parse the port and send the port to the callback if user's command input 
 * are valid. 
 * 
 * @param callback, callback function which use the port as input 
 * 
 */ 
function run(callback) {
    const args = process.argv; 
    let port = 0; 

    if(args[2] === "-p") {
        port = parseInt(args[3]); 

        if(isNaN(port)) {
            console.log(chalk.red(
                `The argument you've added after "-p" isn't an integer.\n 
                 Please enter a port number.`
            )); 
            process.exit(1); 
        } 

        callback(port);  
    } else {
        console.log(chalk.red(`We don't know this parameter`)); 
        process.exit(1); 
    }
}

/*
 * Exports run so that it can be used by 'app.js'
 */
module.exports = {
    run: run
}