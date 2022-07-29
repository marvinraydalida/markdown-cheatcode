# Effects, Reducers & Context

## useEffect

Use effect will only run in the first start of the application and when the dependencies change.

**No dependency passed**
```javascript
useEffect(() => {
  //Runs on every render
});
```

**Empty array**
```javascript
useEffect(() => {
  //Runs only on the first render
}, []);
```

**Props or State values**
```javascript
useEffect(() => {
  //Runs on the first render
  //And any time any dependency value changes
}, [prop, state]);
```

**EXAMPLE:**
```javascript
import { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";

function Counter() {
  const [count, setCount] = useState(0);
  const [calculation, setCalculation] = useState(0);

  useEffect(() => {
    setCalculation(() => count * 2);
  }, [count]); 

  return (
    <>
      <p>Count: {count}</p>
      <button onClick={() => setCount((c) => c + 1)}>+</button>
      <p>Calculation: {calculation}</p>
    </>
  );
}
```

The `useEffect` will only trigger every time the `count` state is changed, and it is changed whenever we click the button thus triggering the `setCalculation`.

**Clean up function**

The `useEffect` function also has a clean up function.

```javascript
useEffect(()  =>  {  
	setCalculation(()  => count *  2);
	
	return () => {
		//do something
	};  
},  [count]);
```
Whenever the `useEffect` triggers the returned function will trigger first, except for the first run of `useEffect`. In the example above if count is changed and triggers the `useEffect` the returned function will run first before `setCalculation`.

## useReducer

Let say we have an app that has 2 button for adding, and subtracting 1 to the current state value. Whenever the current state value is odd it displayed `3 is odd` and the same for even. The code could look like this:

```javascript
import { useState } from "react";

function App() {
  const [value, setValue] = useState(0);
  const [isEven, setIsEven] = useState(true);

  function addHandler() {
    if ((value + 1) % 2 === 0) {
      setIsEven(true);
    } else {
      setIsEven(false);
    }
    setValue((prevValue) => prevValue + 1);
  }

  function subtractHandler() {
    if ((value - 1) % 2 === 0) {
      setIsEven(true);
    } else {
      setIsEven(false);
    }

    setValue((prevValue) => prevValue - 1);
  }

  return (
    <div className="App">
      <button onClick={addHandler}>+</button>
      <h1>
        {value} is {isEven ? "even" : "odd"}
      </h1>
      <button onClick={subtractHandler}>-</button>
    </div>
  );
}

export default App;
```

In the example above we use `useState` to change the state of the value as well if it is an even number. Now let's try it with state reducer.

```javascript
import { useReducer } from "react";

function reducer(state, action) {
  if (action.type === "add") {
    return {
      value: state.value + 1,
      isEven: (state.value + 1) % 2 === 0 ? true : false,
    };
  } else if (action.type === "minus") {
    return {
      value: state.value - 1,
      isEven: (state.value - 1) % 2 === 0 ? true : false,
    };
  }
  return state;
}


function App() {

  const [valueState, dispatch] = useReducer(reducer, {
    value: 0,
    isEven: true,
  });

  function addHandler() {
    dispatch({ type: "add" });
  }

  function subtractHandler() {
    dispatch({ type: "minus" });
  }

  return (
    <div className="App">
      <button onClick={addHandler}>+</button>
      <h1>
        {valueState.value} is {valueState.isEven ? "even" : "odd"}
      </h1>
      <button onClick={subtractHandler}>-</button>
    </div>
  );
}

export default App;
```

With `useReducer` we have managed to handle 2 states namely changing the value and checking if it is even or not. Unlike `useState` where we need to create 2 state management with `useReducer` we handled it with just 1 state management.

**NOTE:** It is a good practice for the `reducer` function to be defined outside of the `component` function so that whenever the component is re-valuated it is not recreated once again. Though it would work if it is defined inside the `component` function.

## useContext

The `useContext` hook is used to listen for context to avoid passing of `props` from component to component.

**Creating Context**
```javascript
import React from "react";

const ContextName = React.createContext({
  isLoggedIn: false,
});

export default ContextName ;
```

Now in other `component` we can import our newly created context and wrap other `component` that wants to access the data inside of the context.

```javascript
import ContextName from './ContextName';
```

```javascript
return (
  <>
    <outsideComponent />
    <ContextName.Provider>
      <SomeComponent />
      <OtherComponent />
    </ContextName.Provider>
  </>
);
```

Every `component` wrapped inside the context provider can access the data inside of the context, unlike the `components` that is not wrapped.

Now inside `SomeComponent`:

```javascript
import React, {useContext} from 'react';
import ContextName from './ContextName';

const SomeComponent = () => {

	const contextObject = useContext(ContextName);
	
	return(
		<h1>{contextObject.isLoggedIn}</h1>
	);
}

export default SomeComponent;
```