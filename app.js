const express = require("express");
const app = express();
const path = require("path");
app.use(express.static("public"));


app.set("view engine", "ejs");
app.listen(3000, () => console.log("Servidor corriendo"));


//Sistema de ruteo
app.get("/", (req, res) => {
  res.sendFile(path.resolve("./src/views/products/index.html"));
});

app.get("/carrito", (req, res) => {
  res.sendFile(path.resolve("./src/views/products/carrito.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.resolve("./src/views/users/login.html"));
});

app.get("/produc-description", (req, res) => {
  res.sendFile(path.resolve("./src/views/products/produc-description.html"));
});

app.get("/registration", (req, res) => {
  res.sendFile(path.resolve("./src/views/users/registration.html"));
});