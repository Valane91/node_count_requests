/* 
 * Instanciates all the 'get' requests in the router. 
 * 
 * Script used by './router.js'
 * 
 */

const pathHandler = require('../path'); // gives path to the public directory and to count_info.json


/*
 *
 * Send a json with the count information of the choosen port in count_info.json, 
 * when a get http request is sent from the client to '/count_info/'.
 * 
 */
function getRequestCountInfo(app, port) {

    app.get('/count_info', (req, res) => {
    
        const setResponseValue = (err, fileContent) => {
            
            let countJSON; 
    
            if(err) {
                countJSON = {};  
            } else {
                const dbJSON = JSON.parse(fileContent); 

                countJSON = {
                    "currentCount": `${dbJSON[`${port}`]["lastBrowserCount"]}`, 
                    "totalCount": `${dbJSON[`${port}`]["totalCount"]}`
                };                
            }
    
            res.json(countJSON);  
        }
    
        fs.readFile(pathHandler.DBCountInfoPath(), setResponseValue); 
    });
}

/*
 *
 * Send a json with the count information of the port with the port :id in count_info.json, 
 * when a get http request is sent from the client to '/count_info/:id'.
 * 
 */

function getReqCountInfoPerPort(app, port) {
    app.get('/count_info/:id', (req, res) => {
        const portId = req.params.id; 

        const setResponseValue = (err, fileContent) => {
            
            let countJSON; 
    
            if(err) {
                countJSON = {};  
            } else {
                const dbJSON = JSON.parse(fileContent); 
    
                countJSON = {
                    "currentCount": `${dbJSON[`${portId}`]["lastBrowserCount"]}`, 
                    "totalCount": `${dbJSON[`${portId}`]["totalCount"]}`
                };                
            }
    
            res.json(countJSON);  
        }

        fs.readFile(pathHandler.DBCountInfoPath(), setResponseValue);
    });
}

/*
 * 
 * Entry point to instanciate the get requests in the initialized express 
 * input as 'app'. 
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