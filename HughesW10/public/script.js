document.addEventListener("DOMContentLoaded", getData); 
document.getElementById("submitButton").addEventListener("click", insertData);
document.getElementById("resetButton").addEventListener("click", resetData);


function getData(event) {
	var request = new XMLHttpRequest();
	var payload = {};
	
	request.open('POST', '/', true);
	request.setRequestHeader("Content-Type", "application/json");

	request.addEventListener('load', function () {
        if (request.status >= 200 && request.status < 400) {
            var response = JSON.parse(request.responseText);
			var returnStatus = response.status;

			console.log(response);
			document.getElementById('status').textContent = returnStatus; 
		}
	});

    request.send(JSON.stringify(payload));

	event.preventDefault();
}



function insertData(event) {
	var request = new XMLHttpRequest();
	var payload = {};	

	payload.name   = document.getElementById("nameInput").value;
	payload.reps   = isNull(document.getElementById("repsInput").value);
	payload.weight = isNull(document.getElementById("weightInput").value);
	payload.date   = isNull(document.getElementById("dateInput").value);
	payload.lbs    = isNull(document.getElementById("lbsInput").value);

	if (payload.name == "") {
		document.getElementById('status').textContent = 'Status: Insert Failed.  Name field cannot be NULL.'
	}

	else {
        request.open('POST', '/insert', true);
        request.setRequestHeader("Content-Type", "application/json");

        request.addEventListener('load', function () {
            if (request.status >= 200 && request.status < 400) {
                var response = JSON.parse(request.responseText);
				var returnStatus = response.status;
                
				insertRow(response.results);
				console.log(response);
				document.getElementById('status').textContent = returnStatus; 
            }
        });

        request.send(JSON.stringify(payload));

	}	

	event.preventDefault();
}


function isNull(val) {
	if (val == "") {
		return null;
	}
	return val;
}


function insertRow(data) {


}




function resetData(event) {
	var request = new XMLHttpRequest();
	var payload = {};
	
	request.open('POST', '/reset-table', true);
	request.setRequestHeader("Content-Type", "application/json");

	request.addEventListener('load', function () {
        if (request.status >= 200 && request.status < 400) {
            var response = JSON.parse(request.responseText);
			var returnStatus = response.status;

			console.log(response);
			document.getElementById('status').textContent = returnStatus; 
		}
	});

    request.send(JSON.stringify(payload));

	event.preventDefault();
}
