var http = require('http');
var url = require('url');
var path = require('path');
var fs = require("fs");

var server = http.createServer(function (request, response){
	var relativeUrl = url.parse(request.url, true);
	var pathname = relativeUrl.pathname;
	var body = ""; 
	switch(request.method) { 
		case "POST": request 
			.on("data", (chunk) => { body += chunk; }) 
			.on("end", () => { try { query = JSON.parse(body); /* processar query */ } catch(err) { /* erros de JSON */ } }) 
			.on("error", (err) => { console.log(err.message); }); 
			break; 
	}

	switch(pathname){
		case "/register": register(body, response); break;
	}
	response.writeHead(200, {'Content-Type': 'text/plain'});
	//response.write(JSON.stringify({}));
	response.end("end\n");
});

server.listen(8008);

function register(body, response){
	var jason_object = JSON.parse(body);
	response.write(jason_object.nick);
	response.write(jason_object.pass);
}