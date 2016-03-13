var animals = [
	{name:'Randy Roo', species: 'cat'},
	{name:'Cali Flute', species: 'cat'},
	{name:'Corky Lee', species: 'dogShit'},
	{name:'Lizzy Lou', species: 'dogShit'},
	{name:'Beulah Boo', species: 'rat'},
	{name:'Nemo', species: 'fish'}
]

/*
var cats = []
for (var i=0; i<animals.length; i++) {
	if(animals[i].species==='cat') {
		cats.push(animals[i])
	}
}

var cats = animals.filter(function(animal) {
	console.log(animal.species === 'cat');
	return animal.species === 'cat';
})
*/

var isCat = function(animal) {
	return animal.species === 'cat'
}


var cats = animals.filter(isCat); 
var other = 


console.log(cats);