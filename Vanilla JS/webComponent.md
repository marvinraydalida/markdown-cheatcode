# Web Component

## Custom Element

```javascript
class CustomComponent extends HTMLElement{
	constructor(){
		super();
	}
}
```
Create component:
```javascript
customElements.define('c-component',CustomComponent);
```
The first argument is the `tag-name` and the second argument is the class. Take note that the naming of custom element should be separated by a `-` so that you are not overwriting other elements.

### Creating a custom Tooltip Element
`Class`
```javascript
class Tooltip extends HTMLElement{
	constructor(){
		super();
	}
	//Fires when custom element is added to the DOM.
	connectedCallback(){
		const tooltipIcon = document.createElement('span');
		tooltipIcon.textContent = '(?)';
		this.appendChild(tooltipIcon);
	}
}
```
The `this` refers to the custom element in we created in the `DOM`.
```javascript
customElements.define('c-tooltip',Tooltip );
```
`HTML`
```html
<c-tooltip>This is the tooltip</c-tooltip>
```
`Output`
```
(?)This is the tooltip
```

### Adding event listener to the Tooltip
```javascript
class Tooltip extends HTMLElement{
	constructor(){
		super();
		this._tooltipContainer;
	}
	
	connectedCallback(){
		const tooltipIcon = document.createElement('span');
		tooltipIcon.textContent = '(?)';
		tooltipIcon.addEventListener('mouseenter',this._showTooltip.bind(this));
		tooltipIcon.addEventListener('mouseleave',this._hideTooltip.bind(this));
		this.appendChild(tooltipIcon);
	}
	
	_showTooltip(){
		this._tooltipContainer = document.createElement('div');
		this._tooltipContainer.textContext = 'This is the tooltip details!';
		this.appendChild(this._tooltipContainer);
	}

	_hideTooltip(){
		this.removeChild(this._tooltipContainer);
	}
}
```
Now when the user hovers over the `(?)` tooltip, a `div` with *`This is the tooltip details!`* text content will appear and whenever the mouse cursor leaves the tooltip it is removed from the `DOM`. The `_` in method name and property name is just a practice to tell other developers that this property should not be accessed outside of the class, it signify that it is a `PRIVATE` property. 

### Using attributes on Custom Elements
```javascript
constructor(){
	super();
	this._tooltipContainer;
	//This the default tooltip text
	this._tooltipText = "This is the default text!";
}
```
```javascript
connectedCallback(){
	//Checking if the custom element has an attribute text
	if(this.hasAttribute('text')){
		//Gets the attribute value if it has one
		this._tooltipText = this.getAttribute('text');
	}
	const tooltipIcon = document.createElement('span');
	tooltipIcon.textContent = '(?)';
	tooltipIcon.addEventListener('mouseenter',this._showTooltip.bind(this));
	tooltipIcon.addEventListener('mouseleave',this._hideTooltip.bind(this));
	this.appendChild(tooltipIcon);
}
```
```javascript
_showTooltip(){
	this._tooltipContainer = document.createElement('div');
	//Assigns the value of tooltipText to tooltipContainer text content
	this._tooltipContainer.textContext = this._tooltipText;
	this.appendChild(this._tooltipContainer);
}
```
`HMTL`
```html
<c-tooltip>First Tooltip</c-tooltip>
<c-tooltip text="This is my first tip!">SecondTooltip</c-tooltip>
<c-tooltip text="This is my second tip">Third Tooltip</c-tooltip>
```
When the first tooltip is hovered it will output the default tooltip text, but when we hover the 2nd tooltip it will show the *`This is my first tip!`* text. When we hover the 3rd and last tooltip it will show the *`This is my second tip!`* text.

### Styling Custom Element
```javascript
connectedCallback(){
	if(this.hasAttribute('text')){
		this._tooltipText = this.getAttribute('text');
	}
	const tooltipIcon = document.createElement('span');
	tooltipIcon.textContent = '(?)';
	tooltipIcon.addEventListener('mouseenter',this._showTooltip.bind(this));
	tooltipIcon.addEventListener('mouseleave',this._hideTooltip.bind(this));
	this.appendChild(tooltipIcon);

	//Making the positon relative so that tooltip aligns with the custom element
	this.style.position = "relative";
}
```
```javascript
_showTooltip(){
	this._tooltipContainer = document.createElement('div');
	
	//Styling the tooltip DIV
	this._tooltipContainer.style.backgroundColor = "black";
	this._tooltipContainer.style.color = "white";
	this._tooltipContainer.style.position= "absolute";
	
	this._tooltipContainer.textContext = this._tooltipText;
	this.appendChild(this._tooltipContainer);
}
```

