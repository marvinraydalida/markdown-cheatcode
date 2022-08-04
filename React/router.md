# React Router 5

Installing React-router:

Install version 5
```javascript
npm install react-router-dom@5
```
**index.js**

```javascript
import { createRoot } from "react-dom/client";
import App from "./App";

//Import BrowseRouter
import { BrowserRouter } from "react-router-dom";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

```

**App.js**
```javascript
import {Route} from 'react-router-dom';

import FirstComponent from './components/FirstComponent';
import SecondComponent from './components/SecondComponent';

export default function App() {
  return (
    <div className="App">
      <Route path="/first">
        <FirstComponent/>
      </Route>
      <Route path="/second">
        <SecondComponent/>
      </Route>
    </div>
  );
}
```
## Link

```javascript
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/first">First Component</Link>
        </li>
        <li>
          <Link to="/second">Second Component</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
```

## NavLink

This works the same with `Link` however it offer the `activeClassName` which allows us to assign `css` class to design the active link. The example below makes the active link `background-color` to pink:

**Navigation.js**
```javascript
import { NavLink } from "react-router-dom";

import classes from './Navigation.module.css';

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink activeClassName={classes.active} to="/first">First Component</NavLink>
        </li>
        <li>
          <NavLink activeClassName={classes.active} to="/second">Second Component</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;

```

**Navigation.module.css**
```css
.active{
	background-color: pink;
}
```

## Dynamic Routes

```javascript
<Route path="/detail/:id">
	<ProductDetail/>
</Route>
```
**ProductDetals.js**

```javascript
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const params = useParams();

  return <h1>{params.id}</h1>;
};

export default ProductDetail;
```

**FirstComponent.js**

```javascript
import { Link } from "react-router-dom";

const FirstComponent = () => {
  return (
    <>
      <h1>First component</h1>
      <ul>
        <li>
          <Link to="/detail/1">Product 1</Link>
        </li>
        <li>
          <Link to="/detail/2">Product 2</Link>
        </li>
        <li>
          <Link to="/detail/3">Product 3</Link>
        </li>
      </ul>
    </>
  );
};

export default FirstComponent;
```

## Switch and Exact

Let say we have a route:

```javascript
<Route path="/detail">
	<SecondComponent/>
</Route>
<Route path="/detail/:id">
	<ProductDetail/>
</Route>
```

Even though the second `route` is more detailed both `component` inside of them will be rendered together because they share the same path `/detail`.

If we use `switch`:

```javascript
import { Route, Switch} from 'react-router-dom';
``` 

```javascript
<Switch>
	<Route path="/detail">
		<SecondComponent/>
	</Route>
	<Route path="/detail/:id">
		<ProductDetail/>
	</Route>
</Switch>
```
The first `/detail` path will only be rendered which contains the `SecondComponent`. React-router goes from top to bottom and use the first matching route.

If we really want a detailed match where we want `/detail/1` path not `/detail` we can use the prop `exact`:
```javascript
<Switch>
	<Route path="/detail" exact>
		<SecondComponent/>
	</Route>
	<Route path="/detail/:id">
		<ProductDetail/>
	</Route>
</Switch>
```

With exact it will check if it is indeed a detailed match and even if they share the same route.

## Nested Route

Let's say we have a component that has a route of `/welcome`:

```javascript
import { Route } from 'react-router-dom';

const Welcome = () => {
	
	return <>
		<h1>Welcome</h1>
		<Route path="/welcome/user">
			<h2>User</h2>
		</Route>
	</>
}
export default Welcome;
```

Notice that within our component there is an another route. If we access route `/welcome` it will only render the `h1` tag, but if we access route `/welcom/user` then the component inside the route, which is the `h2` tag, will also be rendered in the same page.

## Redirecting

```javascript
import { Route, Redirect } from 'react-router-dom'; 
```

```javascript
<Route path="/">
	<Redirect to="/welcome" />
</Route>
<Route path="/welcome">
	<WelcomeComponent/>
</Route>
```

Whenever we access route `/` we will be redirected to route `/welcome`.

## Not Found

```javascript
<Switch>
	<Route path="/detail" exact>
		<SecondComponent/>
	</Route>
	<Route path="/detail/:id">
		<ProductDetail/>
	</Route>
	<Route path="*">
		<NotFound/>
	</Route>
</Switch>
```

We see that the last route contains a path of `*` which is a wildcard and will match any `URL`. It can be also used as the last option when no routes is found therefore it is placed as last route.

## useHistory hook

```javascript
import { useHistory } from 'react-router-dom';
```

```javascript
const history = useHistory();

functon someHandler(){
	history.push('/somePath');
}
```
Pushing with object:

```javascript
history.push({
	pathname: 'some path name here',
	search: '?paraKey=paramName'
});
```

Will redirect to route `/somePath`.

## Prompt

