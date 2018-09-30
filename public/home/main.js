
/*
 * 
 * Load the count informations in the home page.
 * Fetch data from '/count_info' which is a json sent by the server 
 * with the count informations of the current port. 
 *  
 */ 
function loadCountInfo() {

    fetch('count_info')
        .then(response => {
             

            if(response.status === 200) {
                return response.json();
            } else {
                throw new Error(`request error : ${response.status}`); 
            }
        })
        .then(data => {
             
            
            document.querySelector("#current-count").innerHTML = data["currentCount"]; 
            document.querySelector("#total-count").innerHTML = data["totalCount"]; 

        });
}

/*
 * 
 * Load the ports list in the home page's element #ports-list. 
 * Fetch data from '/ports_list' which is a json sent by the server 
 * with the list of all the ports that has been open. 
 * 
 */ 
function loadPortsList() {

    fetch('ports_list')
        .then(response => {

            if(response.status === 200) {
                return response.json(); 
            } else {
                throw new Error(`request error: ${response.data}`); 
            }
        })
        .then(data => {
            for(const port in data) {
                let portElt = document.createElement("li"); 
                portElt.innerHTML = `<a href="count_requests/${port}" >${port}</a>`; 

                document.querySelector("#ports-list").appendChild(portElt); 
            }
        })
}

// Call out loadCountInfo so that it initialize #current-count and #total-count. 
loadCountInfo(); 
// Call out loadPortsList so that it initialize #ports-list.
loadPortsList(); 