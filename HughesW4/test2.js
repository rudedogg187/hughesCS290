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






 

var automobiles = [
new Automobile(1995, "Honda", "Accord", "Sedan"),
new Automobile(1990, "Ford", "F-150", "Pickup"),
new Automobile(2000, "GMC", "Tahoe", "SUV"),
new Automobile(2010, "Toyota", "Tacoma", "Pickup"),
new Automobile(2005, "Lotus", "Elise", "Roadster"),
new Automobile(2008, "Subaru", "Outback", "Wagon"),
];

 console.log(automobiles.length);