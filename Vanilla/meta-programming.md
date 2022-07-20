# Meta-Programming

## Symbol
**`Symbol`** is a built-in object whose constructor returns a `symbol`  [primitive](https://developer.mozilla.org/en-US/docs/Glossary/Primitive) — also called a **Symbol value** or just a **Symbol** — that's guaranteed to be unique.
```javascript:
const sym1 = Symbol();
const sym2 = Symbol('foo');
const sym3 = Symbol('foo');
```
```javascript:
Symbol('foo') === Symbol('foo')  // false
```
The following syntax with the [`new`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new) operator will throw a [`TypeError`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypeError):

```javascript:
const sym = new Symbol();  // TypeError
```

## Generator

```javascript
const company = {
	employees = ['emp1', 'emp2', 'emp3'],
	[Symbol.iterator]: function* employeeGenerator(){
		let currentEmployee = 0;
		while(currentEmployee < this,employees.length()){
			yield this.employees[currentEmployee ];
			currentEmployee++;
		}
	}
};
```
Now we can iterate through the object with the use of generator `function*`.
```javascript
for(const employee of company){
	console.log(employeee);
}
```
output:
```
emp1
emp2
emp3
```

## Reflect API
It helps us manage object.
```javascript
const someObj = {
	name: "object name"
}
```
```javascript
Reflect.defineProperty(someObj, lastName, {value: 'Dalida'});
console.log(someObj.lastName);
```
Output:
```
Dalida
```
### Deleting properties using Reflect API
```javascript
Reflect.deleteProperty(someObj, 'name');
```
## Proxy API
Wraps an object to create a Proxy object.
```javascript
const someObj = {
	name: "object name"
}
```
```javascript
const someObjHandler = {
	get(obj, propertyName){
		return obj[propertyName] || No such property!;
	}
}
```
```javascript
const proxyObject = new Proxy(someObj, someObjHandler);
console.log(proxyObject.name);
console.log(proxyObject.job);
```
Output:
```
object name
No such property!
```

### Proxy set trap
```javascript
const someObj = {
	name: "object name"
}
```
```javascript
const someObjHandler = {
	set(obj, propertyName, newValue){
		if(newValue < 0 && propertyName === 'age'){
			obj[propertyName] = 0;
			return;
		}
		obj[propertyName] = newValue;
	}
}
```
```javascript
const proxyObject = new Proxy(someObj, someObjHandler);
proxyObject.age = -1;
console.log(proxyObject.age);
```
Output:
```
0
```