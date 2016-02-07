/**********************
*  Josh Hughes
*  31 JAN 2016
*  CS290-400
*  Week 4 Assignment
*  References listed in code comments
*********************/


function Automobile( year, make, model, type ){
    this.year = year; //integer (ex. 2001, 1995)
    this.make = make; //string (ex. Honda, Ford)
    this.model = model; //string (ex. Accord, Focus)
    this.type = type; //string (ex. Pickup, SUV)
    this.logMe = function (withType) {                                      //logs auto's attributes to console
        if (withType) {                                                     //log does not include type attribute
            console.log(year + ' ' + make + ' ' + model + ' ' + type);      //concat string
        }
        else {                                                              //log includes type attribute            
            console.log(year + ' ' + make + ' ' + model);                   //concat string
        }
    };
}


Array.prototype.contains = function (ele) {                                 //ref: http://stackoverflow.com/questions/237104/array-containsobj-in-javascript
    for (var i=0; i<this.length; i++) {                                     //tests if an array contains element
        if (this[i] == ele) {                                               //iterates array
            return true;                                                    //if contains element -> true
        }
    }
    return false;                                                           //does not contain element -> false
}


var automobiles = [                                                         //array of automobile objects
    new Automobile(1995, "Honda", "Accord", "Sedan"),
    new Automobile(1990, "Ford", "F-150", "Pickup"),
    new Automobile(2000, "GMC", "Tahoe", "SUV"),
    new Automobile(2010, "Toyota", "Tacoma", "Pickup"),
    new Automobile(2005, "Lotus", "Elise", "Roadster"),
    new Automobile(2008, "Subaru", "Outback", "Wagon")
    ];


/*This function sorts arrays using an arbitrary comparator. You pass it a comparator and an array of objects appropriate for that comparator and it will return a new array which is sorted 
with the largest object in index 0 and the smallest in the last index*/
function sortArr( comparator, array ){                                      //ref: https://www.youtube.com/watch?v=stt26Ia2IDk
    sorted = array;                                                         //duplicates unsorted array, the new array will be sorted then returned using bubble sort 
    var changed;                                                            //bool to see if last iteration had an element swap

    for (var i=0; i<array.length-1; i++) {                                  //outer loop -> iterate array one less time than its length -> left to right
        for (var j=0; j<array.length-1; j++) {                              //inner loop -> iterate array one less time than its length -> pushes largest item left each iteration
            if (!comparator(sorted[j], sorted[j+1])) {                      //useses comapritor function to get bool value, if it is false
                changed = true;                                             //set change var to true because a swap will now happen
                var temp = sorted[j];                                       //create a temp var to hold the current element in the array
                sorted[j] = sorted[j+1];                                    //set the current element in the array to that of the element to its right
                sorted[j+1] = temp;                                         //set the element to the right of the current element to the value of temp (what was the current elemente)
            }
        }
        if (!changed) {                                                     //if an intire iteration happens on the inner loop without a change, than the array has been sorted
            return sorted;                                                  //return the sorted array
        }
    }
    return sorted;                                                          //if all outer loop iterations finish, return the sorted array
}


/*A comparator takes two arguments and uses some algorithm to compare them. If the first argument is larger or greater than the 2nd it returns true, otherwise it returns false. 
Here is an example that works on integers*/
function intComparator( int1, int2){                                        //compare two integer values
    if (int1 > int2){           
        return true;                                                        //return boolean value
    } else {
        return false;
    }
}

/*For all comparators if cars are 'tied' according to the comparison rules then the order of those 'tied' cars is not specified and either can come first*/

/*This compares two automobiles based on their year. Newer cars are "greater" than older cars.*/
function yearComparator( auto1, auto2){                                     //compares years, returns bool
    return intComparator(auto1.year, auto2.year)                            //calls intComparitor, then returns 
}

/*This compares two automobiles based on their make. It should be case insensitive and makes which are alphabetically earlier in the alphabet are "greater" than ones that come later.*/
function makeComparator( auto1, auto2){                                     //compares strings, returns bool
    if (auto1.make.toLowerCase() > auto2.make.toLowerCase()) {              //convert to lower case so it is case insensitive
        return false;                                                       
    }
    else {
        return true;
    }
}

/*This compares two automobiles based on their type. The ordering from "greatest" to "least" is as follows: roadster, pickup, suv, wagon, (types not otherwise listed). It should be case insensitive. 
If two cars are of equal type then the newest one by model year should be considered "greater".*/
function typeComparator( auto1, auto2){                                         //compares integer values
    var typeOrder = ["wagon", "suv", "pickup", "roadster"];                     //ref:  Satpreet Harcharan Singh on Piazza under "How to set up the type comparator hierarchy" thread
    var typeVal1 = typeOrder.indexOf(auto1.type.toLowerCase())                  //var to hold index value of type in typeOrder array (array is reverse priority order)
    var typeVal2 = typeOrder.indexOf(auto2.type.toLowerCase())                  // '' for auto 2

    if (typeVal1 == typeVal2) {                                                 //if types are same, call year comparitor because this is tie-breaker
        return yearComparator(auto1, auto2);
    }
    else {
        return intComparator(typeVal1, typeVal2);                               //if types differ, call int comparitor to see which has higher index from typeOrder array
    }
}


function printArray(array, sortType, brk) {                                     //ref:  Isaiah Fentress on Piazza under "logMe" thread
    var printType = ['type'];                                                   //array to hold what kinds of compairsons that require the logMe method to log the type

    printBreak(brk);
    console.log('The cars sorted by ' + sortType + ' are:')                     //print header for what type of sort is being listed
    
        array.forEach(function(ele) {                                           //itterate array, call logMe method, and pass it bool val of wheather its type needs to be logged
            ele.logMe(printType.contains(sortType));
        });
}


function printBreak(type) {                                                     //prints either a blank line or 5 stars depending on param provided
    var breaks = ['', '*****'];

    console.log(breaks[type]);
}

                                              
printArray(sortArr(yearComparator, automobiles), 'year', 1);                    //calls printArray to output sorted aray for year                                              
printArray(sortArr(makeComparator, automobiles), 'make', 0);                    // '' for make
printArray(sortArr(typeComparator, automobiles), 'type', 0);                    // '' for type
printBreak(1);                                                                  //line with 5 stars
                            




/*Your program should output the following to the console.log, including the opening and closing 5 stars. All values in parenthesis should be replaced with appropriate values. 
Each line is a seperate call to console.log.

Each line representing a car should be produced via a logMe function. This function should be added to the Automobile class and accept a single boolean argument. 
If the argument is 'true' then it prints "year make model type" with the year, make, model and type being the values appropriate for the automobile. 
If the argument is 'false' then the type is ommited and just the "year make model" is logged.

*****
The cars sorted by year are:
(year make model of the 'greatest' car)
(...)
(year make model of the 'least' car)

The cars sorted by make are:
(year make model of the 'greatest' car)
(...)
(year make model of the 'least' car)

The cars sorted by type are:
(year make model type of the 'greatest' car)
(...)
(year make model type of the 'least' car)
*****

As an example of the content in the parenthesis:
1990 Ford F-150 */
		
