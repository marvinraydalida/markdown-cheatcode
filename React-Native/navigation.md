# Navigation

## React navigation

```
npm install @react-navigation/native
```

Additional package for `expo`:
```
expo install react-native-screens react-native-safe-area-context
```


## Native Stack
```
npm install @react-navigation/native-stack
```

**App.js**
```javascript
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

function SomeComponent() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Notifications" component={Notifications} />
                <Stack.Screen name="Profile" component={Profile} />
                <Stack.Screen name="Settings" component={Settings} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default SomeComponent;

```
Every `component` passed inside of the `Stack.Screen` receives a special props called `navigation`.

**Home.js**
```javascript
function Home(props){
	function navigateHandler(){
		props.navigation.navigate('Notifications');
	}

	return <Button title="Notifications" onPress={navigateHandler}/>
}

export default Home;
```

**NOTE:**  When setting up a Navigator (like `Stack.Navigator`) and registering its screens (via `Stack.Screen`), you can decide **which screen will be shown as a default when the app starts**. Out of the box, the **top-most screen** (i.e. the **first child** inside of `Stack.Navigator`) is used as the initial screen. Alternatively, there also is an  `initialRouteName`  prop that can be set on the navigator component (i.e., on  `Stack.Navigator`  in this case):
```javascript
<Stack.Navigator initialRouteName="Settings">
    <Stack.Screen name="Home" component={Home} />
    <Stack.Screen name="Notifications" component={Notifications} />
    <Stack.Screen name="Profile" component={Profile} />
    <Stack.Screen name="Settings" component={Settings} />
</Stack.Navigator>;
```

## useNavigation

In the examples above components that is passed as `Stack.Screen` automatically receives a props called `navigation` but what if it has a child component that also need to navigate? The first option would be is to pass the `navigation` props again down to its child or use the `useNavigation` hook.

```javascript
import  { useNavigation }  from  '@react-navigation/native';

function SomeComponent(){
	const navigation = useNavigation();
	
	function navigateHandler(){
		navigation.navigate('Home');
	}
	
	return <Button title="Home" onPress={navigateHandler}/>
}

export default SomeComponent;
```

## Route parameters

Passing data through screens:

**App.js**
```javascript
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function SomeComponent() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Notifications" component={Notifications} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  );
}

export default SomeComponent;
```

**Home.js**
```javascript
function Home(){
	function navigateHandler(){
		props.navigation.navigate('Notifications'. {
			someData: 1234
		});
	}

	return <Button title="Notifications" onPress={navigateHandler}/>
}

export default Home;
```

The `navigation` function accepts an optional second parameter which is an object that you can pass properties that other screens to access it.

**Notifications.js**
```javascript
function Notifications(props){

	const data = props.route.params.someData;
	
	function navigateHandler(){
		props.navigation.navigate('Home');
	}

	return <Button title="Home" onPress={navigateHandler}/>
}

export default Notifications;
```
Now the `components` passed as a `Stack.Screen` also receives a props called `routes` which can access the data passed from the previous screen after navigating to the current screen. In the example above, from `Home` component if we navigate to `Notifications` component we will be passing an `object` with key-value pairs as the second argument to the `props.navigation.navigate` function. After navigating to `Notifications` we can access the `routes` props there to access the data passed from the previous `component` which in the example above is the `someData` property.

## useRoute

Alternatively you can use the `useRoute` hook instead of the `props.route` props. This is also good for child components that is not included inside the `Stack.Screen`.

```javascript
import  { useRoute }  from  '@react-navigation/native';
```
```javascript
const route = useRoute();
route.params.someData;
```

## Configuring default style

**Stack.Navigator options**
```javascript
<Stack.Navigator
    screenOptions={ {
        title: "Welcome",
        headerStyle: { backgroundColor: "black" },
        contentStyle: { backgroundColor: "black" },
    }}
>
    <Stack.Screen name="Home" component={Home} />
</Stack.Navigator>;
```
Default to every screen.

**Stack.Screen options**
```javascript
<Stack.Navigator>
    <Stack.Screen
        name="Home"
        component={Home}
        options={ {
            title: "Welcome",
            headerStyle: { backgroundColor: "black" },
            contentStyle: { backgroundColor: "black" },
        }}
    />
</Stack.Navigator>;
```

