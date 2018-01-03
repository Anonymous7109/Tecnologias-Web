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
	// CORS
	response.setHeader('Access-Control-Allow-Origin', '*');
	response.setHeader('Access-Control-Request-Method', '*');
	response.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, PUT');
	response.setHeader('Access-Control-Allow-Headers', '*');

	var flag = false;
	console.log("server runing\n");
	var relativeUrl = url.parse(request.url, true);
	var pathname = relativeUrl.pathname;
	var query = relativeUrl.query;

	response.writeHead(200, {'Content-Type': 'text/plain'});

	switch(pathname){
		case "/register": 
			if(request.method == "POST"){
				var body = "";
				request.on("data", function(data){ console.log("data: "+data); body += data; }); 
				request.on("end", function () { 
				try { query = JSON.parse(body); register(query, response, request) /* processar query */ } 
				catch(err) { /* erros de JSON */ } 
				}) 
				request.on("error", (err) => { console.log(err.message); }); 
			}
			break;
		default:
			response.writeHead(400);
			break;
	}
	console.log("2");
	//response.end();
	//response.write(JSON.stringify({}));
	if(flag == true) response.end();
});

server.listen(8049);

//function GetRequest(request, response){}

function register(query, response, request){
	console.log("query:\n");
	console.log(query);
	fs.readFile("dados.json",function(err, data){
		if(!err){ 
			var obj = JSON.parse(content);
			for(var i in obj){
				if(query.nick == obj[i].name){
					if(query.pass == obj[i].pass) response.write('{}');
					else response.write('{ "error": "User registered with a different password"}');
				}
				else{
					var obj2 = {"nick": "" + query.nick + "" , "pass": "" + query.pass + ""};
					fs.writeFile("dados.json", JSON.stringify(obj2), (err) => {if(err) throw err; });
				}
			}
		}
	});
	console.log("1");
}