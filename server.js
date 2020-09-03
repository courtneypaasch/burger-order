//set consts
const express = require("express");
const exphbs = require("express-handlebars");
const mysql = require("mysql");
const app = express();
const PORT = process.env.PORT || 8000;

//sets up express and handlebars
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

let connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "DMJR4kidz!",
  database: "burger_db"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("Listening on port 8080");
});

app.get("/", function(req, res) {
    connection.query("SELECT * FROM burgerList", (err, data) => {
        if (err) throw err;
        res.render("index", {burgerList: data});
    })
});

app.post("/", (req, res) => {
  connection.query("INSERT INTO burgerList (name) VALUES (?)", [req.body.name], (err, result) => {
    if (err) throw err;
    res.redirect("/");
  });
});

app.listen(PORT, function() {
    // Log (server-side) when our server has started
    console.log("Server listening on: http://localhost:" + PORT);
  });