/**************************
*  Josh Hughes
*  07 FEB 2016
*  Week 5 Assignment
*  DOM and Events 
*  CS290-400
**************************/ 





/************************
* makePageTitle Function
* takes string parameter
* creates a text node with the string parmater
* appends the text node to the title element
************************/
function makePageTitle(title) {
	var docTitle = document.getElementsByTagName('title')[0];		//save title ele to var	
	var titleText = document.createTextNode(title);		//create and save text node using title parameter
	
	docTitle.appendChild(titleText);		//append the text node to the title element
}


/***********************
* makeTable Function
* takes document object of where the table will be appended to
* takes int value for number of rows and number of cols to be in table
* uses nested loop to create rows and columns
* outer loop makes tr elements and appends them to the table
* inner loop makes td (or th) elements and appends them to tr
* inntr loop also makes text nodes and appends them to td (th) elements
* returns a table object
***********************/
function makeTable(parent, rows, cols) {
	var myTable = document.createElement('table');		//save a new table element
	parent.appendChild(myTable);				//append the new table eleemnt to the parent element (parameter)
	myTable.style.backgroundColor = 'white';		//set the background of the table to white

	for (var r=0; r<rows; r++) {		//loop for specified number of rows the table should have
		var tableRow = document.createElement('tr');		//create a table row element on each iteration
		myTable.appendChild(tableRow);			//append the new table row element to the table each iteration	
	
		for (var c=1; c<=cols; c++) {		//loop specifed number of columns needed, for each row iteration
		
			if (r==0) {		//test if it a header row (top row)
				var tableCell = document.createElement('th');		//if header row, create a table header element
				var text = 'Header, ' + (c);		//create the cell content based on currnet column being created	
			}	
			
			else {		//if it is not a header row	
				var tableCell = document.createElement('td');		//create a table data element
				var text = c + ', ' + r; 		//create cell contente baseed on currrent column and row being created
			}
			
			var cellText = document.createTextNode(text);		//create a new text node element for the cells content
			tableRow.appendChild(tableCell);		//append the new cell to the current row	
			tableCell.appendChild(cellText);		//append the text node to the current cell	

			tableCell.style.border = '1px solid black';	//set styles for cell	
			tableCell.style.width = '100px';		// ""	
			tableCell.style.textAlign = 'center';		// ""	
		}	
	}
	
	return myTable;		//return the table element
}


