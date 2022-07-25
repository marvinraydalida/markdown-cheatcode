# Styling

## CSS modules

CSS modules makes sure that the styles in a `component` is scoped to that `component` only. For example if you have a `className` in a certain `component` and other `component` also share the same `className` problems in styling may arise. 

**Naming CSS modules**

```
ComponentName.module.css
```

The `.module` is a signal to when transforming the `css` code.

**Importing CSS module**

```javascript
import styles from './ComponentName.module.css';
```
Unlike normal `css` import, `css` modules require `styles` or any other import name, its up to you.

**Sample CSS code**
```css
.darken{
	background-color: black;
	border-radius: 5px;
	border: 1px solid red;
}

.button-size{
	width: 100%;
	height: auto;
}
```

**Applying styles to component className**

```html
<Button className={styles.darken}/>
<Button className={styles['button-size']}/>
```
Basically the `styles` is an object which has the `classes` inside of the `css` module as its properties.