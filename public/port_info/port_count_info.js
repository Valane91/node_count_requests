
/*
 * 
 * Retrieve the port number from the uri 
 * of the current page, and add it to countInfoURI. 
 * Doesn't modify countInfoURI if there isn't a port id in the URI. 
 * 
 * @param countInfoURI, the uri to parsse
 *  
 */
const getPortId = (countInfoURI) => {
    const uri = window.location.pathname;
    const portId = uri.split('/')[uri.length - 1]; 

    if(isNaN(portId)) {
        countInfoURI += ('/' + portId); 
    }
}



/*
 * 
 * Load the count informations in the home page.
 * Fetch data from '/count_info' which is a json sent by the server 
 * with the count informations of the current port. 
 *  
 */ 
function loadJSONPortCountInfo() {

    let countInfoURI = '/count_info'; 
    getPortId(countInfoURI);


    fetch(countInfoURI)
        .then(response => {
             
            if(response.status === 200) {
                return response.json();
            } else {
                throw new Error(`request error : ${response.status}`); 
            }
        })
        .then(data => {
                       
            document.querySelector("#json_count").innerHTML = JSON.stringify(data); 

        });
}

loadJSONPortCountInfo(); 