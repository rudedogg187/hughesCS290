/*
	Josh Hughes
	W3 Assignment CS290-400
        17 JAN 2016
        JavaScript Objectst
*/    

/***************
* deepCompare
* takes 2 objects and compares object's properties
* returns true if all properties are same
* returns fals if any propery is differnt
***************/
function deepCompare(objA, objB) {

	//test if both objects are pointed to same place in memory
	if (objA == objB) {    
		return true;   	
	}

	//interate all properties in object A 
	for (var aProp in objA) {

		//test of current property of A matches that of B
		if (objA[aProp] != objB[aProp]) {
			return false;
		}	
	}

	//interate all properties in object B 
	for (var bProp in objB) {
		
		//test of current property of B matches that of A 
		if (objB[bProp] != objA[bProp]) {
			return false;
		}
	}

	//if make it this far, both objects are same 
	return true;
} 


/***** Test Code *******

var vehicleA = { 
	make: "Toyota", 
	model: "Tundra", 
	year: 2006, 
	color: "Grey", 
	drive: "4wd"
};

var vehicleB = {
	make: "Toyota", 
	model: "Tundra", 
	year: 2006, 
	color: "Grey", 
	drive: "4wd"
};

var vA = vehicleA;

var vehicleX = { 
	make: "Outback", 
	model: "Subaru", 
	year: 2008, 
	color: "Brown", 
	drive: "Awd"
};

var vehicleY = { 
	make: "Outback", 
	model: "Subaru", 
	year: 2008, 
	color: "Brown", 
	drive: "Awd",
	power: 300
};

console.log("\n");

console.log(deepCompare(vehicleA, vehicleB));

console.log(deepCompare(vehicleA, vA));
	
console.log(deepCompare(vehicleA, vehicleX));

console.log(deepCompare(vehicleX, vehicleY));

console.log(deepCompare(vehicleY, vehicleX));

***** End of Test Code *****/
