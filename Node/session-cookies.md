# Session & Cookies

## Cookies

```javascript
res.setHeader('Set-Cookie', 'keyName=valueName');
```
Expires in 10 seconds:
```javascript
res.setHeader('Set-Cookie', 'keyName=valueName; Max-Age=10');
```

```javascript
res.setHeader('Set-Cookie', 'keyName=valueName; HttpOnly');
```

## Session

Session data is stored in the server and the session id is stored in the clients cookie.

**Install express-session**

```
npm install --save express-session
```

**app.js**
```javascript
const session = require('express-session');

//CREATE MIDDLEWARE after body parser or static 
app.use(session(
	{
		secret: 'some string', 
		resave: false,
		saveUninitialized: false 
	}
));
```

Secret is used for signing the hash. Resave on the other hand is set to false so every request and response session is not saved, it is only saved when session is changed. The third property is set to false to make sure that no session is saved for a request  where it doesn't need to be changed because nothing was changed.

**Some controller**
```javascript
exports.login = (req, res) => {
	req.session.isLoggedIn = true;
	res.redirect('/');
}
```

Will create a session and send a session id cookie to the client.

**Saving Session**

```javascript
req.session.details = "some details";
req.session.save((error) => {
	//some code to execute example here is redirect
	res.redirect('/');
});
```
To make sure that session is properly saved before doing some action.

**Destroying session**
```javascript
req.session.destroy(() => {
	//some code to execute example here is redirect
	res.redirect('/');
});
```

## MongoDB to store session

Install the package
```
npm install --save connect-mongodb-session
```

**app.js**
```javascript
const session = require('express-session');
const MongoDbStore = require('connect-mongodb-session')(session);

const app = express();

const store = new MongoDbStore({
	uri: 'mongodb://localhost:27017/mysnapshots',
	collection: 'session',
});

//CREATE MIDDLEWARE after body parser or static 
app.use(session(
	{
		secret: 'some string', 
		resave: false,
		saveUninitialized: false,
		store: store 
	}
));
```

After that you can now see your session in a mongoDb collection.