/***********************
* makeActions Function
* takes in table object, and number of rows and columns in the table
* creates private vars to hold curretn row and column (this is a closure)
* creates private function to traverse columns
* creates private function to travers rows
* returns object of functions, which call the private functions to move through rows and columns
* Reference for this function: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures
***********************/
function makeActions(table, rowCount, colCount) {
	var row = 1;		//private var to hold row coordinate, set to 2nd row (first row is header)
	var col = 0;		//private var to hold col coordinate, set to 1st column	

	/***************
	* changeCol Function
	* takes value as parameter
	* increaments col var by value given (+1 for right, -1 for left
	* tests if increament pushes cell coordiante outside of table, if so it sets col to edge	
	****************/	
	function changeCol(val) {
		col+=val;		//increment col coord by value sent to it function
	
		if (col==-1) {		//if incriment pushes column over left edge, incriment it to bring it back 
			col++;
		}

		if (col==colCount) {	//if incriment pushes column over right edge, decriment it to bring it back
			col--;
		}
	}	

	/******************
	* changeRow Function
	* takes integer as parameter
	* increments row var by value given (+1 for down, -1 for up)
	* tests if increment pushes cell coordinate outside bable, if so it sets row to edge
	******************/
	function changeRow(val) {
		row+=val;		//incriment row coord by value sent to function	

		if (row==0) {		//if incriment pushs row (into header row) above top edge, incrient it to bring it back
			row++;
		}
	
		if (row==rowCount) {	//if incriment pushes row below bottom edge, decriemnt it to bring it back
			row--;
		}
	}
	
	/******************
	* unselectCell Function
	* finds current row and column based on what current row and col vars are set to
	* sets the cell at that coordiante to default border thicknes
	******************/
	function unselectCell() {
		var targetRow = table.getElementsByTagName('tr')[row];		//get list of row elements, save the row element at index of the row coordiant (var)
		var targetCell = targetRow.getElementsByTagName('td')[col];	//get list of data elements in the row from above, save the data element that is at index of col coordinate (var)
		targetCell.style.border = '1px solid black';			//set border of the selected cell to the default border width	
	
	}

	/******************
	* selectCell Function
	* finds current row and column based on what current row and col vars are set to
	* sets the cell at that coordiante to have border that is thicker than default 
	******************/
	function selectCell() {
		var targetRow = table.getElementsByTagName('tr')[row];		//get list of row elements, save the row element at index of the row coordinate (var)
		var targetCell = targetRow.getElementsByTagName('td')[col];	//get list of data elements in the row from above, save the data element that is at index of col coordiante (var)
		targetCell.style.border = '5px solid black';			//set border of the selected cell to have a thicker than default border	
	
	}
	
	/******************
	* markCell Function
	* finds current row and column based on what current row and col vars are set to
	* sets the color of the cell at this coordinate to yellow
	******************/
	function markCell() {
		var targetRow = table.getElementsByTagName('tr')[row];		//get list of row elements, save the row element at index of the row coordinate (var)
		var targetCell = targetRow.getElementsByTagName('td')[col];	//get list of data elements in the row from above, save the data element that is at index of the coordinate (var)
		targetCell.style.backgroundColor = 'yellow';			//set the color of the selected cell to yellow	
	
	}

	selectCell();

	/*********************
	* return on object of functions
	* these return function call the above functions 
	* the buttons will rely on this objects methods 
	*********************/	
	return {
		left: function() {		
			unselectCell();		//call to set current cell border to default width
			changeCol(-1);		//call to change col coordinate, this will decrement it moving it to the left
			selectCell();		//call to set the new current cell to have a bold boroder
		},
		
		right: function() {
			unselectCell();		//call to set current cell border to default width
			changeCol(1);		//call to change col coordinate, this will increment it moving it to the right
			selectCell();		//call to set the new current cell to have a bold border
		},
		
		up: function() {
			unselectCell();		//call to set current cell border to default width
			changeRow(-1);		//call to change row coordinat, this will decremnt it moving it up
			selectCell();		//call to set the new current cell to have a bold boroder
		},

		down: function() {
			unselectCell();		//call to set current cell border to default width
			changeRow(1);		//call to change row coordinate, this will increment it moving it down
			selectCell();		//call to set the new current cell to have a bold boroder
		},
	
		mark: function() {
			markCell();		//call to mark cell, this will make it yellow
		},
	
		/*getPosition: function() {	//this printed the cell coordinates to console for testing
			return [row, col];
		}*/
	
	}
}


/******************
* makeButtons Function
* takes in parent where the buttons will be appened to
* iterates the actions object, and names buttons same as actions methods
* appends each button to the parent object
********************/
function makeButtons(parent, actions) {

	for (var method in actions) {					//iterate methods in the actions object	
		var buttonName = method.toUpperCase();			//save method name to var to be used for button text
		var newButton = document.createElement('button');	//create a new button element, save it to a var
		var buttonText = document.createTextNode(buttonName);	//create a text node, save it to a var
	
		newButton.appendChild(buttonText);			//append the button text to button element
		newButton.setAttribute('id', method + 'Button');	//create an id for the new button so that it can be found and have an event handler attached to it later
		parent.appendChild(newButton);				//append the button to the element that was sent in as a parameter
	}
}



//create variables
var pageTitle = "Hughes' DOM and Events Assignment (CS290)";		//will be used to title the page
var rowCount = 4;		//number of rows in table, table size can be changed here	
var colCount = 4;		//number of columns in table, table size can be changed here	

//create var to hold the body of the document
var docBody = document.getElementsByTagName('body')[0];		//get list of body elements, save to a var first element in that list (only one body in document)

//create title for page
makePageTitle(pageTitle);		//call to add title to page, send it the string declared above

//create table in the body of document
var myTable = makeTable(docBody, rowCount, colCount);		//call to create table in body using vars to set col and row size

//create action object which holds methods for buttons
var actions = makeActions(myTable, rowCount, colCount);		//call to create actions object which holds methods for button functions

//create action buttons
makeButtons(docBody, actions);		//call to have buttons created for each action within actions object, these buttons are appended to body of document

//add event listeners to each button
document.getElementById('upButton').addEventListener('click', actions.up);		//add event to upButtion, using up function of actions object
document.getElementById('downButton').addEventListener('click', actions.down);		//same as above, but for down
document.getElementById('leftButton').addEventListener('click', actions.left);		//same as above, but for left
document.getElementById('rightButton').addEventListener('click', actions.right);	//same as above, but for right	
document.getElementById('markButton').addEventListener('click', actions.mark);		//same as above, but for marking the cell

docBody.style.backgroundColor = 'grey'; 		//set body to have grey color to help table to stand out
