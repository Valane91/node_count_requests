/* 
 * Instanciates all the 'get' requests in the router. 
 * 
 * Script used by './router.js'
 * 
 */

const pathHandler = require('../path'); // gives path to the public directory and to count_info.json

/*
 * 
 * Set the JSON of the request's response to the choosen port count informations,
 * 
 * 
 * @param err, eventual error returned by fs.readFile
 * @param fileContent, the content of count_info.json
 * @param port, the choosen port
 * @param res, the response to the 'get' http response 
 *  
 *    
 */ 
const setResponseValue = (err, fileContent, port, res) => {
    if(err) {
        countJSON = {}; 
    } else {
        const dbJSON = JSON.parse(fileContent); 

        countJSON = {
            "currentCount": `${dbJSON[`${port}`]["lastBrowserCount"]}`, 
            "totalCount": `${dbJSON[`${port}`]["totalCount"]}`
        }

        res.json(countJSON); 
    }
}

/*
 *
 * Send a json with the count information of the choosen port in count_info.json, 
 * when a get http request is sent from the client to '/count_info/'.
 * 
 * @param app, the express variable 
 * @param port, the current port
 * 
 */
function getRequestCountInfo(app, port) {

    app.get('/count_info', (req, res) => {

        const afterRead = (err, fileContent) => {
            setResponseValue(err, fileContent, port, res); 
        }
    
        fs.readFile(pathHandler.DBCountInfoPath(), afterRead); 
    });
}

/*
 *
 * Send a json with the count information of the port with the port :id in count_info.json, 
 * when a get http request is sent from the client to '/count_info/:id'.
 * 
 * @param app, the express variable 
 * @param port, the choosen port
 * 
 */
function getReqCountInfoPerPort(app, port) {
    app.get('/count_info/:id', (req, res) => {
         
        afterRead = (err, fileContent) => {
            const portId = req.params.id;
            setResponseValue(err, fileContent, portId, res); 
        }

        fs.readFile(pathHandler.DBCountInfoPath(), afterRead);
    });
}

/*
 * 
 * Entry point to instanciate the get requests in the initialized express 
 * input as 'app'. 
 * 
 * @param app, the express variable 
 * @param port, the choosen port
 * 
 */ 
function run(app, port) {
   
    getRequestCountInfo(app, port);  
    getReqCountInfoPerPort(app, port)
}

/*
 * Exports only 'run' to be used by './app.js'.
 */
module.exports = {
    run: run
}