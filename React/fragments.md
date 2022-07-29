# Fragments, Portals & Ref

The avoid unnecessary `div` wrapping like:

```javascript
return (
	<div>
		<SomeCustomComponent/>
		<OtherCustomComponent/>
	</div>
);
``` 

You could just create a new component, which we will call `Wrapper` and just return its children:

```javascript
const wrapper = props => {
	return props.children;
}
```
Now we have a `Wrapper` element and at the same time not create a `div` element in the `DOM`.

```javascript
return (
	<Wrapper>
		<SomeCustomComponent/>
		<OtherCustomComponent/>
	</Wrapper>
);
``` 

But `React` address this problem already with `Fragments` and `<></>`.

## Fragments

Just wrap the adjacent elements with empty tags:

```javascript
return (
	<>
		<SomeCustomComponent/>
		<OtherCustomComponent/>
	</>
);
``` 

**OR**

```javascript
return (
	<React.Fragment>
		<SomeCustomComponent/>
		<OtherCustomComponent/>
	</React.Fragment>
);
``` 

By importing `Fragment` itself:
```javascript
import React, {Fragment} from 'react';
```

```javascript
return (
	<Fragment>
		<SomeCustomComponent/>
		<OtherCustomComponent/>
	</Fragment>
);
``` 

## Portals

Let's say we have the following `component`:

```javascript
return (
	<Fragment>
		<ModalComponent/>
		<SomeCustomComponent/>
	</Fragment>
);
``` 
And let's say once it is rendered the `DOM` looks like this:

```html
<body>
	<header>
		<h1>Some text</h1>
	</header>
	<section>
		<div class="modal">
			<!-- Some code -->
		</div>
		<div class="some-custom-component">
			<!-- Some code -->
		</div>
	</section>
</body>
```

As you can see our modal is within the `section` tag. However, we know that our modal should be above all elements. It would be reasonable for our `DOM` to look like this:

```html
<body>
	<div class="modal">
		<!-- Some code -->
	</div>
	<header>
		<h1>Some text</h1>
	</header>
	<section>
		<div class="some-custom-component">
			<!-- Some code -->
		</div>
	</section>
</body>
```

With `Portals` it is possible to move it to different position even though we have returned it adjacent to some component.

To do that we must first go to our `index.html` file inside the `public` folder and you'll see this:
```html
<body>
	<noscript>You need to enable javascript to run this app</noscript>
	<div id="root"></div>
</body>
```

And inside of it we place another `div` where we want our `modal` to be portalled:
```html
<body>
	<noscript>You need to enable javascript to run this app</noscript>
	<div id="portal-here"></div>
	<div id="root"></div>
</body>
```

Then go back to the `component` file and import `ReactDOM`:
```javascript
import ReactDOM from 'react-dom';
```

Now in our `component` we pass the `JSX`, and it is important that it is a `JSX` we can't pass nested elements in there:
```javascript
return (
	<Fragment>
		{ReactDOM.createPortal(<ModalComponent/>, document.getElementById("portal-here"))}
		<SomeCustomComponent/>
	</Fragment>
);
``` 
Now it is positioned in our desired place when it is rendered to the `DOM`.

**NOTE:** If the `JSX` has event listeners like `onClick` include it too. If you want to pass a nested element you can just simply create a `JSX` in the same file and pass it in.

## Refs

Use ref is used to reference elements and access values:

```javascript
import React, {useRef} from 'react';

const SomeComponent = props => {
	const inputRef = useRef();
	
	const clickHandler = event => {
		console.log(inputRef.current.value):
	}
	
	return(
		<>
			<input type="text" ref={inputRef}/>
			<button onClick={clickHandler}>Submit</button>
		</>
	);
}

export default SomeComponent;
```

Once clicked the console will log the value of the referenced element, in our case the value of the input text.

[**FORWARDING REF**](https://reactjs.org/docs/forwarding-refs.html) - Refs won't work in a component just it will just work in an `HTML` element.