### Shadow DOM
```javascript
constructor(){
	super();
	this._tooltipContainer;
	this._tooltipText = "This is the default text!";

	//Shadow DOM
	this.attachShadowDom({mode: 'open'});
}
```
```javascript
connectedCallback(){
	if(this.hasAttribute('text')){
		this._tooltipText = this.getAttribute('text');
	}
	const tooltipIcon = document.createElement('span');
	tooltipIcon.textContent = '(?)';
	tooltipIcon.addEventListener('mouseenter',this._showTooltip.bind(this));
	tooltipIcon.addEventListener('mouseleave',this._hideTooltip.bind(this));

	//Shadow ROOT
	this.shadowRoot.appendChild(tooltipIcon);
	
	this.style.position = "relative";
}
```
```javascript
_showTooltip(){
	this._tooltipContainer = document.createElement('div');
	
	//Styling the tooltip DIV
	this._tooltipContainer.style.backgroundColor = "black";
	this._tooltipContainer.style.color = "white";
	this._tooltipContainer.style.position= "absolute";
	this._tooltipContainer.textContext = this._tooltipText;
	
	//Shadow ROOT
	this.shadowRoot.appendChild(this._tooltipContainer);
}
```
```javascript
_hideTooltip(){
	//Shadow ROOT
	this.shadowRoot.removeChild(this._tooltipContainer);
}
```

Now if we add style for all `DIV` in the `DOM` the `shadowDom` will not be affected by the styling. However, the text we added between the custom element tag also became part of the `shadowDom` resulting to the following:

`HTML`
```html
<c-tooltip>First Tooltip </c-tooltip>
<c-tooltip text="This is my first tip!">Second Tooltip </c-tooltip>
<c-tooltip text="This is my second tip">Third Tooltip </c-tooltip>
```
`Output`
```html
(?)
(?)
(?)
```
When we hover the first tooltip the content of the `div` will become *`First Tooltip This is the default text!`*. The same will happen to the 2nd tooltip which outputs *`Second Tooltip This is my first tip!`*. Notice that what we added between the custom element tags became part of the `div` tooltip content.

### Adding Template instead
```html
<template id="tooltip-id">
	<span>(?)</span>
</template>
```
```javascript
constructor(){
	super();
	this._tooltipContainer;
	this._tooltipText = "This is the default text!";

	//Shadow DOM
	this.attachShadowDom({mode: 'open'});
	const template = document.getElementById("tooltip-id");
	//Deep clone the content of template element which is the span element.
	this.shadowRoot.appendChild(template.content.cloneNode(true));
}
```
```javascript
connectedCallback(){
	if(this.hasAttribute('text')){
		this._tooltipText = this.getAttribute('text');
	}
	
	//Select the span from the shadow dom
	const tooltipIcon = this.shadowRoot.querySelector('span');
	
	tooltipIcon.addEventListener('mouseenter',this._showTooltip.bind(this));
	tooltipIcon.addEventListener('mouseleave',this._hideTooltip.bind(this));

	//Shadow ROOT
	this.shadowRoot.appendChild(tooltipIcon);
	
	this.style.position = "relative";
}
```

### Using Slots
To bring back the content we added between the custom element tag we just need to use `slot` tag.

`HTML`
```html
<template id="tooltip-id">
	<slot></slot><span>(?)</span>
</template>
```
`Output`
```html
First Tooltip (?)
Second Tooltip (?)
Third Tooltip (?)
```
Now whatever we place between the `c-tooltip` tag will be placed inside the `slot` tag. Also notice that the tooltip `(?)` is now positioned at the end. We can also add default value between the `slot` tag but will be overwritten if we add value between the `c-tooltip` tag.

Example:
`HTML`
```html
<template id="tooltip-id">
	<slot>Default value </slot><span>(?)</span>
</template>

<!--Empty Tooltip-->
<c-tooltip></c-tooltip>
<!--Tooltip with value-->
<c-tooltip>Has content </c-tooltip>
```
`Output`
```
Default value (?)
Has content (?)
```

