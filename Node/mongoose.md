# Mongoose

Install
```
npm install --save mongoose
```

No need for a `database.js` util.

**app.js**

``` javascript
import mongoose require('mongoose);
//
// Code in between
//
mongoose
  .connect("mongodb://localhost:27017/mysnapshots")
  .then((result) => {
    app.listen(3000);
  })
  .catch((error) => {
    console.log(error);
  });
```
For local development the `mysnapshots` in the `URL` is the database name.

**snapshot.js** `model`

Inside our `model` file we will create the structure of our `collection`.

```javascript
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const snapshotSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  imageUrl: String,
});

module.exports = mongoose.model("Snapshot", snapshotSchema);
```
The `Snapshot` is the `collection's` name and soon will be automatically converted by `mongo db` into `snapshots`.

**home.js** `controller`
```javascript
const Snapshot = require("../models/snapshot");

exports.getSnapshots = (req, res) => {
  Snapshot.find()
    .then((result) => {
      res.render("home", { title: "My Snapshots", snapshots: result });
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.getSnapshot = (req, res) => {
  Snapshot.findById(req.params.id)
    .then((result) => {
      res.render("details", { title: result.title, snapshot: result });
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.addSnapshot = (req, res) => {
  const snapshot = new Snapshot({
    title: req.body.title,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
  });

  snapshot
    .save()
    .then((result) => {
      console.log(result);
      res.redirect("/");
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.editSnapshot = (req, res) => {
  Snapshot.updateOne(
    { _id: req.body.id },
    {
      title: req.body.title,
      description: req.body.description,
      imageUrl: req.body.imageUrl,
    }
  )
    .then((result) => {
      res.redirect("/details/" + req.body.id);
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.deleteSnapshot = (req, res) => {
  Snapshot.findByIdAndRemove(req.body.id)
    .then((result) => {
      console.log(result);
      res.redirect("/");
    })
    .catch((error) => {
      console.log(result);
    });
};
```

For creating a new `snapshot` you must create the `object` first and assign it in a constant variable. The argument passed to the class constructor is an `object` containing the properties of the `document` as shown in the `addSnapshot`. After creating the instance object you can now use the `save` method to save into the `collection`.

For other `quries` you don't need to instantiate an object, because some are just a `static method` of the `model class`.

**home.js** `routes`
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

## Schema with embedded ID

Let say we have a `user` with various `post`, and `post` itself as a different model. In `user` schema we want to store post id inside `user`.

```javascript
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  post: [
    {
      postId: Schema.Types.ObjectId,
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
```
Since `postId` will store the id of a certain product its type must be an `ObjectId` and to assign that as a type we can use the `Schema.Types.ObjectId`.  

To make the `postId` as required:

```javascript
post: [
  {
    postId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Post'
    },
  },
]
```

The `ref` means that it is referencing other model, in the example above it is referencing the `Post` model which means that we now have a relation between `User` and `Post`.

## Populate

In the example above when we find a `user` it will return an example object:

```javascript
{
  _id: 123
  name: 'marvin'
  post: [
    {postId: 123123},
    {postId: 321321}
  ]
}
```

Let say `postId: 123123` is a referenced `post` with the following object when queried:

```javascript
{
  _id: 123123,
  title: "I like this view",
  imageUrl: "some url",
}
```

With populate when we query `user`:
```javascript
User.findById("123")
  .populate("post.postId")
  .execPopulate()
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });
```
The `.execPopulate()` returns a promise.

**NOTE:** Not sure this time if it is `execPopulate` or just `exec`.

Instead of returning this:

```javascript
{
  _id: 123,
  name: 'marvin',
  post: [
    {postId: 123123},
    {postId: 321321}
  ]
}
```

It will return this:

```javascript
{
  _id: 123,
  name: "marvin",
  post: [
    {
      postId: {
        _id: 123123,
        title: "I like this view",
        imageUrl: "some url",
      },
    },
    {
      postId: {
        _id: 321321,
        title: "Breakfast time",
        imageUrl: "some url",
      },
    },
  ]
}

```

[**More about population**](https://mongoosejs.com/docs/populate.html)

## Adding custom methods to schema

Your `model` is not only limited to built in static and non-static methods such as: `find`, `findById`, `findByIdAndRemove` and etc. You can also create your own custom `method` to the said `model`.

```javascript
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  post: [
    {
      postId: Schema.Types.ObjectId,
    },
  ],
});

userSchema.methods.methodName = function(){
	//Do something
}

module.exports = mongoose.model("User", userSchema);
```

Now when you instantiate a `model` you can now use the method like this:

```javascript
cont someUser = new User();
someUser.MethodName();
```

## Adding custom static methods

**OPTION 1:**

```javascript
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    post: [
      {
        postId: Schema.Types.ObjectId,
      },
    ],
  },
  {
    statics: {
      staticMethodName() {
        //Your code here
      }
    }
  }
);


module.exports = mongoose.model("User", userSchema);
```

**OPTION 2:**

```javascript
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  post: [
    {
      postId: Schema.Types.ObjectId,
    },
  ],
});

userSchema.statics.staticMethodName= function(){
	//Do something
}

module.exports = mongoose.model("User", userSchema);
```

Now you can use your static method:

```
User.staticMethodName();
```