/*
document.getElementById("submitButton").addEventListener("click", insertData);

function insertData(event) {
	var request = new XMLHttpRequest();
	var requestURL = "http://10.0.1.233:3000/insert?";
	var payload = {name:null, reps:null, weight:null, date:null, lbs:null};
	
	payload.name   = document.getElementById("nameInput").value;
	payload.reps   = document.getElementById("repsInput").value;
	payload.weight = document.getElementById("weightInput").value;
	payload.date   = document.getElementById("dateInput").value;
	payload.lbs    = document.getElementById("lbsInput").value;

	requestURL = buildURL(requestURL, payload);
	request.open('GET', requestURL, true);

	alert(requestURL);


	request.addEventListner('load', function() {
		var response = JSON.parse(request.responseText);
		alert(response);

	});

	console.log(requestURL);
	console.log(payload);
	
	alert(payload.reps);

}
*/



document.getElementById("submitButton").addEventListener("click", postRequest);

function postRequest(event) {
	var request = new XMLHttpRequest();
	var requestURL = "http://10.0.1.233:3000/";
	var payload = {name:null, reps:null, weight:null, date:null, lbs:null};
	
	payload.name   = document.getElementById("nameInput").value;
/*	payload.reps   = document.getElementById("repsInput").value;
	payload.weight = document.getElementById("weightInput").value;
	payload.date   = document.getElementById("dateInput").value;
	payload.lbs    = document.getElementById("lbsInput").value;

*/
	if (payload.name == "") {
		document.getElementById('status').textContent = 'Status: Insert Failed.  Name field cannot be NULL.'
	}

	else {
        request.open('POST', '/test', true);
        request.setRequestHeader("Content-Type", "application/json");

        request.addEventListener('load', function () {
            if (request.status >= 200 && request.status < 400) {
                var response = JSON.parse(request.responseText);
                //insertRow(response);
				document.getElementById('status').textContent = 'Status: Insert Successfull.' 
            }
        });

        request.send(JSON.stringify(payload));

	}	

	event.preventDefault();
}
/*
    //send the request if all form fields have data, then insert the row into the html and database table
    if(valid) {

        request.open('POST', '/', true);

        request.addEventListener('load', function () {
            if (request.status >= 200 && request.status < 400) {
                var response = JSON.parse(request.responseText);
                insertRow(response);
            }
        });

        //send the request
        request.setRequestHeader("Content-Type", "application/json");
        request.send(JSON.stringify(payload));
    }
*/





function buildURL(baseURL, payload) {
	for(key in payload) {
		if (payload[key] != "") {	
			baseURL = baseURL + key + '=' + payload[key] + '&';
		}
	}
	baseURL = baseURL.slice(0, -1);
	return baseURL;
}
