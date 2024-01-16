const express = require("express");
const app = express();

const mainRouter = require('./routes/mainRoutes');
const productRouter = require('./routes/productRoutes');
const userRouter = require('./routes/userRoutes');

const path = require("path");

app.use(express.static("public"));


app.set("view engine", "ejs");
app.set('views', path.resolve(__dirname+'/views'));


app.use(express.urlencoded({extended :false}));
app.use(express.json());

const methodOverride = require('method-override');
app.use(methodOverride('_method'));

app.use("/",mainRouter);
app.use("/products", productRouter);
app.use("/users",userRouter);


app.listen(3000, () => console.log("Servidor corriendo"));