**[MORE OPTIONS](https://reactnavigation.org/docs/native-stack-navigator#options)**

## Dynamic Options

```javascript
<Stack.Navigator>
    <Stack.Screen
        name="Home"
        component={Home}
        options={({ route, navigation }) => {
            const title = route.params.title;
            return { title: title };
        }}
    />
</Stack.Navigator>;
```

It is similar to `route` props but instead of accessing them on a `component` we access it directly through the `Stack.Screen` option props as a function. The function passed in the `options` props receives an object as an argument, in the example above we `destructured` it to access `route` and `navigation`.

**Alternatively...**

The `navigation` props passed automatically also has a `setOptions` method. The `useLayoutEffect` is kind of similar to `useEffect` but the former runs synchronously immediately after React has performed all DOM mutations.

```javascript
import { useEffect } from 'react';

function Home(props){
  useLayoutEffect(() => {
    props.navigation.setOptions({
    title: 'Welcome',
  	headerStyle: { backgroundColor: "black" },
    contentStyle: { backgroundColor: "black" },
  });
  }, [navigation]);
	return <></>
}

export default Home;
```

**Or destructure the prop**

```javascript
import { useLayoutEffect } from 'react';

function Home({navigation}){
  useLayoutEffect (() => {
    navigation.setOptions({
    title: 'Welcome',
  	headerStyle: { backgroundColor: "black" },
    contentStyle: { backgroundColor: "black" },
  });
  }, [navigation]);
	return <></>
}

export default Home;
```

## Header button

```javascript
<Stack.Navigator>
    <Stack.Screen
        name="Home"
        component={Home}
        options={ {
            headerRight: () => {
                return <Button title="Like" onPress={someHandler} />;
            },
        }}
    />
</Stack.Navigator>;
```

The code above will add a `button` component in the right side of the header. Alternatively you can also pass a `component` instead of an anonymous function that returns a `JSX`.

If you want to interact when in the same `component` you can do this:

```javascript
useLayoutEffect(() => {
    props.navigation.setOptions({
        headerRight: () => {
            return <Button title="Like" onPress={someHandler} />;
        },
    });
}, [navigation]);
```

## Drawer

```
npm install @react-navigation/drawer
npm install react-native-gesture-handler react-native-reanimated

//or if managed with expo
expo install react-native-gesture-handler react-native-reanimated
```

```javascript
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

const Drawer = createDrawerNavigator();

function SomeComponent() {
    return (
        <NavigationContainer>
            <Drawer.Navigator>
                <Drawer.Screen name="Feed" component={Feed} />
                <Drawer.Screen name="Article" component={Article} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}

export default SomeComponent;
```

## Configuring Drawer

```javascript
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

function SomeComponent(){
  
  return <NavigationContainer>
  	<Drawer.Navigator>
    	<Drawer.Screen name="Feed" 
    	component={Feed} 
    	options={ {
          headerStyle: {
            backgroundColor: 'black'
          }
        }}/>
    </Drawer.Navigator>
  </NavigationContainer>
}

export default SomeComponent;
```

**Default style**

```javascript
<NavigationContainer>
    <Drawer.Navigator
        screenOptions={ {
            headerStyle: {
                backgroundColor: "black",
            },
        }}
    >
        <Drawer.Screen name="Feed" component={Feed} />
    </Drawer.Navigator>
</NavigationContainer>
```

**NOTE:** To change the `backgroundColor` of the screen using `Drawer` use `sceneContainerStyle`.

## Custom drawer icon
```javascript
import { Ionicons } from '@expo/vector-icons';
```
```javascript
<NavigationContainer>
    <Drawer.Navigator>
        <Drawer.Screen
            name="Feed"
            component={Feed}
            options={ {
                drawerIcon: ({ color, size }) => (
                    <Ionicons name="home" color={color} size={size} />
                ),
            }}
        />
    </Drawer.Navigator>
</NavigationContainer>;
```
The `color` and `size` is destructured from an object passed as an argument to the anonymous function for `drawerIcon` property.

**Opening drawer**

```javascript
function Home({navigation}){
	 function someHandler(){
		navigation.toggleDrawer();
	}
	return <></>
}

export default Home;
```

With `Drawer` navigation prop now has a new method called `navigation.toggleDrawer` which toggles the drawer when used.


## Bottom Tabs

```
npm install @react-navigation/bottom-tabs
```

```javascript
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Home" component={HomeScreen} />
                <Tab.Screen name="Settings" component={SettingsScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
```

Basically same configuration as `Native stack` and `Drawer`. Read the [docs](https://reactnavigation.org/docs/bottom-tab-navigator#installation). The `icon` configuration is the same as `Drawer` icon configuration.

## Nesting navigation

```javascript
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import  { createDrawerNavigator }  from  '@react-navigation/drawer';  

const Stack = createNativeStackNavigator();
const Drawer =  createDrawerNavigator();

function DrawerNavigator(){
	return (
    <Drawer.Navigator>
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Notifications" component={Notifications} />
    </Drawer.Navigator>
);

}

function SomeComponent() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Home"
                    component={DrawerNavigator}
                    options={ {
                        headerShown: false,
                    }}
                />
                <Stack.Screen name="Notifications" component={Notifications} />
                <Stack.Screen name="Profile" component={Profile} />
                <Stack.Screen name="Settings" component={Settings} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default SomeComponent;
```

As you can see below we used `DrawerNavigator` function to return a `Drawer` navigation. The drawer screen hold the `Home` component.

```javascript
<Stack.Screen
    name="Home"
    component={DrawerNavigator}
    options={ {
        headerShown: false,
    }}
/>;
```