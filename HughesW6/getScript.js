/**************
* Josh Hughes
* CS290 W6
* AJAX Get Request
* 14 FEB 2016
***************/


var apiKey = '0ade638e1578a629c7d4a0223394fecf';											//key for openWeathermap API

document.addEventListener('DOMContentLoaded', bindButton);									//once dom elements loaded, call bind buttons function

function bindButton() {																		//ref W6 Lecture Video 
	document.getElementById('locSubmit').addEventListener('click', function(event) {		//create event listtner for when submit button is clicked
 		var loc = document.getElementById('locInput').value;								//save input value for locaton to a var
 		var reqUrl = getUrl(loc);															//build URL (func deterimes if zip or place name was inputted)
 		var req = new XMLHttpRequest();														//create an xmlhttprequest object
 		req.open('GET', reqUrl, true);														//send an asyncronus get request to the appropriate URL

 		req.addEventListener('load', function() {											//create a closure, for when requested data is returned.  

	 		var resp = JSON.parse(req.responseText);										//parse returned json object and save text to a var
			var weather = resp.weather[0];													//save sub object of json object to a var
			var tod = ''																	//var to hold if it is day or night

			if (weather.icon.charAt(2) == 'n') {											//test name of icon to see if it is night
				tod = "Tonight's"			}
			else {																			//if it is not night, then its day
				tod = "Today's"
			}

			var iconPath = 'http://openweathermap.org/img/w/' + weather.icon + '.png';		//build path to weather image 

			document.getElementById('locationSummary').textContent = tod + ' forecast for ' + resp.name + ', ' + resp.sys.country + ':';			//place text in html span for location name

			document.getElementById('weatherIcon').setAttribute('src', iconPath);																	//place image in html page
			document.getElementById('weatherIcon').setAttribute('alt', weather.main);																//give the image an alternative attribute
	
			document.getElementById('currentTemp').textContent = toTitleCase(weather.description) + ', ' +convertTemp(resp.main.temp) + ' with ' + resp.main.humidity + '% humidity';	//place weather text in html span

			document.getElementById('highTemp').textContent = "Today's high: " + convertTemp(resp.main.temp_max);		//create text node
														
			document.getElementById('lowTemp').textContent = "Today's low: " + convertTemp(resp.main.temp_min);
	

			console.log(resp);																				//log the json object that was returned

		});																									//end of inner, inner function

		req.send(null);																						//send request to open weather (get has null payload)
		event.preventDefault();																				//allow content of page to reamin 
	});

}

/*determine if input was zip or placename*/
function getUrl(loc) {
	if((loc[0] >= '0' && loc[0] <= '9') && loc.length == 5) {												//test if 1st char in string is digit, and if it's length is 5
		loc = 'zip=' + loc;																					//if true, a zip code was entered
	}																										//build appropriate string for zip code 

	else {																									//if false, a placename was entered
		loc = 'q=' + loc;																					//build appropriate string for place name
	}

	return 'http://api.openweathermap.org/data/2.5/weather?' + loc + '&appid=' + apiKey;					//concate url, and zip/placename and key, and return 

}

/*convert from kelvin to fahrenheit*/
function convertTemp(kelvin) {
	fahrenheit = ((kelvin - 273.15) * 1.8) + 32;															//formulat to convert K to F
	fahrenheit = Math.round(fahrenheit);																	//round result
	return fahrenheit  + '\u00B0' + ' F';																	//return string that has F and a degree sign
}

/*create string with capital letters at begining of each word*/
function toTitleCase(str) { //ref: http://stackoverflow.com/questions/4878756/javascript-how-to-capitalize-first-letter-of-each-word-like-a-2-word-city
    return str.replace(/\w\S*/g, function(txt) {
    	return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}



