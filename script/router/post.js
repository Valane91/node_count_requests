/*
 * Instanciate all the post requests in the express variable. 
 * 
 * Script used by './router.js'. 
 * 
 */ 

const countJSONReset = require('../reset_count_handler'); // reset count whenever the client wants to reset it
const pathHandler = require('../path'); // gives path to the public directory and to count_info.json


/*
 *
 * Reset the count information of the choosen port in count_info.json 
 * when the client call a post http request on '/reset_count'.   
 * 
 */
function postRequestResetCount(app, port, count) {

    app.post('/reset_count', (req, res) => {
        const body = req.body;

        resetCurrentCount = body["current_count"]; 
        resetTotalCount = body["total_count"]; 

        count = (resetCurrentCount === `on`) ? 0 : count; 
         
        countJSONReset.run(port, count, resetTotalCount); 

        res.status(200).sendFile(pathHandler.resetResponseHTML()); 
    });
}


/*
 * 
 * Entry point to instanciate the post requests in the initialized express 
 * input as 'app'. 
 * 
 */ 
function run(app, port, count) {

    postRequestResetCount(app, port, count); 
}

/*
 * Exports only 'run' to be used by './app.js'.
 */
module.exports = {
    run: run
}