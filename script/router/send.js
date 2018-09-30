/*
 * Send the pages to the client. 
 * 
 * Script used by './router.js'
 * 
 */ 


const pathHandler = require('../path'); // gives path to the public directory and to count_info.json
const express = require('express'); // use of express to send entire directory.


/*
 *  Send the home public directory to the client side at '/'.
 *  
 * @param app, the express variable 
 * 
 */
function sendHomePublicDirToClient(app) {

    app.use('/', express.static(pathHandler.publicHomeRootPath()));
}

/*
 *  Send the count public directory to the client side at '/count_requests/'. 
 *
 * @param app, the express variable
 * 
 */
function sendCountPublicDirToClient(app) {
    app.use('/count_requests/', express.static(pathHandler.publicPortRootPath()));  
    app.use('/count_requests/:id', express.static(pathHandler.publicPortRootPath()));
}

/*
 *
 * Entry point to send all the public pages to the client side. 
 * 
 * @param app, the express variable 
 * 
 */ 
function run(app) {
    sendHomePublicDirToClient(app); 
    sendCountPublicDirToClient(app);
}

/*
 * Exports only 'run' to be used by './router.js'.
 */
module.exports = {
    run: run
}