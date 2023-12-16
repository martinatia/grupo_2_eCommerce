const express = require("express");
const app = express();
const mainRouter = require('./routes/mainRoutes');
const userRouter = require('./routes/userRoutes');
const path = require("path");
app.use(express.static("public"));


app.set("view engine", "ejs");
app.set('views', path.resolve(__dirname+'/views'));

app.use("/",mainRouter);
app.use("/",userRouter);


app.listen(3000, () => console.log("Servidor corriendo"));

