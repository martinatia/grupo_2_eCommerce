const express = require("express");
const app = express();
const path = require("path");
app.use(express.static("public"));


app.set("view engine", "ejs");
app.listen(3000, () => console.log("Servidor corriendo"));

/* Responsabilidad de Luana

modificar este archvo
para que se ajuste al View Engine
*/
//Sistema de ruteo
app.get("/", (req, res) => {
  res.render(path.resolve("./src/views/products/index.ejs"));
});

app.get("/carrito", (req, res) => {
  res.render(path.resolve("./src/views/products/carrito.ejs"));
});

app.get("/login", (req, res) => {
  res.render(path.resolve("./src/views/users/login.ejs"));
});

app.get("/produc-description", (req, res) => {
  res.render(path.resolve("./src/views/products/produc-description.ejs"));
});

app.get("/registration", (req, res) => {
  res.render(path.resolve("./src/views/users/registration.ejs"));
});
