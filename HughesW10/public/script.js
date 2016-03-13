

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
			var results = response.results;

//			console.log(response);
			document.getElementById('status').textContent = response.status; 

			for (var i=0; i<results.length; i++) {
				insertRow(results[i]);
			}	
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
				var results = response.results;
				var newId = response.newId;              
 
				for (var i=0; i<results.length; i++) {
					if (results[i].id == newId) {
						insertRow(results[i]);
					}
				}
 
//				console.log(response);
				document.getElementById('status').textContent = response.status; 
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
	console.log(data);
	console.log(data.name);
	var parent = document.getElementById('workoutData');
	var tableRow = document.createElement('tr');
	var dataId = data.id;

	tableRow.id = dataId;

	var nameText = document.createTextNode(data.name);
	var repsText = document.createTextNode(data.reps);
	var wghtText = document.createTextNode(data.weight);
	var dateText = document.createTextNode(data.date);
	var lbsText = document.createTextNode(data.lbs);


	var delText = document.createTextNode('DELETE');
	var dButton = document.createElement('button');
	dButton.type = 'submit';
	dButton.className = 'btn btn-danger btn-xs';
	dButton.addEventListener('click', function(event) {


//*****************************

	var request = new XMLHttpRequest();
	var payload = {};
	var dataId = data.id
	var toDelete = document.getElementById(dataId);

	payload.id = dataId;

	request.open('POST', '/delete', true);
	request.setRequestHeader("Content-Type", "application/json");

	request.addEventListener('load', function () {
        if (request.status >= 200 && request.status < 400) {
            var response = JSON.parse(request.responseText);
			var results = response.results;

//			console.log(response);
			document.getElementById('status').textContent = response.status; 

			toDelete.parentNode.removeChild(toDelete);
		}
	});

    request.send(JSON.stringify(payload));

	event.preventDefault();


//************************





		
	});



	dButton.appendChild(delText);
	

	var updText = document.createTextNode('UPDATE');
	var uButton = document.createElement('button');
	uButton.type = 'submit';
	uButton.className = 'btn btn-info btn-xs';

	uButton.appendChild(updText);







	var dataName = document.createElement('td');
	var dataReps = document.createElement('td');
	var dataWght = document.createElement('td');
	var dataDate = document.createElement('td');
	var dataLbs = document.createElement('td');
	var dataUpd = document.createElement('td');
	var dataDel = document.createElement('td');


	dataName.appendChild(nameText);
	dataReps.appendChild(repsText);
	dataWght.appendChild(wghtText);
	dataDate.appendChild(dateText);
	dataLbs.appendChild(lbsText);
	dataUpd.appendChild(uButton);
	dataDel.appendChild(dButton);


	
	tableRow.appendChild(dataName);
	tableRow.appendChild(dataReps);
	tableRow.appendChild(dataWght);
	tableRow.appendChild(dataDate);
	tableRow.appendChild(dataLbs);
	tableRow.appendChild(dataUpd);
	tableRow.appendChild(dataDel);


	parent.appendChild(tableRow);
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
			var parent = document.getElementById("workoutData");

			while (parent.hasChildNodes()) {
   				 parent.removeChild(parent.lastChild);

			}

			console.log(response);
			document.getElementById('status').textContent = returnStatus; 
		}
	});

    request.send(JSON.stringify(payload));

	event.preventDefault();
}
