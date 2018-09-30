/*
 * Initialize the express variable. 
 * 
 * Script used by 'router.js'
 * 
 */


const chalk = require('chalk'); // to colorize the initialization message of
let express = require('express'); 

/*
 * 
 * Initialize express.
 * 
 * @param app, the express variable which will be initialized
 * 
 */ 
function initExpress(app) {

    app.use(express.urlencoded({
        extended: true,
        })
    ); 
    
    app.use(express.json());
}


/*
 * Init the port with the choosen port by the user (stored in the variable 'port'),
 * and console log a message, to inform that the initialization has begun.
 * 
 * @param app, the express variable which will be initialized
 * @param port, the current port
 *  
 */
function initPort(app, port) {

    app.listen(port, () => {
        console.log(chalk.blue(`Listenning on port ${port}...`)); 
    }); 
}


/*
 * Exports only 'run' to be used by './app.js'.
 */
module.exports = {
    initExpress: initExpress, 
    initPort: initPort
}