# HTTP

## Fetch HTTP request

### Promise Fetch
```javascript:
fetch('https://jsonplaceholder.typicode.com/todos/1')
  .then(response => response.json())
  .then(json => console.log(json))
```
The response body is not accessible using the response so in order to get the response we need to use ```.json()``` which returns a promise then use ```.then()``` again and get the JSON data.

#### With error handling
```javascript:
fetch('https://jsonplaceholder.typicode.com/albums')
  .then(function(response){
      if(response.ok){
          return response.json();
      }
      else{
          console.log('Invalid URL or Server side error');
      }      
  }).catch(function(error){
      console.log(error + ' failed to send request');
  })
  .then(function(albums){
     console.log(albums); 
  });
```
###  Async/Await Fetch
```javascript:
async function getAlbum(){
    const response = await fetch('https://jsonplaceholder.typicode.com/todos');
    const json = await response.json();
    console.log(json);
}
getAlbum();
```

#### With error handling
```javascript:
async function getAlbum(){
    try{
        const response = await fetch('https://jsonplaceholder.typicode.com/todos');
        if(response.ok){
            const json = await response.json();
            console.log(json);
        }
        else{
            console.log('Invalid URL or Server side error');
        }
    }
    catch(error){
        console.log((error + ' failed to send request');
    }
}

getAlbum()
```
#### ```POST``` request
```javascript:
const album = {
    title: 'Some title'
};
```
```javascript:
fetch('https://jsonplaceholder.typicode.com/albums',{
    method: 'POST',
    body: JSON.stringify(album),
    headers: {
	'Content-Type': 'application/json',
    }
}).then(response => response.json())
  .then(json => console.log(json));
```

#### ```DELETE``` request
```javascript:
fetch('https://jsonplaceholder.typicode.com/albums/1',{
    method: 'DELETE',
    headers: {
	'Content-Type': 'application/json',
    }
}).then(response => response.json())
  .then(json => console.log(json))
```
Notice the 1 in the path meaning it only target 1 album.

#### Using ```Form``` data
```javascript:
const fd = new FormData();
fd.append('title', 'Some title');
```
```javascript:
fetch('https://jsonplaceholder.typicode.com/albums',{
    method: 'POST',
    body: fd
}).then(response => response.json())
  .then(json => console.log(json));
```


#### Passing data from HTML Form
```javascript:
const myForm = document.querySelector('form');
const fd = new FormData(myForm);
```
You can pass the form as a constructor parameter in ```FormData()```. Just make sure you have the name attribute in the input tags in the html form, and to make sure when submitting the form the website is not reloaded use the submit event listener and use ```event.preventDefault()```.


## JSON
### Converting JSON data into a valid JavaScript list/object
```javascript:
const listOfAlbums = JSON.parse(request.response);
console.log(listOfAlbums);
```
### Converting JavaScript object into JSON format
```javascript:
const person = { 
    name: 'Max',
    age: 30,
    hobbies: [
        { id: 'h1', title: 'Sports' },
        { id: 'h2', title: 'Cooking' }
    ],
    isInstructor: true
};
```
```javascript:
const jsonData = JSON.stringify(person); // convert raw JS data to JSON data string
console.log(jsonData); // a string with machine-readable JSON data in it
console.log(typeof jsonData); // string
```
## Response
You can create a new `Response` object using the [`Response()`](https://developer.mozilla.org/en-US/docs/Web/API/Response/Response "Response()") constructor, but you are more likely to encounter a `Response` object being returned as the result of another API operation—for example, a service worker [`FetchEvent.respondWith`](https://developer.mozilla.org/en-US/docs/Web/API/FetchEvent/respondWith), or a simple [`fetch()`](https://developer.mozilla.org/en-US/docs/Web/API/fetch).

### Properties
- ```Response.body``` - A [`ReadableStream`](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream) of the body contents.
- ```Response.headers``` - The [`Headers`](https://developer.mozilla.org/en-US/docs/Web/API/Headers) object associated with the response.
- ```Response.ok``` - A boolean indicating whether the response was successful (status in the range `200`–`299`) or not.
- ```Response.redirected``` - Indicates whether or not the response is the result of a redirect (that is, its URL list has more than one entry).
- ```Response.status``` - The status code of the response. (This will be `200` for a success).
- ```Response.statusText``` - The status message corresponding to the status code. (e.g., `OK` for `200`).

### Methods
- `Response.json()` - Returns a promise that resolves with the result of parsing the response body text as [`JSON`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON).

## Encode URI

The **`encodeURI()`** function encodes a [URI](https://developer.mozilla.org/en-US/docs/Glossary/URI) by replacing each instance of certain characters by one, two, three, or four escape sequences representing the [UTF-8](https://developer.mozilla.org/en-US/docs/Glossary/UTF-8) encoding of the character (will only be four escape sequences for characters composed of two "surrogate" characters).

```javascript:
const uri = 'https://mozilla.org/?x=шеллы';
const encoded = encodeURI(uri);
console.log(encoded);
// expected output: "https://mozilla.org/?x=%D1%88%D0%B5%D0%BB%D0%BB%D1%8B"
```