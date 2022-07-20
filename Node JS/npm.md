# Node Package Manager

## NPM Scripts

Type `npm init` to initialize node project.

Inside `package.json` you can add `start` property and `node app.js` as value  inside the script like:
```json
"scripts": {
	"test": "echo \"Error: no test specified\" && exit 1",
	"start": "node app.js"
},
```
This will now allow you to start the server by typing `npm start`instead of `node app.js`.

If creating custom script like `start-server`:
```json
"scripts": {
	"test": "echo \"Error: no test specified\" && exit 1",
	"start": "node app.js",
	"start-server": "node app.js"
},
```
`npm start-server` won't work. The `start` script is an special exemption. To run the `start-server` script type instead `npm run start-server`.

## Installing packages

To install `npm` package type `npm install`. For this example we're going to install `nodemon`, which automatically restarts the node application when file changes in the directory are detected.

There are 2 installation type `development` and `production`. 
`Development package/dependencies` are only used when developing the server and not needed for production unlike `production packages/dependencies`.

Installation for development
`npm nodemon --save-dev <package-name>`

Installation for production
`npm nodemon --save <package-name>`

Installing globally not only in project
`npm nodemon -g <package-name>`

**NOTE:** To free up space you can delete `node_modules` and install it again by typing `npm install` which will install all dev and production dependencies.


## Using nodemon

After installing `nodemon` as dev dependency you can add it to the `package.json` script:
```json
"scripts": {
	"test": "echo \"Error: no test specified\" && exit 1",
	"start": "nodemon app.js"
}
```
`npm start` to start `nodemon`, and server will not auto restart whenever changes are made.

**NOTE:** running `nodemon app.js` will not work because it will look globally. But if it is under the script inside `package.json` like `start` it will look locally.