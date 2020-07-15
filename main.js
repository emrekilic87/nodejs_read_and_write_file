var http = require("http");
const hostname = "localhost";
const port = 3000;

var fs = require("fs");
const personData = require("./person.json");

var server = http.createServer(function (req, res) {
	switch (req.url) {
		case "/updateData":
			let newPerson = {
				name: "CCCC",
				age: 27,
				gender: "FM",
			};

			personData.push(newPerson);

			let data = JSON.stringify(personData, null, 2);
			console.log(data);
			fs.writeFile("./person.json", data, (err) => {
				if (err) throw err;
				console.log("Data wrote to file");
			});
			break;

		case "/writeHTML":
			function personTemplate(person) {
				return `
					<div class="person">
						<p>${person.name}</p>
						<p>${person.age }</p>
						<p>${person.gender}</p>
					</div>
			    `;
			}
			let writeHtml = `
			<!DOCTYPE html>
				<html lang="en">
				<head>
					<meta charset="UTF-8">
					<meta name="viewport" content="width=device-width, initial-scale=1.0">
					<title>writing html</title>
				</head>
				<body>
				<h1 class="title">Person</h1>
				  ${personData.map(personTemplate).join("")}	
				</body>
				</html>
			`;

			fs.writeFile("write.html", writeHtml, function (err) {
				if (err) throw err;
				console.log("Saved!");
			});
			break;

		default:
			fs.readFile("./person.json", (err, data) => {
				if (err) throw err;
				let person = JSON.parse(data);
				console.log(person);
			});
	}
});

server.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});