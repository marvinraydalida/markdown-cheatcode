# Express JS

## Installation

`npm install --save express`

## Import
```javascript
const  express = require('express');

const  app = express();
app.listen(3000);
```

## Adding Middleware 
```javascript
const  express = require('express');

const  app = express();

app.use((req, res, next) => {
	console.log("First middleware...");
});

app.use((req, res, next) => {
	console.log("Second middleware...");
});

app.listen(3000);
```
The above code will only trigger the first `middleware` but will not go to the second one. In order to use the second middleware we must utilize the function `next` argument to call in the second `middleware`.

```javascript
//First middleware
app.use((req, res, next) => {
	console.log("First middleware...");
	next();
});

app.use((req, res, next) => {
	console.log("Second middleware...");
});
```
Console Output:
```
First middleware...
Second middleware...
```
This time it will jump to the next `middleware`. `next()` allows the request to continue to the next `middleware`.

## Sending response

```javascript
app.use((req, res, next) => {
	res.send("<h1>Hello from express!</h1>");
});
```

## Routes

```javascript
app.use('/another-route',(req, res, next) => {
	res.send("<h1>Hello from another route!</h1>");
});

app.use('/',(req, res, next) => {
	res.send("<h1>Hello from express!</h1>");
});
```

**NOTE:** Route `'/'` must always be always after other `middleware` because if it is the first `middleware` it will always run as every other `middleware` has `'/'` in their route e.g. `'/another-route'`.

## Parsing Incoming Request
**OPTION 1:**
Install body parser:

    npm install --save body-parser

```javascript
const  express = require('express');
const  bodyParser = require('body-parser');

const  app = express();

//Body parser middleware
app.use(bodyParser.urlencoded({extended:  false}));

app.use('/another-route',(req, res, next) => {
	res.send("<form action='/product' method='POST'><input type='text' name='title'><button type='submit'>Submit</button></form>");
});

app.use('/product',(req, res, next) => {
	console.log(req.body);
	res.redirect('/');
});

app.use('/',(req, res, next) => {
	res.send("<h1>Hello from express!</h1>");
});

app.listen(3000);
```
Before the `body-parser middleware` jumps to the next `middleware` it first parses the request body. The `bodyParser` has a `next()` inside of it so after it parses the body it will look for the `route`.

**OPTION 2:**
Using `express` body parser:
```javascript
app.use(express.urlencoded({extended:  false}));
```

## Request Middleware
**POST**
```javascript
app.post((req, res, next)=>{});
```
**GET**
```javascript
app.get((req, res, next)=>{});
```

## Express Router

Create a folder called `routes` and inside of it create a `JavaScript` file:

**test.js**
```javascript
const express = require('express');
const router = express.Router();

router.get('/another-route',(req, res, next) => {
	res.send("<form action='/product' method='POST'><input type='text' name='title'><button type='submit'>Submit</button></form>");
});

router.post('/product',(req, res, next) => {
	console.log(req.body);
	res.redirect('/');
});

module.exports = router;
```

**app.js**

```javascript
const  express = require('express');
const  bodyParser = require('body-parser');

const  testRoutes = require('./routes/test');
const  app = express();

app.use(bodyParser.urlencoded({extended:  false}));

//Use the testRoutes
app.use(testRoutes);

app.use('/',(req, res, next) => {
	res.send("<h1>Hello from express!</h1>");
});

app.listen(3000);
```

**NOTE:** Route order is still important!

## 	ERROR

```javascript
const  express = require('express');
const  bodyParser = require('body-parser');

const  testRoutes = require('./routes/test');
const  app = express();

app.use(bodyParser.urlencoded({extended:  false}));

app.use(testRoutes);

app.get('/',(req, res, next) => {
	res.send("<h1>Hello from express!</h1>");
});

app.use((req, res, next) => {
	res.status(404).send("<h1>PAGE NOT FOUND!</h1>");
});

app.listen(3000);
```

**NOTE:** If route `'/'` method is `use` it will go to that and will not reach the `error middleware`. Use `get` instead.

## Filter path

**app.js**
```javascript
app.use('/admin',testRoutes);
```
Now the `/another-route` route inside of the `test.js` can be accessed thru `/admin/another-route`.

## Creating HTML Page

Create a `views` folder.

**another-route.html**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <form action='/product' method='POST'>
        <input type='text' name='title'>
        <button type='submit'>Submit</button>
    </form>
</body>
</html>
```

**test.js**
```javascript
const express = require('express');
const path = require('path');

const router = express.Router();

router.get('/another-route',(req, res, next) => {
	res.sendFile(path.join(__dirname, '../','views', 'another-route.html'));
});

module.exports = router;
```

The `__dirname` is the absolute path to the current file it is called. To go to other sibling folder you can change the directory by adding `'../'`.

## Serving Static Files

Used to serve files such as `css` and image files.

**app.js**
```javascript
app.use(express.static(path.join(__dirname,'assets')));
```
Now with the directory:
```treeview
├── app.js
├── assets
│   └── css
│		└── styles.css
```

Now we can get the `css` file:

**styles.css**
```css
<link rel="stylesheet" href="/css/styles.css"/>
```

**NOTE:** Must be the first in `middleware` order.