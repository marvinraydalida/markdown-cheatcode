#  Basics
## Creating a Node Server
create a JavaScript file: `app.js`.
```javascript
const http = require('http');

const server = http.createServer((request,response) => {
	console.log(request);
});

server.listen(3000);
```
Run the server with the following command:
```
node app.js
```
The `3000` in `server.listen()` is the port number of the server. It also takes a second parameter which is the `host` name. This time `host` name is not necessary because we're just using `localhost`.

## Sending Response
```javascript
const server = http.createServer((request,response) => {
	response.setHeader('Content-Type','text/html');
	response.write('<html>');
	response.write('<head><title>Test</title></head>');
	response.write('<body><h1>Hello World!</h1></body>');
	response.write('</html>');
	response.end();
});
```
Once `response.end` is called you cannot send a response anymore.

## Routing
```javascript
const server = http.createServer((request,response) => {
	const url = request.url;
	if(url === '/'){
		response.setHeader('Content-Type','text/html');
		response.write('<html>');
		response.write('<head><title>Test</title></head>');
		response.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Submit</button></form></body>');
		response.write('</html>');
		return response.end();
	}
	response.setHeader('Content-Type','text/html');
	response.write('<html>');
	response.write('<head><title>Test</title></head>');
	response.write('<body><h1>Hello World!</h1></body>');
	response.write('</html>');
	response.end();
});
```
Notice the `return` in `response.end` inside the if statement. It makes sure that when the response is ended It should not write another response again.

## Redirecting
```javascript
const server = http.createServer((request,response) => {
	const url = request.url;
	const method = request.method;
	if(url === '/'){
		response.setHeader('Content-Type','text/html');
		response.write('<html>');
		response.write('<head><title>Test</title></head>');
		response.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Submit</button></form></body>');
		response.write('</html>');
		return response.end();
	}
	if(url === "/message" && method === "POST"){
		response.statusCode = 302;
		response.setHeader('Location','/');
		return response.end();
	}
	response.setHeader('Content-Type','text/html');
	response.write('<html>');
	response.write('<head><title>Test</title></head>');
	response.write('<body><h1>Hello World!</h1></body>');
	response.write('</html>');
	response.end();
});
```
Now the second if statement redirects back to route `/` after submitting the form.

## Parsing Request Body

Inside the callback function of `server`.
```javascript
if(url ===  "/message"  && method ===  "POST"){ 
	const body = [];
	
	request.on('data', (chunk) => {
		console.log(chunk);
		body.push(chunk);
	});
	
	request.on('end', () => {
		const parsedBody = Buffer.concat(body).toString();
		console.log(parsedBody );
	});
	
	response.statusCode =  302; 
	response.setHeader('Location','/');  return 
	response.end();  
}
```
Console Output:
```
<Buffer 6d 65 73 73 61 67 65 3d 73 61 6d 70 6c 65>
message=sample
```

## Creating separate Route file

Our routes will be contained inside the `routes.js` file.

Inside `app.js`:
```javascript
const  http = require('http');
const  routes = require('./routes');

const  server = http.createServer(routes);

server.listen(3000);
```

Inside `routes.js`:
```javascript
const requestHandler = (request, response) => {
	const url = request.url;  
	const method = request.method;  if(url ===  '/'){ 
	response.setHeader('Content-Type','text/html'); 
	response.write('<html>'); 
	response.write('<head><title>Test</title></head>'); 
	response.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Submit</button></form></body>'); 
	response.write('</html>');  return response.end();  }  
	if(url ===  "/message"  && method ===  "POST"){ 
		response.statusCode =  302; 
		response.setHeader('Location','/');  return 
		response.end();  
	} 
	response.setHeader('Content-Type','text/html'); 
	response.write('<html>'); 
	response.write('<head><title>Test</title></head>'); 
	response.write('<body><h1>Hello World!</h1></body>'); 
	response.write('</html>'); response.end();
}

module.exports = requestHandler;
```
## Module

Inside `sample.js`:
```javascript
function someFunc(){
	console.log('Doing some stuff...');
}
```
**Export sample 1**:
```javascript
module.exports = someFunc;
```
Require to`app.js`:
```javascript
const sample =  require('./sample');
sample();
```
**Export sample 2**:
```javascript
module.exports = {
	fn: someFunc,
	someText: "Some text"
};
```
Require to`app.js`:
```javascript
const sample =  require('./sample');
sample.myFunc();
console.log(sample.someText);
```

**Export sample 2**:
```javascript
module.exports.fn = someFunc;
module.exports.someText= "Some text";
```
Require to`app.js`:
```javascript
const sample =  require('./sample');
sample.myFunc();
console.log(sample.someText);
```