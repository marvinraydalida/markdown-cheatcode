
# MVC

## Folder structure
```markdown
├── src
│	├── app.js
│	├── controllers
│	│	├── manage.js
│	├── model
│	│	├── books.js
│	├── routes
│	│	├── admin.js
│	│	├── home.js
│	├── views
│	│	├── includes
│	│	│	├── head.ejs
│	│	│	├── nav.ejs
│	│	├── 404.ejs
│	│	├── admin.ejs
│	│	├── home.ejs
│	├── assets
│	│	├── css
│	│	│	├── styles.css
```

## Controllers

**manage.js**
```javascript
//Import books model
const booksModel = require('../model/books');

exports.getBooks = (req, res) => {
    res.render('home',{title: 'Home', books: booksModel.fetchBook()});
}

exports.manageBooks = (req, res) => {
    res.render('admin',{title: 'Admin Manage'});
}

exports.addBook = (req, res) => {
    booksModel.addBook(req.body);
    res.redirect('/');
}
```

## Model

**books.js**
```javascript
const books = [
    { title: 'superbook', topic: 'religion' },
    { title: 'node', topic: 'programming' }
];

exports.fetchBook = () => {
    return books;
}

exports.addBook = (book) => {
    books.push(book);
}
```

## Routes

**admin.js**
```javascript
const express = require('express');

//Import controller
const manageController = require('../controllers/manage');

const router = express.Router();

router.get('/manage',manageController.manageBooks);

router.post('/add',manageController.addBook);

module.exports = router;
```
**home.js**
```javascript
const express = require('express');

//Import controller
const manageController = require('../controllers/manage');

//Set router
const router = express.Router();

router.get('/',manageController.getBooks);

module.exports = router;
```

## Views

**/includes/head.ejs**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><%= title %></title>
    <link rel="stylesheet" href="/css/styles.css">
</head>
```

**/includes/nav.ejs**
```html
<nav>
    <a href="/">Home</a>
    <a href="/admin/manage">Manage</a>
</nav>
```

**404.ejs**
```html
<%- include('includes/head') %>

<body>
    <%- include('includes/nav') %>
    <h1>Looks like this page is not found :(</h1>
</body>
</html>
```

**admin.ejs**
```html
<%- include('includes/head') %>

<body>
    <%- include('includes/nav') %>
    <h1>Add book here</h1>
    <form action="/admin/add" method="POST">
        <input type="text" name="title">
        <input type="text" name="topic">
        <button type="submit">Add book</button>
    </form>
    
</body>
</html>
```

**admin.ejs**
```html
<%- include('includes/head') %>

<body>
    <%- include('includes/nav') %>
    <h1>Add book here</h1>
    <form action="/admin/add" method="POST">
        <input type="text" name="title">
        <input type="text" name="topic">
        <button type="submit">Add book</button>
    </form>
    
</body>
</html>
```

**home.ejs**
```html
<%- include('includes/head') %>

<body>
    <%- include('includes/nav') %>
    <h1>Welcome buddy :)</h1>
    <ul>
        <% if(books.length > 0){ %>
            <% books.forEach(book => { %>
                <li>Title: <%= book.title %> Topic: <%= book.topic %></li>
            <% }) %>
        <% }else{ %>

        <% } %>
    </ul>
</body>
</html>
```

## Main app

**app.js**
```javascript
const express = require('express');
const path = require('path');

const app = express();

//Import routers
const  home = require('./routes/home');
const  admin = require('./routes/admin');

//Set template engine
app.set('view engine', 'ejs');
app.set('views', 'views');

//Set body-parser
app.use(express.urlencoded({ extended: false }));

//Get assets static files
app.use(express.static(path.join(__dirname,'assets')));

//Set routes
app.use(home);
app.use('/admin',admin);

//Set 404 error
app.use((req, res) => {
    res.status(404).render('404', { title: "Not Found!" });
});

app.listen(3000);
```
