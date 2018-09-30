/*
 * Script which reset count informations of the choosen port.
 * The function 'run' is the entry point, wich chains all the other files parsing 
 * and updating functions.
 * 
 * Script used by './router.js'
 * 
 */


const fs = require('fs'); // so that we retrieve and reset content from count_info.json

const pathHandler = require('./path'); // gives path to count_info.json

let port = null; // indicates the choosen port by the user
let curCount; // indicates the actual number of counts. 
let resetTotal = false; // indicates if the user wants to reset the 'totalCount' of the port

/*
 * Parse and update the informations of the choosen port count
 * in the count_info.json.
 * 
 * Send those informations to rewriteJSONFile. 
 */
function readJSONFile(callback) {
    fs.readFile(pathHandler.DBCountInfoPath(), (err, contentFile) => {
        if(err) {
            callback(err); 
        } else {
            let countJSON = JSON.parse(contentFile);

            const totalCount    = (resetTotal === `on`) ? `0` : countJSON[`${port}`]['totalCount'];


            const updatedCount = {
                'lastBrowserCount' : `${curCount}`, 
                'totalCount' : totalCount
            }

            countJSON[`${port}`] = updatedCount;
            countInfoStr = JSON.stringify(countJSON);  

            callback(null, countInfoStr);
        }
    });
}

/*
 * Rewrite count_info.json with the updated informations. 
 */
function rewriteJSONFile(err, contentToWrite) {
    if(!err) {
        fs.writeFile(pathHandler.DBCountInfoPath(), contentToWrite, () => {}); 
    } 
}

/*
 * Reset the selected count informations of the choosen port. 
 * 
 * @param choosenPort port choosen by the user
 * @param resetCurrentChoice indicates if the user wants to reset the current count 
 * @param resetTotalChoice indicates if the user wants to reset the total count
 */
function run(choosenPort, count, resetTotalChoice) {
    port = choosenPort; 
    curCount = count;
    resetTotal = resetTotalChoice; 
 

    readJSONFile(
        rewriteJSONFile
    ); 
}

/*
 * Exports only 'run' to be used by './router.js'.
 */
module.exports = {
    run: run
}