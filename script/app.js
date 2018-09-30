/*
 * Entry point to set and intialize the server. 
 * 
 * Run the command input parser then instantiate the router 
 * with the choosen port. 
 * 
 */

const cmdHandler        = require('./cmd_handler'); // to process the command input
const router            = require('./router/router'); // to instanciate the router


cmdHandler.run(
    router.run
)