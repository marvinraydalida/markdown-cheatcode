# Array

## Array destructuring

Code snippet:
```javascript:
const arr = [0, 1, 2, 3, 4, 5];
const [firstIndex, secondIndex, ...theRest] = arr;

console.log(firstIndex);	
console.log(secondIndex);	
console.log(theRest);		

//0
//1
//[2, 3, 4]
```
## For Each
```javascript:
const array1 = ['a', 'b', 'c'];
array1.forEach(element => console.log(element));

// expected output: "a"
// expected output: "b"
// expected output: "c"
```

### Syntax
```javascript:
someArray.forEach(function(element, index, array){
	//Code here...
}, thisArg);
```

### Parameters
```CallbackFN``` - The callback function.
- ```element``` - The current element.
- ```index``` - The index of current element.
- ```array``` - The array that called forEach.
	
```thisArg (optional)``` - Value to use as ```this``` when calling the callback function.