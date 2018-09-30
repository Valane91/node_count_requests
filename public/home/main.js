

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

loadCountInfo(); 