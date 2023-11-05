const express = require("express");
const app = express();
const path = require("path");

app.listen(3000, () => console.log("Servidor corriendo"));

//Sistema de ruteo
app.get("/", (req, res) => res.send("Pantalla Principal"));
app.get("/carrito", (req, res) => {
  res.send("Carrito"); 
});