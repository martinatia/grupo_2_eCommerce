const express = require("express");
const app = express();
const path = require("path");
app.use(express.static("public"));

app.listen(3000, () => console.log("Servidor corriendo"));

//Sistema de ruteo
app.get("/", (req, res) => {
  res.sendFile(path.resolve("./views/index.html"));
});

app.get("/carrito", (req, res) => {
  res.sendFile(path.resolve("./views/carrito.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.resolve("./views/login.html"));
});

app.get("/product_description", (req, res) => {
  res.sendFile(path.resolve("./views/product_description.html"));
});

app.get("/registration", (req, res) => {
  res.sendFile(path.resolve("./views/registration.html"));
});