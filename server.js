//set consts
const express = require("express");
const exphbs = require("express-handlebars");
const mysql = require("mysql");
const app = express();
const PORT = process.env.PORT || 8100;

//sets up express and handlebars
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("/public"));
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

let connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "DMJR4kidz!",
  database: "burger_db"
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Listening on port 8100");
});

app.get("/", (req, res) => {
  connection.query("SELECT * FROM burgerList WHERE devoured=0", (err, data) => {
    if (err) throw err;

    connection.query("SELECT * FROM burgerList WHERE devoured=1", (err, data2) => {
      if (err) throw err;
      res.render("index", { devouredList: data2, burgerList: data });
    })
  })
});

app.post("/", (req, res) => {
  connection.query("INSERT INTO burgerList (name) VALUES (?)", [req.body.name], (err, result) => {
    if (err) throw err;
    res.redirect("/");
  });
});

app.put("/api/burgerList/:id", (req, res) => {
  connection.query("UPDATE burgerList SET devoured = 1 WHERE id = ?",[req.params.id], (err, result) => {
    if (err) throw err;
  });
  res.status(200).end();
});

app.delete("/api/burgerList/", (req, res) => {
  connection.query("DELETE FROM burgerList", (err) => {
    if (err) throw err;
    res.status(200).end();
  });
});


app.listen(PORT, () => {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});
