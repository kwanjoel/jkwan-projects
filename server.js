const express = require("express");
const app = express();
const path = require("path");
const HTTP_PORT = process.env.PORT || 8080;

function onHttpStart() {
    console.log("Listening on: " + HTTP_PORT)
}
app.use(express.static("public"));

app.get("/", (req,res) => {
    res.redirect("/main.html");
})

app.get("/main.html", (req,res) => {
    res.sendFile(path.join(__dirname + "/main.html"))
})

app.use((req, res) => {
    res.status(404).send("Page Not Found");
  });

app.listen(HTTP_PORT, onHttpStart);