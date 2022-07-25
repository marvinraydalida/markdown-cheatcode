# SQL

## MySQL

Install dependency
```
npm install --save mysql2
```

Inside the `util` folder create a database file:

**database.js**

```javascript
const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'dentalappoinment',
    password: ''
});

module.exports = pool.promise();
```

You can now import the database anywhere like so:
```javascript
const  db = require('./util/database');
```

```javascript
db.execute('SELECT * FROM appointments WHERE appointmentID=1')
    .then(result => {
        console.log(result[0]);
    }) 
    .catch(err => {
        console.log(err);
    });
```

## Avoid SQL injection

```javascript
db.execute('INSERT INTO appointments (name, email) VALUES (?, ?)',['Node', 22])
    .then(result => {
        console.log(result);
    }) 
    .catch(err => {
        console.log(err);
    });
```
```javascript
db.execute('SELECT * FROM appointments WHERE appointmentID= ?',[1])
    .then(result => {
        console.log(result[0]);
    }) 
    .catch(err => {
        console.log(err);
    });
```
We pass values as `?` and then pass an `array` with the values in it to avoid `SQL` injection.

## SEQUELIZE

Install `sequelize`:
```
npm install --save sequelize
```
**NOTE:** The `mysql2` package is still needed as dependency.

**database.js**
```javascript
const Sequelize = require('sequelize');

const sequelize = new Sequelize('snapshot', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;
```

**Creating a model**
```javascript
const Sequelize = require('sequelize');
const table = require('../util/database');

const Snapshot = table.define('Snapshot', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    imageUrl: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    timestamps: false
});

module.exports = Snapshot;
```
Automatically `sequelize` creates a `timestamp` in the database table. To disable it:
```javascript
sequelize.define('User',  {  
// ... (attributes)  
},  {  
timestamps:  false  
});
```

**Import model to controller**
```javascript
const  Snapshot = require('../models/snapshot');
```

**app.js**
```javascript
const db = require('./util/database');
.
.
.
db.sync()
    .then(result => {
        //console.log(result)
    })
    .catch(error => {
        console.log(error);
    });

app.listen(3000);
```
The following code syncs your `model` to the `database`.

**CREATE query inside controller**
```javascript
exports.addSnapshot = (req, res) => {
    Snapshot.create({
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl
    }).then(result => {
        res.redirect('/');
    }).catch(err => {
        console.log(err);
    });;
}
```

**SELECT query**
```javascript
exports.getSnapshots = (req, res) => {
    Snapshot.findAll().then(snapshots => {
        res.render('home', { title: 'My Snapshots', snapshots: snapshots });
    }).catch(err => {
        console.log(err);
    });

}
```
```sql
SELECT * FROM snapshots
```

**DELETE query**
```javascript
exports.deleteSnapshot = (req, res) => {
    Snapshot.destroy({
        where: {
            id: req.body.id
        }
    }).then(result => {
        console.log(result);
        res.redirect('/');
    }).catch(err => {
        console.log(err);
    });
}
```

**UPDATE query**
```javascript
exports.editSnapshot = (req, res) => {
    Snapshot.update({ 
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl
    },{
        where: {
            id: req.body.id
        }
    }).then(result => {
        console.log(result);
        res.redirect('/details/' + req.body.id);
    }).catch(err => {
        console.log(err);
    });
}
```
