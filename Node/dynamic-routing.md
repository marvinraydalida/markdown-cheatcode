# Dynamic Routes

## Extracting Dynamic Parameters
```javascript
router.get('/products/:paramName', controllerName.controllerFN);
```
Tells to look for certain `URL` parameter. 

**Controller**
```javascript
exports.controllerFN= (req, res, next) => {
  const param = req.params.paramName;
  console.log(param );
}
```

You can access the `URL` parameter by using the `req.params.paramName`. The parameter name is the same you set in the `router`.

## Passing data with POST request
```javascript
router.post('/products', controllerName.controllerFN);
```
```javascript
exports.controllerFN= (req, res, next) => {
  const param = req.body.inputName;
  console.log(param);
}
```
```html
<form action="/products" method="POST">
	<button type="submit" class="btn">Submit</button>
	<input type="hidden" name="inputName" value="<%= product.id %>">
</form>
```

The `inputName` in `req.body.inputName` is the `name` set in the `input-hidden`.

## Query parameters
```
localhost:3000/products/1?queryName=true
```
**Router**
```javascript
router.get('/products/:paramName', controllerName.controllerFN);
```
**Controller**
```javascript
exports.controllerFN= (req, res, next) => {
  const param = req.query.queryName;
  console.log(param);
}
```
**Output**
```
true
```
Query parameter is built in in `express`.