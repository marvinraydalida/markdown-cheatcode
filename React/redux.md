# Redux

Install redux for React
```
npm install react-redux
```
For a `redux` related file create a `store` folder inside the `src` folder.

**index.js** inside the `store` folder.
```javascript
import { createStore } from 'redux';

const counterReducer = (state = {counter:0}, action) => {
	if(action.type === 'increment'){
		return {counter: state.counter + 1}
	}
	else if(action.type === 'decrement'){
		return {counter: state.counter - 1}
	}
	return state;
}

const store = createStore(counterReducer);

export default store;
```

**index.js** inside the `src` folder.
```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

//Import redux here
import { Provider } from 'react-redux';
import store from './store/index';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
	  //Wrapp the app with Provider
	  <Provider store={store}>
	    <App />
	  </Provider>
  </React.StrictMode>
);
```

Now the whole `App` component and its child will have access to redux.

**App.js**

```javascript
import "./styles.css";
import ChildComponent from './components/ChildComponent';

export default function App() {
  return (
    <div className="App">
      <ChildComponent/>
    </div>
  );
}
```

**ChildComponent.js**

```javascript
import React from "react";
import { useSelector, useDispatch } from "react-redux";

const ChildComponent = () => {


  //Create dispatch
  const dispatch = useDispatch();

  //Sets a subscription to the redux store
  const counter = useSelector(state => state.counter);

  const incrementHandler = () => {
    dispatch({type: 'increment'});
  }

  const decrementHandler = () => {
    dispatch({type: 'decrement'});
  }
  
  return (
    <>
      <h1>{counter}</h1>
      <button onClick={incrementHandler}>increment</button>
      <button onClick={decrementHandler}>decrement</button>
    </>
  );
};

export default ChildComponent;
```

Similar to `useReducer` the dispatch function of the reducer can have extra payload:
```javascript
dispatch({type: increment, name: 'marvin'});
```

You can also manage multiple state but remember to return every property of the state:

```javascript
const INIT_STATE = {
	counter: 0,
	status: false
}

const someReducer = (state = INIT_STATE , action) => {
	if(action.type === 'increment'){
		return {
			counter: state.counter + 1,
			status: false
		}
	}
	else if(action.type === 'decrement'){
		return {
			counter: state.counter - 1,
			status: true
		}
	}
	return state;
}
```

## Create slice

Install redux toolkit:

```
npm install @reduxjs/toolkit
```

**index.js** inside the `store` folder:

```javascript
import { createSlice, configureStore } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: { counter: 0 },
  reducers: {
    increment(state, action) {
      state.counter = state.counter + action.payload;
    },
    decrement(state, action) {
      state.counter = state.counter - action.payload;
    }
  }
});

const store = configureStore({
  reducer: counterSlice.reducer
});

export const counterActions = counterSlice.actions;

export default store;
```

**ChildComponent.js**

```javascript
import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { counterActions } from "../store/index";

const ChildComponent = () => {
  //Create dispatch
  const dispatch = useDispatch();

  //Sets a subscription to the redux store
  const counter = useSelector((state) => state.counter);

  const incrementHandler = () => {
	//Payload is 2
    dispatch(counterActions.increment(2));
  };

  const decrementHandler = () => {
	//Payload is 3
    dispatch(counterActions.decrement(3));
  };

  return (
    <>
      <h1>{counter}</h1>
      <button onClick={incrementHandler}>increment</button>
      <button onClick={decrementHandler}>decrement</button>
    </>
  );
};

export default ChildComponent;
```
**NOTE:** Even if you don't have action payload you still need to call decrement as `counterActions.decrement()` inside `dispatch`.

**Creating multiple slice**

Creating another slice is similar to the example above, you can have multiple slice inside of the redux file. Once you create the slices you need to store them in the `configureStore` reducer:

```javascript
const store =  configureStore({ 
	reducer: {
		counter: counterSlice.reducer,
		other: otherSlice.reducer			
	} 
});
```
You can then export the reducer actions:

```javascript
export  const counterActions = counterSlice.actions;  
export  const otherActions = otherSlice.actions; 
 
export  default store;
```

When using `useSelector` you need to drill in further:

**ChildComponent.js**
```javascript
const counter =  useSelector((state)  => state.counter.counter);
const other =  useSelector((state)  => state.other.amount);
```
The first counter is the property name you set in the `configureSlice` reducer object. The second counter is the state itself in `counterSlice`.

**Separate Files**

**index.js** inside `store` folder
```javascript
import  { configureStore }  from  "@reduxjs/toolkit";

import counterReducer from './counter';
import otherReducer from './other';

const store =  configureStore({ 
	reducer: {
		counter: counterReducer,
		other: otherReducer 			
	} 
});

export  default store;
```

**counter.js** inside `store` folder

```javascript
import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: { counter: 0 },
  reducers: {
    increment(state, action) {
      state.counter = state.counter + action.payload;
    },
    decrement(state, action) {
      state.counter = state.counter - action.payload;
    }
  }
});

export const counterActions = counterSlice.actions;

export default counterSlice.reducer;
```

**other.js** inside `store` folder

```javascript
import { createSlice } from "@reduxjs/toolkit";

const otherSlice = createSlice({
  name: "other",
  initialState: { amount: 0 },
  reducers: {
    increment(state) {
      state.amount++;
    },
    decrement(state) {
      state.amount--;
    }
  }
});

export const cotherActions = otherSlice.actions;

export default otherSlice.reducer;
```