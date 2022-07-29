# Optimization

To prevent a child `component` to re-evaluate when no `props` change is detected use `React.memo` when exporting the said child `component`.

**Parent component**
```javascript
return (
  <div>
    <ChildrenComponent text={someTextState} />
    <OtherComponent text={otherTextState} />
  </div>
);
```

If the `someTextState` changes the whole parent `component` is re-evaluated and re-executed together with its child `component`. But let's say that the `otherTextState` passed in `OtherComponent` is only updated of course we would not want our `ChildrenComponent` to be re-evaluated and re-executed if there is no changes to `someTextState`, and to do that implement `React.memo`.

**ChildrenComponent.js**
```javascript
const ChildrenCompoment = props => {
  return <h1>{props.text}</h1>
}

export default React.memo(ChildrenComponent);
```

**NOTE:** `React.memo` comes with a cost of comparing the previous props value to the new props value. It would only be good for large component trees.

## useCallback

When a `componet` is re-evaluated some callback functions also is changed for example:

```javascript
const SomeCompoment = (props) => {
  const someHandler = () => {
    //do something
  };

  return <ChildrenComponent onClick={someHandler} />;
};

export default SomeCompoment;

```
When the `component` above is re-evaluated and re-executed the reference value of `someHandler` changes.

```javascript
const ChildrenCompoment = props => {
  return <button onClick={props.onClick}/>
}

export default React.memo(ChildrenComponent);
```

Even with `React.memo` the child `component` is still re-evaluated and re-executed because we are assigning a new reference to the function handler, so in simple terms the props is changed.

This is where we can use `useCallback` hook.

```javascript
import { useCallback } from "react";

const SomeCompoment = (props) => {
  const someHandler = useCallback(() => {
    //do something here
  }, []);

  return <ChildrenComponent text={someHandler} />;
};

export default SomeCompoment;
```

With `useCallback` we are making sure that we are using the same handler reference so `someHandler` now uses the same function reference in every re-evaluation and re-execution so there will be no props value change in the children component. This time `React.memo` now works.

The hook `useCallback` also has a dependencies so if it change the function we pass inside the `useCallback` is re-created. In the example above we only pass an empty array `[]` to signify that it won't change. However, if you want to re-create the function inside you can use the dependency and pass values, or state values in there just like `useEffect`.

## useMemo

Just like `useCallback`, the `useMemo` hook allows you to store data.

```javascript
const someVar = useMemo(() => {
  return []; //Some data you want to store
}, []);
```