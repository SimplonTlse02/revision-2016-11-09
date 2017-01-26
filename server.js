var express = require("express");
var app = express();

var bodyParser = require("body-parser");
app.use(bodyParser());

var fs = require("fs");

app.get("/", function(request, response){
	response.send("Hello Simplon (recrute).");
});

app.get('/customers', function(request, response){
	console.log('GET /customers');
	/*
		Objectif : récupérer la liste des customers dans data/crm.json
		- chercher le fichier
		- le lire
	*/
	var pathToFile = "data/crm.json";
	fs.readFile(pathToFile, "utf8", function(error, data){
		console.log('File read !');
		console.log("Error: ", error);
		console.log("type: ", typeof data);
		var objectParsed = JSON.parse(data);
		var customers = objectParsed.customers;


		response.json(objectParsed.customers);
	});
});

app.post('/customers', function(request, response){
	console.log("POST /customers");
	var body = request.body;
	console.log(body);
	console.log("Prénom:" + body.first_name);
	/*
		Pusher ce prénom dans la liste des customers dans crm.json
	*/
	// J'ouvre mon fichier
	var pathToFile = "data/crm.json";
	fs.readFile(pathToFile, "utf8", function(error, data){
		console.log('File read !');
		console.log("Error: ", error);
		console.log("type: ", typeof data);
		// Je parse la string en objet Js
		var objectParsed = JSON.parse(data);
		var customers = objectParsed.customers;
		console.log(customers);

		var newCustomer = body;
		// id = longueur du tableau + 1
		var id = customers.length + 1;
		newCustomer.id = id;

		customers.push(newCustomer);

		var newGlobalObject = {
			customers : customers
		};
		// Stringifier
		var newGlobalObjectString = JSON.stringify(newGlobalObject);
		fs.writeFile(pathToFile, newGlobalObjectString, function(err){
			console.log("File written");
			response.json(customers);
		})

		// response.json(objectParsed.customers);
	});
});

app.post("/customers", function(request, response){

	var body = request.body;
	console.log(body);
	
	var pathToFile = "data/crm.json";
	fs.readFile(pathToFile, "utf8", function(error, data){
		console.log('File read !');
		console.log("Error: ", error);
		console.log("type: ", typeof data);
		// Je parse la string en objet Js
		var objectParsed = JSON.parse(data);
		var customers = objectParsed.customers;

	 if(body.id){

	 	if(_method == 'PUT'){
			for(var i=0; i<customers.length; i++){
				var customer = customers[i];
				if(customer.id == body.id){
					customers[i] = body;
				}
			}
	 		
	 	}else if (_methode == "DELETE"){
	 		... for ...
	 			customers = customers.slice(i,1);
	 		...
	 	}

		}else{
			customer.push(body);
		}

		var newGlobalObject = {
			customers : customers
		};
		// Stringifier
		var newGlobalObjectString = JSON.stringify(newGlobalObject);
		fs.writeFile(pathToFile, newGlobalObjectString, function(err){
			console.log("File written");
			response.json(customers);
		});
	});
});

app.listen(4533, function(request, response){
	console.log("L'application a démarré !");
})



