/*********************
*  Josh Hughes 
*  31 JAN 2016
*  CS290-400
*  Week 4 Exercise: Fixing Closure Loop
*  Reference: Week 4 "Scope and Context" Closure Loop Example
********************/



/***** CODE TO FIX - NOT WORKING ***************************

function buildList(list) {
    var result = [];
    for (var i = 0; i < list.length; i++) {
        var item = 'item' + list[i];
        result.push( function() {alert(item + ' ' + list[i])} );
    }
    return result;
}
 
function testList() {
    var fnlist = buildList([1,2,3]);
    // using j only to help prevent confusion - could use i
    for (var j = 0; j < fnlist.length; j++) {
        fnlist[j]();
    }
}


testList();
*******************************************************/



/***** FIXED CODE - WORKING ***************************/

function buildList(list) {			//parent function, takes array as param
    var result = [];				//array will stay alive as parent closure		
    for (var i = 0; i < list.length; i++) {	//loop lenght of array that was sent as param
        var item = list[i];			//var, stays alive in child closure 
       
        result.push(				//push function into return array 
            function(childItem) {		//create and call child function, takes string as param 
                return function() {		//returns a function - a closure
                    alert('item' + childItem + ' ' + childItem);	//alerts string
                    console.log('item' + childItem + ' ' + childItem);	//log string to test
                };  
            }(item)				//var from parent func, sent as argument to chil
        ); 
    }

    return result;				//return array of function
}


 
function testList() {				//function to call to build array
    var fnlist = buildList([1,2,3]);		//array to send to buildList()

    for (var j = 0; j < fnlist.length; j++) {	//loop fnlist array
        fnlist[j]();				//call each function in array
    }
}



testList();					//call testList() to make sure it works

