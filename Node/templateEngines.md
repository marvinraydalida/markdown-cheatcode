

# Dynamic Content

## Templating Engines
Templating Engines allows you to insert data into `HTML` placeholder and then produces final `HTML`.

**EJS**
```
npm install --save ejs
```

**Pug**
```
npm install --save pug
```

**Handlebars**
```
npm install --save express-handlebars
```

**Sharing data**

```javascript
//After calling express()
app.set('view engine','ejs');
app.set('views', 'views');
```
The first `set` tells express on how to compile dynamic engine and the second `set` tells where to find the `views` which is the first parameter, the second parameter is the folder name.

**Rendering**
```javascript
res.render('viewName',{title: "some title", age: 4});
```

**EJS**

```html
<h1><%= title %></h1>
```

**EJS If-else statement**
```html
<ul>
	Products
	<% if(prods.length > 0){ %>
		<% prods.forEach(prod => { %>
			<li>
				<%= prod.title %>
            </li>
        <% }) %>    
        <% } else { %>
            <h1>No product available</h1>
    <% } %>
</ul>
```
You can also use `for-of` loop. In the example above `prods` is an array containing `objects` e.g.
```javascript
{
	title: "new product"
}
```
which is a request body.

## EJS Partial layout

It is used to divide content of views. It is also good for code reusability across different `views`. Inside the `views` folder create another folder called `includes`. 

**heads.ejs**
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>
        <%= title %>
    </title>
</head>
```

**another-route.ejs**
```html
<%- include('includes/head.ejs') %>

<body>
    <form action='/admin/product' method='POST'>
        <input type='text' name='title'>
        <button type='submit'>Submit</button>
    </form>
</body>
</html>
```

The `another-route.ejs` can be found in the `views` folder, which includes the `head.ejs` this way the header can now be reused in different `views` file.

## Passing data into include
```javascript
<%- include('includes/head.ejs', {data, data}) %>
```
If an include is within a `for-loop` and the include requires a data passed to the `current` view the `includes` view won't be able to access it. Therefore, we need to pass the necessary data in the second parameter as an object with `key-value` pair.