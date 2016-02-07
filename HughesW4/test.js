var cats = [
	{name: 'Randy', type: 'Maine Coon'},
	{name: 'Cali', type: 'Calico'},
	{name: 'Beulah', type: 'Shorthair'},
	{name: 'Henry', type: 'Maine Coon'}
];


var coons = cats.filter(function(cats) {
	return cats.type == 'Maine Coon';
})

function isCoon(cats) {
	return cats.type == 'Maine Coon';
}

var coons2 = cats.filter(isCoon);

/*
for (var i=0; i<cats.length; i++) {
	if (cats[i].type == 'Maine Coon') { 
		console.log(cats[i].name + ' is a ' + cats[i].type.toLowerCase());
	}
}
*/

console.log(coons2);




