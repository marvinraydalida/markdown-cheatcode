# HTTP

## Fetch

Create a fetch handler inside of the `component` and you can pass it on some events such as `onClick`.
```javascript
const [data, setData] = useState([]);

async function fetchDataHandler() {
    fetch("url")
        .then((response) => response.json())
        .then((data) => {
            //DO something here
            setData(data.someProperty);
        })
        .catch((error) => console.log(error));
}
```

## Async/Await

```javascript
const [data, setData] = useState([]);

async function fetchDataHandler() {
    try {
        const response = await fetch("url");
        const data = await response.json();
        setData(data.someProperty);
    } catch (error) {
        console.log(error);
    }
}
```
