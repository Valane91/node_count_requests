/*
 * 
 * Handle the port listenner by the 'express' variable. 
 * 
 * Script used by 'router.js'
 * 
 */ 


const countJSONUpdater = require('../JSON_handler'); // to update port_count_info.js everytime there's a request

/*
 *  Listen to all the requests from the client side, 
 *  on the choosen port by the user, and update the count_info.json. 
 */
function listenRequests(app, port, count) {
     
    app.use((req, res, next) => { 
        count += 1; 
        countJSONUpdater.run(port, count);
        next();  
    }); 
}

/*
 * 
 * Entry point to instanciate the post requests in the initialized express 
 * input as 'app'. 
 * 
 * @param app, the express variable 
 * @param port, the current port
 * @param count, the current requests count
 * 
 */ 
function run(app, port, count) {

    listenRequests(app, port, count); 
}

/*
 * Exports only 'run' to be used by './app.js'.
 */
module.exports = {
    run: run
}