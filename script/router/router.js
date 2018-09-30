/*
 * Script to set and instantiate the express node virtual server.
 * The function 'run' is the entry point, wich chains all the other settings.
 * 
 * Script used by '../app.js'. 
 * 
 */ 

const express = require('express'); 
let app = express(); 

const init = require('./init'); 
const listenEvent = require('./listen'); 
const sendPages = require('./send');
const getReq = require('./get');  
const postReq = require('./post'); 



/*
 * Entry point to instanciate the router on the choosen port. 
 * 
 * @param choosenPort, the choosen port by the user
 */
function run(choosenPort) {

    const port = choosenPort;
    let count = 0;   

    init.initExpress(app); 

    listenEvent.run(app, port, count); 
    sendPages.run(app);
    getReq.run(app, port); 
    postReq.run(app, port, count); 
    
    init.initPort(app, port); 

}

/*
 * Exports only 'run' to be used by './app.js'.
 */
module.exports = {
    run: run
}