
# Asynchronous

## Promise

### Syntax
```javascript:
//Anonymous function
const promise = new Promise(function(resolve,reject){});

//Arrow function
const promise = new Promise((resolve, reject) => {});
```

### Sample 1

Promise creation
```javascript:
let myPromise = new Promise(function(myResolve, myReject) {
  let x = 0;

  // The producing code (this may take some time)

  if (x == 0) {
    myResolve("OK");
  } else {
    myReject("Error");
  }
});
```
Using the promise
```javascript:
myPromise.then(
  function(value) {
     myDisplayer(value);
  },
  function(error) {
     myDisplayer(error);
  }
);
```
the ```.then``` property of ```myPromise``` has 2 parameter and accepts two arguments. Both parameters accepts 2 function argument. In the example above the first function is when the promise is resolved and second one is when the promise is rejected. The ```value``` parameter in the first function argument of ```.then``` is the argument passed in the ```myResolve``` function which is "Ok". The ```error``` parameter in the second function of ```.then``` contains the argument passed in the myReject function which is "Error".

### Sample 2

```javascript:
somePromiseCreatingCode()
    .then(firstResult => {
        return 'done with first promise';
    })
    .catch(err => {
        // would handle any errors thrown before
        // implicitly returns a new promise - just like then()
    })
    .finally(() => {
        // the promise is settled now - finally() will NOT return a new promise!
        // you can do final cleanup work here
    });
```
```.catch``` is used if you don't have the second function argument in the ```.then```.  Read this useful article: [Promises then vs Promise then-catch](https://dmitripavlutin.com/javascript-promises-then-vs-then-catch/).

When you have another ```then()``` block after a ```catch()``` or ```then()``` block, the promise re-enters ```PENDING``` mode (keep in mind: ```then()``` and ```catch()``` always return a new promise - either not resolving to anything or resolving to what you return inside of ```then()```). Only if there are no more ```then()``` blocks left, it enters a new, final mode: ```SETTLED```.

Once ```SETTLED```, you can use a special block - ```finally()``` - to do final cleanup work. ```finally()``` is reached no matter if you resolved or rejected before.

### Sample 3

Promiser creating function
```javascript:
const myRequest = true;

function getRequest(request){
    return new Promise(function(resolve, reject){
        console.log('Making a request');
        if(request){
            resolve('Status code 200');
        }
        else{
            reject('Status code 404');
        }
    });
}
```

Using the returned promise
```javascript:
getRequest(myRequest).then(function(successMessage){
    console.log('Success: ' + successMessage);
}).catch(function(errorMessage){
    console.log('Error: ' + errorMessage);
});
```

In the example above if the ```myRequest``` is true the ```.then``` will trigger else if the ```myRequest``` value is false the ```catch``` will get the error.

## Async/Await

### Sample 1

The code above could be converted into an ```async/await``` function. The only difference is that we ommit the ```then``` keyword and in order to ```catch``` the error we need to use ```Try-catch```.
```javascript:
const myRequest = false;

function getRequest(request){
    return new Promise(function(resolve, reject){
        console.log('Making a request');
        if(request){
            resolve('Status code 200');
        }
        else{
            reject('Status code 404');
        }
    });
}
```

Implementing ```Async/Await```
```javascript:
async function makeRequest(request){
    try{
        const message = await getRequest(request);
        console.log('Success: ' + message);
    }
    catch(error){
        console.log('Error: ' + error);
    }
}

makeRequest(myRequest);
```

### Promise race
Promise race returns the fastest promise to be resolved. It takes an array as an argument which contains promise.

```javascript:
const myRequest = true;
```

```javascript:
function getRequest(request){
    return new Promise(function(resolve, reject){
        console.log('Making a get request');
        if(request){
            resolve('Get Request: Status code 200');
        }
        else{
            reject('Get Request: Status code 404');
        }
    });
}
```

```javascript:
function postRequest(request){
    return new Promise(function(resolve, reject){
        console.log('Making a post request');
        if(request){
            resolve('Post Request: Status code 201');
        }
        else{
            reject('Post Request: Status code 404');
        }
    });
}
```

```javascript:
Promise.race([
    getRequest(myRequest),
    postRequest(myRequest)
]).then(function(successMessage){
    console.log(successMessage);
}).catch(function(errorMessage){
    console.log(errorMessage);
});
```

In the example above ```getRequest``` promise will be resolved first so the console will log the following:
```
Making a get request
Making a post request
Get Request: Status code 200
```
If the ```myRequest``` constant is set to false 
```getRequest``` will still be the first promise to be ```rejected```. The following output will be logged in the console:
```
Making a get request
Making a post request
Get Request: Status code 404
```
If we add a setTimeOut inside the getRequest function:
```javascript:
function getRequest(request){
    return new Promise(function(resolve, reject){
        setTimeout(function(){
            console.log('Making a get request');
            if(request){
                resolve('Get Request: Status code 200');
            }
            else{
                reject('Get Request: Status code 404');
            }
        },2000);
    });
}
```
The post request is then resolved first and the following output will be logged in the console:
```
Making a post request
Post Request: Status code 404
Making a get request
```
### Promise all
Promise all takes an array of promise and waits for all promise to be resolved or settled and then returns the resolved or  rejected message in an array.

```javascript:
const myRequest = true;
```
```javascript:
function getRequest(request){
    return new Promise(function(resolve, reject){
        console.log('Making a get request');
        if(request){
            resolve('Get Request: Status code 200');
        }
        else{
            reject('Get Request: Status code 404');
        }
    });
}
```
```javascript:
function postRequest(request){
    return new Promise(function(resolve, reject){
        console.log('Making a post request');
        if(request){
            resolve('Post Request: Status code 201');
        }
        else{
            reject('Post Request: Status code 404');
        }
    });
}
```
```javascript:
Promise.all([
    getRequest(myRequest),
    postRequest(myRequest)
]).then(function(successMessage){
    console.log(successMessage);
}).catch(function(errorMessage){
    console.log(errorMessage);
});
```
The code above will output the following:
```
Making a get request
Making a post request
['Get Request: Status code 200', 'Post Request: Status code 201']
```
Even if we add a ```setTimeOut``` again in ```getRequest```:
```javascript:
function getRequest(request){
    return new Promise(function(resolve, reject){
        setTimeout(function(){
            console.log('Making a get request');
            if(request){
                resolve('Get Request: Status code 200');
            }
            else{
                reject('Get Request: Status code 404');
            }
        },2000);
    });
}
```

```Promise.all``` will wait for every promise passed in the array as an argument to be resolved or rejected before returning the message:
```
Making a post request
Making a get request
['Get Request: Status code 200', 'Post Request: Status code 201']
```

In ```Promise.all``` if 1 promise is rejected it will only return the rejected promise. for example in the code bellow the ```getRequest``` argument is set to false.

```javascript:
Promise.all([
    getRequest(false),
    postRequest(myRequest)
]).then(function(successMessage){
    console.log(successMessage);
}).catch(function(errorMessage){
    console.log(errorMessage);
});
```
The only promise returend in ```getRequest```:
```
Making a post request
Making a get request
Get Request: Status code 404
```

Another Static function in Promise class is ```Promise.allSettled([])``` which takes an array as an argument. It returns an object for all promise which has 2 property. The value passed in the resolved or rejected function and the status property that has a string value that says "fulfilled" if the promise is resolved or "rejected" if rejected.