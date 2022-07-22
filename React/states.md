# State & Events

## Adding Event listener
```javascript
function ExpenseItem(props) {
    
    const clickHandler = () => {
        console.log('clicked');
    }

    return (
        <Card className="expense-item">
            <ExpenseDate date={props.date} />
            <div className="expense-item__description">
                <h2>{props.title}</h2>
                <div className="expense-item__price">${props.amount}</div>
            </div>

            <button onClick={clickHandler}>Click me</button>
        </Card>
    );
}
```

## State
Import from `react`
```javascript
import {useState} from 'react';
```
```javascript
const [title, setTitle] = useState(props.title);
```
**NOTE:** The `useState` returns two value, the first one is the current `state` and the next value is the function that updates the `state`.  We can assign the two returned values by using array `destructuring`.

Now you can access the current `state` like so:
**Before**
```html
<h2>{props.title}</h2>
```
**After**
```html
<h2>{title}</h2>
```

Inside the `clickHandler` function we can then use the `setTitle` function to update the current `state`.
```javascript
const clickHandler = () => {
	setTitle('updated');
}
```
## Setting Multiple states
**OPTION 1:**
```javascript
const [enteredTitle, setEnteredTitle] = useState('');
const [enteredAmount, setEnteredAmount] = useState('');
const [enteredDate, setEnteredDate] = useState('');
```
```javascript
const titleChangeHandler = (event) => {
	setEnteredTitle(event.target.value);
}

const amountChangeHandler = event => {
	setEnteredAmount(event.target.value);
}

const dateChangeHandler = event => {
	setEnteredDate(event.target.value);
}
```
**OPTION 2:**
```javascript
const [userInput, setUserInput] = useState({
	enteredTitle: '',
	enteredAmount: '',
	enteredDate: ''
});
```
```javascript
const titleChangeHandler = (event) => {
	setUserInput(
		{
			...userInput,
			enteredTitle: event.target.value
		}
	);
}

const amountChangeHandler = event => {
	setUserInput(
		{
			...userInput,
			enteredAmount: event.target.value
		}
	);
}

const dateChangeHandler = event => {
	setUserInput(
		{
			...userInput,
			enteredDate: event.target.value
		}
	);}
```
The reason why we need to place other key `state` key-value by object property spreading is because we passed an object to the `useState` and if we did not include that other key-value pair will be lost.

## Sending Form data
```javascript
const submitHandler = event => {
	event.preventDefault();

	const expenseData = {
		title: enteredTitle,
		amount: enteredAmount,
		date: new Date(enteredDate)
	};
}
```
```javascript
<form  onSubmit={submitHandler}></form>
```

## Two way binding
```javascript
const submitHandler = event => {
	event.preventDefault();

	const expenseData = {
		title: enteredTitle,
		amount: enteredAmount,
		date: new Date(enteredDate)
	};
	
	setEnteredTitle('');
	setEnteredAmount('');
	setEnteredDate('');
}
```
```html
<input  type='text'  value={enteredTitle}  onChange={titleChangeHandler}  />

<input  type='number'  value={enteredAmount}  min="0.01"  step="0.01"  onChange={amountChangeHandler}  />

<input  type='date'  value={enteredDate}  min="2019-01-01"  max="2022-12-31"  onChange={dateChangeHandler}  />
```
With 2-way binding we can reset the value of every `input` element. It is okay to set to empty string again because our state was stored already in an another object namely `expenseData`.

## Child to Parent component communication

**Parent Component:** `NewExpense.js`
```javascript
function NewExpense(){

    const saveExpenseDataHandler = enteredExpenseData => {
        const expenseData = {
            ...enteredExpenseData,
            id: Math.random().toString()
        }
    }

    return (
        <div className='new-expense'>
            <ExpenseForm onSaveExpenseData={saveExpenseDataHandler}/>
        </div>
    );
}
```

**Child Component:** `ExpenseForm.js`
```javascript
import { useState } from 'react';
import './ExpenseForm.css'

function ExpenseForm(props) {
    const [enteredTitle, setEnteredTitle] = useState('');
    const [enteredAmount, setEnteredAmount] = useState('');
    const [enteredDate, setEnteredDate] = useState('');

    const titleChangeHandler = (event) => {
        setEnteredTitle(event.target.value);
    }

    const amountChangeHandler = event => {
        setEnteredAmount(event.target.value);
    }

    const dateChangeHandler = event => {
        setEnteredDate(event.target.value);
    }

    const submitHandler = event => {
        event.preventDefault();

        const expenseData = {
            title: enteredTitle,
            amount: enteredAmount,
            date: new Date(enteredDate)
        };

        //Function reference from parent component
        props.onSaveExpenseData(expenseData);

        setEnteredTitle('');
        setEnteredAmount('');
        setEnteredDate('');
        
    }

    return (...);
}

export default ExpenseForm;
```
In the parent component we passed the `reference` of a function that takes an object as an argument. That function `reference` then can be accessed through `props` inside the `child` component e.g. 
```javascript
props.onSaveExpenseData(expenseData);
```
We then pass the `object` we want to send to the `parent` component as an argument through the `reference` function.  With the function inside the `parent` component we can then access the object we passed from the `child` component.
```javascript
const saveExpenseDataHandler = enteredExpenseData => {
	const expenseData = {
		...enteredExpenseData,
		 id: Math.random().toString()
	 }
 }
```