```javascript
import { Prompt } from 'react-router-dom';
```

```javascript
<Prompt
	when={someStateThatIsTrueOrFalse}  
	message={(location) => 'are you sure you want to leave?'}
/>
```

Will show some prompt if the value of `when` is true otherwise none. The `message` props takes a function that returns a string message.

## Query parameters

Let's say you're in a route `/details?paramKey=paramName` and you want to access the query parameters. To do that you need to use `useLocation` hook.

```javascript
import { useLocation } from 'react-router-dom';
```

```javascript 
const location = useLocation();
```

The `location` constant is an object that contains property such as `path` and `search`. The `search` property will contain the query parameter.

```javascript
//?paramKey=paramName
location.search;
```

With normal JavaScript we can extract the `key` and `value` in the query parameter using `URLSearchParams`.

```javascript
const queryParams = new URLSearchParams(location.search);
queryParams.get('paramKey');
```

## useRouteMatch

Returns details about the `URL`.

```javascript
import { useRouteMatch } from 'react-router-dom';

const match = useRouteMatch();
```

# React Router 6

- **Switch** is now **Routes**.
- **Exact** now is omitted and react router now looks for the exact path.
- **Prompt** does not exist anymore.

## Route
**From:**
```javascript
<Route path="/detail/:id">
	<ProductDetail/>
</Route>
```

**To:**
```javascript
<Route path="/detail/:id"  element={<ProductDetail/>}/>
```

## NavLink

The **activeClassName** prop is not gone. You can still get the **NavLink** status by passing a function with an argument which contains a property `isActive`. You can then use ternary operations to set the `className`.

**From:**
```javascript
<NavLink activeClassName={classes.active} to="/first">First Component</NavLink>
```

**To:**

```javascript
<NavLink className={(data) => data.isActive ? classes.active : "" } to="/first">First Component</NavLink>
```

## Redirect

Redirect now is Navigate.

**From:**
```javascript
<Route path="/">
	<Redirect to="/welcome" />
</Route>
```

**To:**

Push new page to stack.
```javascript
<Route path="/" element={<Navigate to="/welcome" />}/>
```

Replace the whole page.
```javascript
<Route path="/" element={<Navigate replace to="/welcome" />}/>
```

## Nested Route

**From:**

From parent `component`

```javascript
<Route path="/welcome">
	<Welcome/>
</Route>
```

```javascript
import { Route } from 'react-router-dom';

const Welcome = () => {
	
	return <>
		<h1>Welcome</h1>
		<Route path="/welcome/user">
			<h2>User</h2>
		</Route>
	</>
}
export default Welcome;
```

**To:**

From parent `component`
```javascript
<Route path="/welcome/*"  element={<Welcome/>}/>
```

Nested route is now relative to parent route therefore path should only be `user` instead of `/welcome/user`. **Yes `user` not `/user`.**
```javascript
import { Routes, Route } from 'react-router-dom';

const Welcome = () => {
	
	return <>
		<h1>Welcome</h1>
		<Routes>
			<Route path="user" element={<h2>User</h2>}/>
		</Routes>
	</>
}
export default Welcome;
```
**OR To:**

From parent `component`.
```javascript
<Route path="/welcome/*"  element={<Welcome/>}>
	<Route path="user" element={<h2>User</h2>}/>
</Route>
```
The `Outlet` component is where the nested route will be placed.
```javascript
import { Outlet } from 'react-router-dom';

const Welcome = () => {
	
	return <>
		<h1>Welcome</h1>
		<Outlet/>
	</>
}
export default Welcome;
```

## Link

The path is now relative to the parent component path.

**From:**

From parent `component`

```javascript
<Route path="/welcome">
	<Welcome/>
</Route>
```

```javascript
import { Link } from 'react-router-dom';

const Welcome = () => {
	
	return <>
		<Link to='/welcome/user'></Link>
	</>
}
export default Welcome;
```

**To:**
From parent component.
```javascript
<Route path="/welcome/*"  element={<Welcome/>}/>
```

```javascript
import { Link } from 'react-router-dom';

const Welcome = () => {
	
	return <>
		<Link to='user'></Link>
	</>
}
export default Welcome;
```

## useHistory hook is now useNavigate

**From:**
```javascript
import { useHistory } from 'react-router-dom';
```

```javascript
const history = useHistory();

functon someHandler(){
	history.push('/somePath');
}
```

**To:**

```javascript
import { useNavigate } from 'react-router-dom';
```

```javascript
const navigate= useNavigate ();

functon someHandler(){
	navigate('/somePath');
}
```

To redirect instead of pushing into the navigation stack:

```javascript
navigate('/somePath', {replace: true});
```

Go to previous or next page:
```javascript
navigate(-1); //Go to previous page
navigate(-2); //Go to previous previous page
navigate(1); //Go forward
```
