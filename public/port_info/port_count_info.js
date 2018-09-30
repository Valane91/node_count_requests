function loadJSONPortCountInfo() {

    let countInfoURI = '/count_info'; 

    const getPortId = () => {
        const uri = window.location.pathname;
        const portId = uri.split('/')[uri.length - 1]; 

        if(isNaN(portId)) {
            countInfoURI += ('/' + portId); 
        }
    }

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