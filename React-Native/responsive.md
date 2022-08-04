# Adaptive & Responsive UI

## Dimensions API

``` javascript
import { Dimensions } from 'react-native';
```

Arguments can be `screen` or `window`. The `window` argument excludes the status-bar. In `iOS` both are the same.
```javascript
const deviceWidth = Dimensions.get('window').width;
```
```javascript
const styles = StyleSheet.create({
	padding: deviceWidth < 450 ? 12: 16
});
```

## Orientation

Inside `app.json` you'll see inside the `expo` object the `orientation` property by default it is set to `portrait` making the app unable to rotate. To make it rotate you can set the value to `default`. The other orientation is `landscape`.

## useWindowDimension

```javascript
import { useWindowDimension }from 'react-native';
```
**Inside the component:**
```javascript
const { width, height } = useWindowDimension();
const marginTop = height < 300 ? 30, 100;

return (
  <Text style={[styles.someStyle, { marginTop: marginTop }]}>
    Hello World!!!
  </Text>
);

```
Whenever the app changes the orientation `useWindowDimension` will re-execute the component and change the `width` and `height` value returned from the hook.

## KeyboardAvoidingView

```javascript
import { KeyboardAvoidingView, ScrollView } from 'react-native';
```
```javascript
return (
    <ScrollView>
        <KeyboardAvoidingView behavior="position">
            <View>
                <View></View>
            </View>
        </KeyboardAvoidingView>
    </ScrollView>
);
```
Behavior `position` makes the `keyboard` to push every child component up and in able to see the pushed components we need to wrap them in `ScrollView` to scroll. Make sure `ScrollView` is set to `flex: 1` if some design has relative sizing. `KeyboardAvoidingView` is useful for `iOS` because it does not have the hide keyboard button unlike `Android`.

## Platform

```javascript
import { Platform } from 'react-native';
```

```javascript
const styles = StyleSheet.create({
	padding: Platform.OS === 'android' ? 2 : 0,
});
```
```javascript
const styles = StyleSheet.create({
    padding: Platform.select({ ios: 0, android: 2 }),
});
```

Will set `padding: 2` for `android` devices, otherwise `padding: 0`.

**Different platform file**
First create a different `component` for different `platform`.

**ChildComponent.ios.js**
```javascript
import { Text } from 'react-native';

function ChildComponent(){
  return <Text>Hello World IOS</Text>
}

export default ChildComponent;
```

**ChildComponent.android.js**
```javascript
import { Text } from 'react-native';

function ChildComponent(){
  return <Text>Hello World Android</Text>
}

export default ChildComponent;
```
**ParentComponent.js**
```javascript
import ChildComponent from "./components/ChildComponent";

function ParentComponent() {
    return <ChildComponent />;
}

export default ParentComponent;
```

React-native will recognize the `component` file to be used depending on what platform the app is being used. Important that you just import the `ChildComponent` without the platform just as shown in the `ParentComponent`.