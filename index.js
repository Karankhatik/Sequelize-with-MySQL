const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require("./models");
const userCtrl = require("./controllers/userController");
const multer = require("multer");
// parse application/json
// Parse URL-encoded and JSON request bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const upload = multer({ dest: './uploads/' }); 

app.get("/", (req, res) => {
  res.send("hello world!");
});

app.get("/add", userCtrl.addUser);
app.get('/users', userCtrl.getUsers);
app.get('/user/:id', userCtrl.getUser);
app.post('/add-user', userCtrl.postUser);
app.delete('/user/:id', userCtrl.deleteUser);

app.patch('/user/:id', userCtrl.patchUser);

app.get('/query', userCtrl.queryUser);

app.get('/finder' , userCtrl.findeUser);

app.get('/get-set-virtual', userCtrl.getSetVirtual)

app.post('/validate',upload.single("image"), userCtrl.validateUser)

app.get('/one-to-one', userCtrl.oneToOneUser);

app.get('/one-to-many', userCtrl.oneToManyUser);

app.get('/many-to-many', userCtrl.manyToManyUser);

app.listen(8000, function (err) {
  if (err) {
    console.log("Server issur", err);
  }
  console.log("Server connected successfully");
});
