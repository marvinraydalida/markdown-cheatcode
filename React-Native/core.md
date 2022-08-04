# Core

**[React-native components](https://reactnative.dev/docs/components-and-apis)**

## Basic component

Basic component can be wrapped between `View` tag. To use basic component you need to import it from `react-native` and destructure it.

```javascript
import { View, Text, Button } from 'react-native';
```

**Button** is self closing:
```javascript
<Button title="click me!"/>
```

## Styling

### Inline styling
```javascript
<Text
 style={{
   margin: 16,
   borderColor: "pink",
   borderStyle: "dashed",
   borderWidth: 2,
 }}>
  Hello World!
</Text>
```

For `%` number you must wrap it with `''` single quoutes:
```
width: '50%',
```

### Stylesheet

```
import { StyleSheet } from  "react-native";
```
```javascript
<Text style={styles.textStyle}>Hello World!</Text>
```
```javascript
const styles = StyleSheet.create({
    textStyle: {
        margin: 16,
        borderColor: "pink",
        borderStyle: "dashed",
        borderWidth: 2,
    },
});
```

## Flexbox

Expand to occupy available space:
```
flex: 1,
```

## Events


```javascript
export default function App() {
    const [text, setText] = useState("");
    const [goals, setGoals] = useState([]);

    function inputHandler(enteredText) {
        setText(enteredText);
    }

    function buttonHandler() {
        setGoals((prevGoal) => [...prevGoal, text]);
        setText("");
    }

    return (
        <View>
            <View>
                <TextInput
                    value={text}
                    placeholder="Some placeholder:"
                    onChangeText={inputHandler}
                />
                <Button title="Click me" onPress={buttonHandler} />
            </View>
            <View>
                {goals.map((goal) => (
                    <Text key={Math.random()}>{goal}</Text>
                ))}
            </View>
        </View>
    );
}
```

## Scroll

```javascript
import { ScrollView} from 'react-native';
```
```javascript
<ScrollView style={{ padding: 5 }}>
    {goals.map((goal) => (
        <Text key={Math.random()}>{goal}</Text>
    ))}
</ScrollView>;
```

## FlatList

The difference between `FlatList` and `ScrollView` is that `FlatList` will only render like lazy loading. `FlatList` require two props which is the `data` and `renderItem` props. 

In the example below `goals` is a string array and is passed into the `data` props. The `renderItem` props requires a function with an object as an argument and should return the `JSX` code. To access the item we need in the array simply access the `item` property inside the object argument, which is the `goalObj` in our example.
```javascript
import { FlatList } from 'react-native';
```
```javascript
<FlatList
    data={goals}
    renderItem={(goalObj) => {
        return <Text key={Math.random()}>{goalObj.item}</Text>;
    }}
/>;
```

Also if you have an array containing objects:
```
[{name: 'marvin'}, {name: 'max'}, {name: 'test'}]
```
If you add a `key` property inside like: 
```javascript
[
    { name: "marvin", key: 1 },
    { name: "max", key: 2 },
    { name: "test", key: 3 },
];
```
You don't need to assign the `key` props now inside the `FlatList` because it automatically checks for `key` property inside the object argument and assign it as the `key` for rendering so:

**From:**
```javascript
<FlatList
    data={goals}
    renderItem={(goalObj) => {
        return <Text key={Math.random()}>{goalObj.item}</Text>;
    }}
/>;
```
**To:**
```javascript
<FlatList
    data={goals}
    renderItem={(goalObj) => {
        return <Text>{goalObj.item.name}</Text>;
    }}
/>;
```
**keyExtractor props**
Now let's say that instead of `key` you named the property `id`:

```javascript
[
    { name: "marvin", id: 1 },
    { name: "max", id: 2 },
    { name: "test", id: 3 },
];
```

The `FlatList` component also has a prop called `keyExtractor` which requires a function with two arguments namely `item` and `index`:

```javascript
<FlatList
    data={goals}
    renderItem={(goalObj) => {
        return <Text>{goalObj.item.name}</Text>;
    }}
    keyExtractor={(item, index) => {
        return item.id;
    }}
/>;
```

The returned value will be automatically assigned as the `key`.

**NOTE:** `FlatList` also has another prop called `numColumns`. By default it is set to 1.

## Pressable

A wrapper that makes children component pressable.
```javascript
import { Pressable } from 'react-native';
```
```javascript
<Pressable onPress={someFunctionHandler}>
    <View>
        <Text>Click Me!</Text>
    </View>
</Pressable>;
```

Pressable also has a prop called `adroid_ripple` which is a simple press effect animation. As the name implies it only works for `android` device.

```javascript
<Pressable adroid_ripple={{color: 'red'}} onPress={someFunctionHandler}>
    <View>
        <Text>Click Me!</Text>
    </View>
</Pressable>;
```

## Modal
```javascript
import { Modal } from 'react-native';

function ModalComponent(){
  return <Modal visible={true} animationType="slide">
    <Button></Button>
  </Modal>
}

export default ModalComponent;
```
If set to `true` it is visible.


## Image
```javascript
import { Image } from 'react-native';
```
```javascript
<Image source={require('../assets/images/test.png')} />
```
```javascript
<Image source={{uri: 'SOME URL'}} />
```

## Status bar

```javascript
import { StatusBar } from 'expo-status-bar';
```
```javascript
<StatusBar style='light'/>
```