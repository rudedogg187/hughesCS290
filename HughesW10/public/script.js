

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
		alert('Name Can Not Be NULL');
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

	//text nodes****
	var nameText = document.createTextNode(data.name);
	var repsText = document.createTextNode(data.reps);
	var wghtText = document.createTextNode(data.weight);
	var dateText = document.createTextNode(data.date);
	var lbsText = document.createTextNode(data.lbs);

	//delete button****
	var delText = document.createTextNode('DELETE');
	var dButton = document.createElement('button');


	dButton.type = 'submit';
	dButton.className = 'btn btn-danger btn-xs';
	dButton.addEventListener('click', function(event) {
	//delete row********************************************
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

//				console.log(response);
				document.getElementById('status').textContent = response.status; 

				toDelete.parentNode.removeChild(toDelete);
			}
		});

   		request.send(JSON.stringify(payload));

		event.preventDefault();
	
	});
	//***************************************************


	dButton.appendChild(delText);
	

	//input node***
	var updInput = document.createElement('input');
	updInput.type ='text';
	updInput.className = 'form-control';
	updInput.placeholder = '(update input)';

	var updText = document.createTextNode('UPDATE');
	var uButton = document.createElement('button');

	

	uButton.type = 'submit';
	uButton.className = 'btn btn-info btn-xs';
	uButton.addEventListener('click', function (event) {
//***************************************************************
		var dataId = data.id;
		var reqUrl = '/update?id=' + dataId;
		var req = new XMLHttpRequest();

		req.open('GET', reqUrl, true);

		req.addEventListener('load', function() {
	
			var resp = JSON.parse(req.responseText);
			var innerCode = resp.innerCode;
//			console.log(innerCode);

			document.getElementById('insertForm').innerHTML = innerCode;

			var submitUpdate = document.getElementById('updateButton');	
			//******************************************************************************	
			submitUpdate.addEventListener('click', function (event) {
			
				var subId = '?id=' + dataId;	
				var subName = '&name=' + document.getElementById('nameUpdate').value;
				var subReps = '&reps=' + document.getElementById('repsUpdate').value;
				var subWght = '&weight=' + document.getElementById('weightUpdate').value;
				var subDate = '&date=' + isNull(document.getElementById('dateUpdate').value);
				var subLbs = '&lbs=' + isNull(document.getElementById('lbsUpdate').value);
				
				var subUrl = '/submit-update' + subId + subName + subReps + subWght + subDate + subLbs;
				req = new XMLHttpRequest();

				req.open('GET', subUrl, true);

				req.addEventListener('load', function() {
										
					var resp = JSON.parse(req.responseText);
					var returnStatus = resp.status
					var results = resp.results[0];

					document.getElementById('status').textContent = returnStatus; 
					
					document.getElementById('name_'+dataId).textContent = results.name;	
					document.getElementById('reps_'+dataId).textContent = results.reps;	
					document.getElementById('weight_'+dataId).textContent = results.weight;	
					document.getElementById('date_'+dataId).textContent = results.date;	
					document.getElementById('lbs_'+dataId).textContent = results.lbs;	
					
					toDelete = document.getElementById('deleteMe');	
					toDelete.parentNode.removeChild(toDelete);
				});
				
				req.send(null);
				event.preventDefault();
			});
			//*****************************************************************************
		});

		req.send(null);
		event.preventDefault();
	});
//************************************


	uButton.appendChild(updText);

	var dataName = document.createElement('td');
	var dataReps = document.createElement('td');
	var dataWght = document.createElement('td');
	var dataDate = document.createElement('td');
	var dataLbs = document.createElement('td');
	var dataUpd = document.createElement('td');
	var dataDel = document.createElement('td');


	dataName.id = 'name_'+dataId;
	dataReps.id = 'reps_'+dataId;
	dataWght.id = 'weight_'+dataId;
	dataDate.id = 'date_'+dataId;
	dataLbs.id = 'lbs_'+dataId;
	



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
