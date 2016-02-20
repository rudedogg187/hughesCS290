/***********
* Josh Hughes
* CS290 W6
* POST AJAX
* 14 FEB 2016
************/

document.addEventListener('DOMContentLoaded', bindButton);								//wait until dom content has loaded, then call bind button func
	
function bindButton() {																	//ref W6 Lecture
	document.getElementById('postSubmit').addEventListener('click', function(event) {	//listen for submit button to be clicked, call anonomys func
		var req = new XMLHttpRequest();													//create new xml request object
		var payload = {toAPI:null};														//create json object with null value
		payload.toAPI = document.getElementById('postInput').value;						//set json object value to input from input box
		req.open('POST', 'http://httpbin.org/post', true)								//create a post request that is asyncronous
		req.setRequestHeader('Content-Type', 'application/json');						//create header to tell server that a json object will be passed

		req.addEventListener('load', function() {										//create closure, wait this will allow the return object to be read even after js executes
			var resp = JSON.parse(req.responseText);									//once return has been loadded, parse the returned json object
			var fromAPI_data = resp.data;												//save the data element to a var
			var fromAPI_string = resp.json.toAPI;										//save the json element to a var
			document.getElementById('postReturn').textContent = fromAPI_string;			//append the string data to a div in the html document

		});

		req.send(JSON.stringify(payload));												//send the xml request object to server with the json object 
		event.preventDefault();			
	});
}


