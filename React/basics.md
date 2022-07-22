# Basics

## Creating new project
```
npx create-react-app <project-name>
cd <project-name>
npm start
```

## Custom Component

Create a `components` folder inside the `src` folder. After that create a `JavaScript` file inside of the `components`folder. The naming convention would be every first word is capital casing e.g. `NamingConvention.js`

**ExpenseItem.js**
```javascript
function ExpenseItem(){
    return <h1>Simple Component</h1>
}

export default ExpenseItem;
```
**App.js**
```javascript
import ExpenseItem from './components/ExpenseItem';

function App() {
  return (
    <div className="App">
      <ExpenseItem></ExpenseItem>
    </div>
  );
}

export default App;
```

## More on JSX

The following code would not work a `component` should only return one root element, so it is best to wrap them by a single element.

**Before**
```javascript
function ExpenseItem(){
    return (
        <h1>Simple Component</h1>
        <h2>Simple Component</h2>
    );
}

export default ExpenseItem;
```


**After**
```javascript
function ExpenseItem() {
    return (
        <div>
            <h1>Simple Component</h1>
            <h2>Simple Component</h2>
        </div>
    );
}

export default ExpenseItem;
```

## Basic Styling

Inside the `components`folder create a `css` file with the same name to the `component` you're going to style.

**Importing CSS**
```javascript
import './ExpenseItem.css';

function ExpenseItem() {
    return (
        <div className="expense-item">
            <div>March 28th 2021</div>
            <div className="expense-item__description">
                <h2>Car</h2>
                <div className="expense-item__price">$21</div>
            </div>
        </div>
    );
}

export default ExpenseItem;
```

**Note:** The `class` keyword is a reserved word in JavaScript therefore we use `className` instead.

## Dynamic Data

We can assign value to constant variables before we return the component. To access the `const` variables we simply use `{}` and place the variable name inside of them.

```javascript
import './ExpenseItem.css';

function ExpenseItem() {
    const expenseDate = new Date(2021, 2, 28);
    const expenseItem = 'Car Insurance';
    const expenseAmount = 222; 

    return (
        <div className="expense-item">
            <div>{expenseDate.toISOString()}</div>
            <div className="expense-item__description">
                <h2>{expenseItem}</h2>
                <div className="expense-item__price">${expenseAmount}</div>
            </div>
        </div>
    );
}

export default ExpenseItem;
```

## Props

Props are used to pass data across props.

**App.js**
```javascript
import ExpenseItem from './components/ExpenseItem';

function App() {
  const expenses = [
    { id: "e1", title: "title", amount: 222, date: new Date(2022, 7, 28) },
    { id: "e2", title: "new", amount: 333, date: new Date(2022, 7, 28) },
    { id: "e3", title: "sample", amount: 444, date: new Date(2022, 7, 28) }
  ];
  return (
    <div className="App">
      <ExpenseItem
        title={expenses[0].title}
        amount={expenses[0].amount}
        date={expenses[0].date}>
      </ExpenseItem>
      <ExpenseItem
        title={expenses[1].title}
        amount={expenses[1].amount}
        date={expenses[1].date}>
      </ExpenseItem>
      <ExpenseItem
        title={expenses[2].title}
        amount={expenses[2].amount}
        date={expenses[2].date}>
      </ExpenseItem>
    </div>
  );
}

export default App;
```

**ExpenseItem.js**
```javascript
import './ExpenseItem.css';

function ExpenseItem(props) {

    return (
        <div className="expense-item">
            <div>{props.date.toISOString()}</div>
            <div className="expense-item__description">
                <h2>{props.title}</h2>
                <div className="expense-item__price">${props.amount}</div>
            </div>
        </div>
    );
}

export default ExpenseItem;
```

The attribute passed in `ExpenseItem` component will be stored in one object and will be passed as an argument to the `component`. In the example above the object is called `props`. With that we can now access its properties.

## JavaScript logic inside component

```javascript
import './ExpenseItem.css';

function ExpenseItem(props) {
    const month = props.date.toLocaleString('en-PH', {month: 'long'});
    const day = props.date.toLocaleString('en-PH', {day: '2-digit'});
    const year = props.date.getFullYear();

    return (
        <div className="expense-item">
            <div>
                <div>{month}</div>
                <div>{day}</div>
                <div>{year}</div>
            </div>
            <div className="expense-item__description">
                <h2>{props.title}</h2>
                <div className="expense-item__price">${props.amount}</div>
            </div>
        </div>
    );
}

export default ExpenseItem;
```

## Splitting component

We can further split our `components` into more.

**ExpenseDate.js**

```javascript
import './ExpenseDate.css';

function ExpenseDate(props) {

    const month = props.date.toLocaleString('en-PH', {month: 'long'});
    const day = props.date.toLocaleString('en-PH', {day: '2-digit'});
    const year = props.date.getFullYear();

    return (
        <div className='expense-date'>
            <div className='expense-date__month'>{month}</div>
            <div className='expense-date__day'>{day}</div>
            <div className='expense-date__year'>{year}</div>
        </div>
    );
}

export default ExpenseDate;
```

**ExpenseItem.js**
```javascript
import ExpenseDate from './ExpenseDate';
import './ExpenseItem.css';

function ExpenseItem(props) {
    
    return (
        <div className="expense-item">
            <ExpenseDate date={props.date} />
            <div className="expense-item__description">
                <h2>{props.title}</h2>
                <div className="expense-item__price">${props.amount}</div>
            </div>
        </div>
    );
}

export default ExpenseItem;
```
As you can see we created a new component called `ExpenseDate` and imported it to our `ExpenseItem`component.

**NOTE:** You can create a self closing element like `<ExpenseDate/>`.

## Composition

We can create `component` wrapper as well and reuse some styling.

**Card.js**
```javascript
import './Card.css';

function Card(props){
    const classes = "card " + props.className;
    return(
        <div className={classes}>{props.children}</div>
    );
}

export default Card;
```
If you look at the `className` we are including 2 classes from 2 `css` files. The `card` className is within the `Card.css` file and the `props.className` is passed as attribute in the `Card` component.

**NOTE:** The `props.children` is a reserved named indicating all elements and component within another component.

**Expenses.js**
```javascript
import ExpenseItem from './ExpenseItem';
import Card from './Card';
import './Expenses.css';

function Expenses(props) {
    return (
        <Card className='expenses'>
            <ExpenseItem
                title={props.items[0].title}
                amount={props.items[0].amount}
                date={props.items[0].date}>
            </ExpenseItem>
            <ExpenseItem
                title={props.items[1].title}
                amount={props.items[1].amount}
                date={props.items[1].date}>
            </ExpenseItem>
            <ExpenseItem
                title={props.items[2].title}
                amount={props.items[2].amount}
                date={props.items[2].date}>
            </ExpenseItem>
        </Card>
    );
}

export default Expenses;
```

As you can see the `elements` and `component` under `Card` component is the value of  `props.children`. The `className` is also used inside `Card.js`. The purpose of passing `className` is to avoid style duplication.

## Reference
[Code Reference](https://github.com/academind/react-complete-guide-code/tree/03-react-basics-working-with-components/code)