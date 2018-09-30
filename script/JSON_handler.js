/*
 * Script to update the choosen port count's informations, 
 * everytime a request is sent from the client side.
 * 
 * Script used by './router.js'
 *  
 */ 

fs = require('fs'); // To parse and write 'count_info.json'
const pathHandler = require('./path'); // gives path to count_info.json 

let port; // choosen port by the user
let curCount; // current count requests


/*
 * Retrieve and update informations of the choosen port 
 * in the count_info.json file.
 * 
 * Send those informations to writeJSONFile.
 * 
 * @param callback, callback function which will treats the parse content of the file 
 */
function parseJSONFile(callback) {

    fs.readFile(pathHandler.DBCountInfoPath(), (err, fileContent) => {

        if(err) {
            callback(err); 
        } else {
            let countInfo = JSON.parse(fileContent); 

            const prevPortCountInfo = countInfo[`${port}`]; 
            let curPortCountInfo; 
 
            
            if(prevPortCountInfo === undefined) {
                curPortCountInfo = {
                    "lastBrowserCount": `${curCount}`, 
                    "totalCount": `${curCount}`
                }
            } else {
                curPortCountInfo = {
                    "lastBrowserCount": `${curCount}`, 
                    "totalCount": `${parseInt(prevPortCountInfo["totalCount"]) + 1}`
                }
            }

                       
            countInfo[`${port}`] = curPortCountInfo; 
            const updatedFileContent = JSON.stringify(countInfo); 
            callback(null, updatedFileContent);    
        }
    }); 
}


/*
 * Rewrite the count_info.json with the updated informations.
 */
function writeJSONFile(err, fileContent) {
    if(!err) {
        fs.writeFile(pathHandler.DBCountInfoPath(), fileContent, () => {});
    } 
}


/*
 *  Entry point to update the choosen port count informations. 
 * 
 * @param choosenPort, the choosen port by the user to run the server
 * @param count, the current requests count of the choosen port, since its initialization
 */
function run(choosenPort, count) {
    port = choosenPort; 
    curCount = count; 
 
    parseJSONFile(writeJSONFile); 
}

/*
 * Exports only 'run' to be used by './router.js'.
 */
module.exports = {
    run:  run
}






