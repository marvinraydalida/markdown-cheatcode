# MongoDB

## Setting up MongoDB

Install MongoDB
```
npm install --save mongodb
```

**database.js**

```javascript
const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let db;

const mongoConnect = (startListening) => {
  MongoClient.connect(
    "mongodb+srv://marvin:dalida@cluster0.nmqyrot.mongodb.net/?retryWrites=true&w=majority"
  )
    .then((client) => {
      db = client.db("mysnapshot");
      startListening();
    })
    .catch((error) => {
      console.log(error);
    });
};

const getDb = () => {
  if (db) {
    return db;
  }
};

module.exports.mongoConnect = mongoConnect;
module.exports.getDb = getDb;
```
The `startListening` callback function is called when the connection is established. 

**app.js**
```javascript
const  db = require('./util/database');

//
// Some code in between
//

db.mongoConnect(() => {
  app.listen(3000);
});
```
We pass an anonymous function as an argument in `db.mongoConnect` so it will call it inside of the `then` block when the connection is established and it will now listen to port `3000`. 

**Model class:** **snapshot.js**
```javascript
const mongodb = require("mongodb");
const db = require("../util/database");

class Snapshot {
  constructor(title, description, imageUrl) {
    this.title = title;
    this.description = description;
    this.imageUrl = imageUrl;
  }

  insert() {
    //Collection is table
    return db.getDb().collection("snapshots").insertOne(this);
  }

  static getAll() {
    return db.getDb().collection("snapshots").find().toArray();
  }

  static getById(id) {
    return db
      .getDb()
      .collection("snapshots")
      .findOne({ _id: new mongodb.ObjectId(id) })
  }

  static updateSnapshot(id, updateDetails) {
    return db
      .getDb()
      .collection("snapshots")
      .updateOne({ _id: new mongodb.ObjectId(id) }, { $set: updateDetails });
  }

  static deleteSnapshot(id) {
    return db
      .getDb()
      .collection("snapshots")
      .deleteOne({ _id: new mongodb.ObjectId(id) });
  }
}

module.exports = Snapshot;

```
We still require `mongodb` package in here so that we could use the `mongodb.ObjectId` class to convert normal id into an `ObjectId` datatype.

**Controller**
```javascript
const Snapshot = require("../models/snapshot");

exports.getSnapshots = (req, res) => {
  Snapshot.getAll()
    .then((result) => {
      res.render("home", { title: "My Snapshots", snapshots: result });
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.getSnapshot = (req, res) => {
  Snapshot.getById(req.params.id)
    .then((result) => {
      res.render("details", { title: result.title, snapshot: result });
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.addSnapshot = (req, res) => {
  const snapshot = new Snapshot(
    req.body.title,
    req.body.description,
    req.body.imageUrl
  );

  snapshot
    .insert()
    .then((result) => {
      res.redirect("/");
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.editSnapshot = (req, res) => {
  const updateDetails = {
    title: req.body.title,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
  };
  Snapshot.updateSnapshot(req.body.id, updateDetails)
    .then((result) => {
      res.redirect("/details/" + req.body.id);
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.deleteSnapshot = (req, res) => {
  Snapshot.deleteSnapshot(req.body.id)
    .then((result) => {
      console.log(result);
      res.redirect("/");
    })
    .catch((error) => {
      console.log(error);
    });
};

```

**Routes**

```javascript
const express = require("express");
const homeController = require("../controllers/home");
const router = express.Router();

router.get("/", homeController.getSnapshots);

router.get("/details/:id", homeController.getSnapshot);

router.post("/add", homeController.addSnapshot);

router.post("/edit", homeController.editSnapshot);

router.post("/delete", homeController.deleteSnapshot);

module.exports = router;

```

## Other cool trick
```javascript
db.getDb().collection("snapshots").find(
	{_id: {
		$in: [...some id list here]
	}})
	.toArray()
	.then(result => {
		console.log(result);
	})
	.catch(error => {
		console.log(error);
	});
```
Basically what this do is that we are looking for number of `ids` and we store it in an array and pass it inside:
```
{
	$in: [];
}
```
It will then return those items if its id is included in the array of ids.

## Nesting
If your document looks like this:
```javascript
{
	_id: 1231231,
	items: {
		itemId: 123123
	}
}
```

You can query the `itemId` directly.
```javascript
db .getDb() .collection("snapshots").findOne({ 'items.itemId':  new  mongodb.ObjectId(id)  })
```
Just make sure that the key is `''` covered with a quotation mark.