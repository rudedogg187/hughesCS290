function makePageTitle(title) {
	var docTitle = document.getElementsByTagName('title')[0];
	var titleText = document.createTextNode(title);
	
	docTitle.appendChild(titleText);
}


function makeTable(parent, rows, cols) {
	var myTable = document.createElement('table');
	parent.appendChild(myTable);
	myTable.style.backgroundColor = 'white';

	for (var r=0; r<rows; r++) {
		var tableRow = document.createElement('tr')
		myTable.appendChild(tableRow);	
	
		for (var c=1; c<=cols; c++) {
		
			if (r==0) {
				var tableCell = document.createElement('th');
				var text = 'Header, ' + (c);	
			}	
			
			else {
				var tableCell = document.createElement('td');
				var text = c + ', ' + r; 
			}
			
			var cellText = document.createTextNode(text);
			tableRow.appendChild(tableCell);	
			tableCell.appendChild(cellText);	

			tableCell.style.border = '1px solid black';	
			tableCell.style.width = '100px';	
			tableCell.style.textAlign = 'center';	
		}	
	}
	
	return myTable;
}



function makeActions(table, rowCount, colCount) {
	var row = 1;
	var col = 0;
	
	function changeCol(val) {
		col+=val;
	
		if (col==-1) {
			col++;
		}

		if (col==colCount) {
			col--;
		}
	}	

	function changeRow(val) {
		row+=val;	

		if (row==0) {
			row++;
		}
	
		if (row==rowCount) {
			row--;
		}
	}
	
	function unselectCell() {
		var targetRow = table.getElementsByTagName('tr')[row];
		var targetCell = targetRow.getElementsByTagName('td')[col];
		targetCell.style.border = '1px solid black';	
	
	}

	function selectCell() {
		var targetRow = table.getElementsByTagName('tr')[row];
		var targetCell = targetRow.getElementsByTagName('td')[col];
		targetCell.style.border = '5px solid black';	
	
	}

	function markCell() {
		var targetRow = table.getElementsByTagName('tr')[row];
		var targetCell = targetRow.getElementsByTagName('td')[col];
		targetCell.style.backgroundColor = 'yellow';	
	
	}

	selectCell();
	
	return {
		left: function() {
			unselectCell();
			changeCol(-1);
			selectCell();
		},
		
		right: function() {
			unselectCell();
			changeCol(1);
			selectCell();
		},
		
		up: function() {
			unselectCell();
			changeRow(-1);
			selectCell();
		},

		down: function() {
			unselectCell();
			changeRow(1);
			selectCell();
		},
	
		mark: function() {
			markCell();
		},
	
		/*getPosition: function() {
			return [row, col];
		}*/
	
	}
}



function makeButtons(parent, actions) {

	for (var method in actions) {
		var buttonName = method.toUpperCase();
		var newButton = document.createElement('button');
		var buttonText = document.createTextNode(buttonName);
	
		newButton.appendChild(buttonText);
		newButton.setAttribute('id', method + 'Button');
		parent.appendChild(newButton);
	}
}

var pageTitle = "Hughes' DOM and Events Assignment (CS290)";
var rowCount = 4;
var colCount = 4;

var docBody = document.getElementsByTagName('body')[0];

makePageTitle(pageTitle);

var myTable = makeTable(docBody, rowCount, colCount);

var actions = makeActions(myTable, rowCount, colCount);

makeButtons(docBody, actions);

document.getElementById('upButton').addEventListener('click', actions.up);
document.getElementById('downButton').addEventListener('click', actions.down);
document.getElementById('leftButton').addEventListener('click', actions.left);
document.getElementById('rightButton').addEventListener('click', actions.right);
document.getElementById('markButton').addEventListener('click', actions.mark);

var bod = document.body;
bod.style.backgroundColor = 'grey';
