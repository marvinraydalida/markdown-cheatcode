# Complex layout

## Shadow

Shadow style property does not work with `Android` devices but instead  can have shadow using `elevation` property.

## TextInput props 

**maxLength**
```
<TextInput maxLength={2}/>
```

**keyboardType**
```
<TextInput keyboardType="numbers-pad"}/>
```

## Style

The style prop can have an anonymous function with an attribute of `pressData`, any name is ok, 

```
<Pressable
    style={(pressData) =>
        pressData.pressed ? styles.styleOne : styles.styleTwo
    }
></Pressable>;
``` 

You can also pass array of styles inside the `style` props. All the style inside of that array will be applied.
```javascript
<Pressable style={[styles.styleOne, styles.styleTwo]}></Pressable>;
```

## Alert

```javascript
Alert.alert('Title','Message',[{
  text: 'Okay',
  style: 'destructive',
  onPress: someFunctionHandler
}]);
```
The 3rd argument in `alert` is an array of button that means you can have multiple buttons in an array.

```
Alert.prompt();
```

## SafeAreaView

The purpose of `SafeAreaView` is to render content within the safe area boundaries of a device. It is currently only applicable to iOS devices with iOS version 11 or later.

```javascript
import { StyleSheet, Text, SafeAreaView } from 'react-native';
```
```javascript
<SafeAreaView style={styles.container}>
    <Text style={styles.text}>Page content</Text>
</SafeAreaView>;
```

## Cascading style

You can pass style through props.

**ParentComponent.js**

```javascript
import { StyleSheet } from "react-native";
import ChildComponent from "./components/ChildComponent";

function ParentComponent() {
    return <ChildComponent someStyle={styles.cascade} />;
}

export default ParentComponent;

const styles = StyleSheet.create({
    cascade: {
        backgroundColor: "black",
    },
});
```

**ChildComponent.js**

```javascript
import { View, StyleSheet } from "react-native";

function ChildComponent(props) {
    return <View style={[styles.viewStyle, props.someStyle]}></View>;
}

export default ChildComponent;

const styles = Stylesheet.create({
    viewStyle: {
        background: "white",
    },
});
```

As you can see the `ChildComponent` gets the style from its parent component through props and placed inside an array. However, both style applied inside the array has its own `backgroundColor` and the last element in the array is the final one to be applied so the `backgroundColor` will be `black`.

## Icons

```javascript
import { Ionicons } from '@expo/vector-icons';
```

```javascript
<Ionicons name="md-remove" size={24} color="white"/>
```

**[READ MORE HERE](https://docs.expo.dev/guides/icons/)**

## Custom fonts

If you're using expo install it using:
```
expo install expo-font
```
```javascript
import { useFont } from 'expo-font';
```
Inside `assets/fonts/` place a `TTF` font then inside your component do this:

```javascript
const [fontsLoaded] = useFont({
	'fontName': require('./assets/fonts/fontname.ttf')
});
```
**NOTE:** The property name of the font and the actual filename is different and that is okay.

**Show loading when loading fonts**
```
expo install expo-app-loading
```
```javascript
import AppLoading from 'expo-app-loading';
```
```javascript
if(!fontsLoaded){
	return <AppLoading/>;
}
```
Now you can apply it to your `StyleSheet`:
```javascript
const styles = StyleSheet.create({
	text: {
		fontFamily: 'fontName'
	}
});
```

**[Read more about expo-fonts here](https://docs.expo.dev/versions/latest/sdk/font/)**

**[Without expo read here](https://10minute.tech/add-fonts-to-react-native-apps/)**

## Text
You can nest a `Text` component inside of another `Text` component.