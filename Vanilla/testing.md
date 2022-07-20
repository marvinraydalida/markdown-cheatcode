# Test

## Jest
Install jest using `NPM`.
```
npm install --save-dev jest
```

### Unit Test
Works only using Node export.

Inside utils.js
```javascript
export.generateText = (name, age) => {
	return `${name} is ${age} years old.`;
}
```

Inside utils.test.js
```javascript
const {generateText} = require('./util');

test('should output name and age',() => {
	const test = generateText('Someone', 21);
	expect(test).toBe('Max is 21 years old.');
});
```
Inside `package.json` change under scripts
```
"test": "jest"
```

Run test by typing `npm test`.

## Puppeteer
### E2E Test
Install Puppeteer using `NPM`.
```
npm install --save-dev puppeteer
```
Inside utils.test.js
```javascript
const puppeteer = require('puppeteer');

test('should click around',async () => {
	const browser = await puppeteer.launch({
		headless: false,
		slowMo: 80,
		args: ['--window-size=1920,1080']
	});
	const page = await browser.newPage();
	await page.goto(
		'URL of page'
	);
	//await page.click("DOM id or query selector");
	//await page.type("DOM id or query selector", "input string");
	await page.click("#inputName");
	await page.type("#inputName", "Marvin");
	
	await page.click("#inputAge");
	await page.type("#inputName", 21);
	
	await page.click("#submit");
	
	//With Jest
	const outputH1 = await page.$eval('h1', element => element.textContent); 
	expect(outputH1).toBe('Marvin is 21 years old.');
});
```
Run test by typing `npm test`.

### Important note
Jest does not wait for promises so it will immediately run the test. To wait for the promise result you can just place the expect inside the `.then` block:

```javascript
test('Should wait for promise', () => {
	somePromise.then((result) => {
		expect(result).toBe('this is the ' + result);
	})
});
```

Other useful thing for jest is `__mocks__`.