### Creating Tooltip inside JavaScript instead
Making the template in the `HTML` file kinds of make the purpose of web component useless. It is better for the template to be created inside the JavaScript file so that we only need to add the web component script to make it ready to use.
```javascript
constructor(){
	super();
	this._tooltipContainer;
	this._tooltipText = "This is the default text!";

	//Shadow DOM
	this.attachShadowDom({mode: 'open'});
	
	//Create innerHTML instead
	this.shadowRoot.innerHtml = `
		<slot>Default value </slot>
		<span>(?)</span>
	`;
}
```
Use backtick ```(`)``` for multiline `HTML` code.

### Using Style tags
```javascript
constructor(){
	super();
	this._tooltipContainer;
	this._tooltipText = "This is the default text!";

	//Shadow DOM
	this.attachShadowDom({mode: 'open'});
	
	//Create innerHTML instead
	this.shadowRoot.innerHtml = `
		<style>
			div{
				background-color: black;
				color: white'
				position: absolute;
			}
		</style>
		<slot>Default value </slot>
		<span>(?)</span>
	`;
}
```
Now `_showTooltip` method is much cleaner.
```javascript
_showTooltip(){
	this._tooltipContainer = document.createElement('div');
	this._tooltipContainer.textContext = this._tooltipText;
	this.shadowRoot.appendChild(this._tooltipContainer);
}
```
The styling inside the `shadow dom`will not be affected by the styling in the `DOM` and vise versa.

### Extending built-in Elements
```javascript
class confirmLink extends HTMLAnchorElement{
	connectedCallback(){
		this.addEventListener('click',() => {
			if(!confirm("Are you sure you want to exit?")){
				event.preventDefault();
			}
		});
	}
}
```
```javascript
customElements.define('a-confirm',confirmLink,{extends: 'a'});
```
Third parameter is required if you are going to extend to a specific built-in element like anchor tag `a`.

`HTML`
```html
<a is="a-confirm" href="https://stackedit.io/app#">Stack Edit</a>
```

### Attribute change callback
```javascript
attributeChangedCallback(name, oldValue, newValue){
	console.log(name, oldValue, newValue);
}
```
```javascript
static get observedAttributes(){
	// Can listen to more attributes like ['text','class']
	return ['text']; 
}
```
`HTML`
```html
<c-tooltip text="Initial text">Has content </c-tooltip>
```
`Console Output`
```
text null Initial text
```
If we change the text attribute on the fly it will be noticed. For example we changed the text attribute value to "New text" in developer tool. The output will be:
```
text null Initial text
text Initial text New text
```
Example:
```javascript
attributeChangedCallback(name, oldValue, newValue){
	if(oldValue === newValue) return;
	if(name === "text"){
		this._tooltipText = newValue;
	}
}
```

### Disconnected Callback
Triggers when the web component is deleted from the `DOM`.
```javascript
disconnectedCallback(){
	console.log('logged when custom element is removed from the dom');
}
```
# FINAL OUTPUT
```javascript
class Tooltip extends HTMLElement {
	constructor() {
		super();
		this._tooltipIcon;
		this._tooltipVisible = false;
		this._tooltipText = 'Some dummy tooltip text.';
		this.attachShadow({ mode: 'open' });
		this.shadowRoot.innerHTML = `
		<style>
			div {
				font-weight: normal;
				background-color: black;
				color: white;
				position: absolute;
				top: 1.5rem;
				left: 0.75rem;
				z-index: 10;
				padding: 0.15rem;
				border-radius: 3px;
				box-shadow: 1px 1px 6px rgba(0,0,0,0.26);
			}

			:host {
				position: relative;
			}

			:host(.important) {
				background: var(--color-primary, #ccc);
				padding: 0.15rem;
			}

			:host-context(p) {
				font-weight: bold;
			}

			.highlight {
				background-color: red;
			}

			::slotted(.highlight) {
				border-bottom: 1px dotted red;
			}
			
			.icon {
				background: black;
				color: white;
				padding: 0.15rem 0.5rem;
				text-align: center;
				border-radius: 50%;
			}
		</style>
		<slot>Some default</slot>
		<span class="icon">?</span>
		`;
	}

	connectedCallback() {
		if (this.hasAttribute('text')) {
			this._tooltipText = this.getAttribute('text');
		}

		this._tooltipIcon = this.shadowRoot.querySelector('span');
		this._tooltipIcon.addEventListener('mouseenter',this._showTooltip.bind(this));
		this._tooltipIcon.addEventListener('mouseleave',this._hideTooltip.bind(this));
		this._render();
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (oldValue === newValue) {
			return;
		}
		if (name === 'text') {
			this._tooltipText = newValue;
		}
	}

	static get observedAttributes() {
		return ['text'];
	}
	
	disconnectedCallback() {
		this._tooltipIcon.removeEventListener('mouseenter', this._showTooltip);
		this._tooltipIcon.removeEventListener('mouseleave', this._hideTooltip);
	}
	
	_render() {
		let tooltipContainer = this.shadowRoot.querySelector('div');
		if (this._tooltipVisible) {
			tooltipContainer = document.createElement('div');
			tooltipContainer.textContent = this._tooltipText;
			this.shadowRoot.appendChild(tooltipContainer);
		} else {
			if (tooltipContainer) {
				this.shadowRoot.removeChild(tooltipContainer);
			}
		}
	}

	_showTooltip() {
		this._tooltipVisible = true;
		this._render();
	}

  

	_hideTooltip() {
		this._tooltipVisible = false;
		this._render();
	}
}

customElements.define('uc-tooltip', Tooltip);
```
