# Custom Hooks

Creating custom hooks:
```javascript
import { useState } from "react";

const useSomething = () => {
    const [someState, setSomeeState] = useState(0);

    useEffect(() => {
        setSomeState(1);
    }, []);
	
	return someState;
};

export default useSomething;
```

Some component:

```javascript
import useSomething from '../hooks/useSomething';

const SomeComponent = () => {
    const someState = useSomething();
};

export default SomeComponent ;
```

Now, if we use our custom hook to different component they will have their unique states. They won't share the `useState` inside the custom hooks. The logic is only shared.
