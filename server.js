let express = require("express");
let app = express();
let fs = require("fs");

app.get("/listUsers", function (req, res) {
  console.log("Hello world");
  fs.readFile(__dirname + "/" + "users.json", "utf8", function (err, data) {
    console.log(data);
    res.end(data);
  });
});

var user = {
  user4: {
    name: "ramesh",
    password: "password3",
    profession: "clerk",
    id: 4,
  },
};

app.post("/addUser", function (req, res) {
  // First read existing users.
  fs.readFile(__dirname + "/" + "users.json", "utf8", function (err, data) {
    data = JSON.parse(data);
    data["user4"] = user["user4"];
    console.log(data);
    res.end(JSON.stringify(data));
  });
});

app.get("/:id", function (req, res) {
  // First read existing users.
  fs.readFile(__dirname + "/" + "users.json", "utf8", function (err, data) {
    let users = JSON.parse(data);
    let user = users["user" + req.params.id];
    console.log(user);
    res.end(JSON.stringify(user));
  });
});

var id = 2;

app.delete("/deleteUser", function (req, res) {
  // First read existing users.
  fs.readFile(__dirname + "/" + "users.json", "utf8", function (err, data) {
    data = JSON.parse(data);
    delete data["user" + 2];

    console.log(data);
    res.end(JSON.stringify(data));
  });
});

const server = app.listen(8080, function () {
  const host = server.address().address;
  const port = server.address().port;
  console.log("Example app listening at http://%s:%s", host, port);
});
