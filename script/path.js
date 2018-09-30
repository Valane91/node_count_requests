/*
 * Handle script and directory path informations. 
 * 
 * Used by './router.js', './reset_count_handler.js' and './JSON_handler.js'
 * 
 */


 /*
  * returns path to count_info.json
  */
function DBCountInfoPath() {
    return __dirname + `\\..\\database\\count_info.json`; 
}

/*
 * returns path to the home public directory
 */ 
function publicHomeRootPath() {
    return __dirname + `\\..\\public\\home`;
}

/*
 * returns path to the port public directory
 */ 
function publicPortRootPath() {
    return __dirname + `\\..\\public\\port_info`; 
}

/*
 * returns path to the reset response html page
 */
function resetResponseHTML() {
    return __dirname + `\\response_pages\\reset_response.html`; 
}


/*
 * Exports both paths.
 */
module.exports = {
    DBCountInfoPath: DBCountInfoPath,
    publicHomeRootPath: publicHomeRootPath, 
    publicPortRootPath: publicPortRootPath, 
    resetResponseHTML: resetResponseHTML
}