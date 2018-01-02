var http = require('http');
var url = require('url');
var path = require('path');
var fs = require("fs");

var content = fs.readFileSync('dados.json', 'utf8');

module.exports.documentRoot = "/home/andre/Desktop/NIM/node.js"; 
module.exports.defaultIndex = "index.html"; 
module.exports.port = 8049; 
module.exports.mediaTypes = { "txt": "text/plain", "html": "text/html", "css": "text/css", "js": "application/javascript", "png": "image/png", "jpeg": "image/jpeg", "jpg": "image/jpeg", }

var server = http.createServer(function (request, response){
	console.log("server runing\n");
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
	//response.writeHead(200, {'Content-Type': 'text/plain'});
	//response.write(JSON.stringify({}));
});

server.listen(8049);

function register(body, response){
	//var jason_object = JSON.parse(body);
	//response.write(jason_object.nick);
	//response.write(jason_object.pass);
	var nick = "mac";
	response.write("register\n");
	fs.readFile("dados.json",function(err, data){
		if(!err){ // processar data como string
			var obj = JSON.parse(content);
			for(var i in obj){
			console.log(obj[i].name);
			if(obj[i].name == nick){ console.log("pass: " + obj[i].pass); break; } 
			}
		}
		response.end("end\n");
	});
}