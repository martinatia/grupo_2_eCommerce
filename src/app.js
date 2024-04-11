const express = require("express");
const app = express();

const mainRouter = require('./routes/mainRoutes');
const productRouter = require('./routes/productRoutes');
const userRouter = require('./routes/userRoutes');

//Rutas de las APIs
const apiUsersRouter = require('./routes/api/users');
const apiProductsRouter = require('./routes/api/products');
const apiCategoriesRouter = require('./routes/api/categories');

const cors = require('cors');


const rememberMiddleware = require('./middlewares/rememberMiddleware')
const userMiddleware = require('./middlewares/userMiddleware')

const path = require("path");

const session = require('express-session');
const cookieParser = require('cookie-parser');

app.use(express.static("public"));

app.set("view engine", "ejs");
app.set('views', path.resolve(__dirname+'/views'));

app.use(express.urlencoded({extended :false}));
app.use(express.json());

const methodOverride = require('method-override');
app.use(methodOverride('_method'));

app.use(session({secret: 'Secreto en reunion mala educacion', resave: false, saveUninitialized: false}));
app.use(cookieParser());
app.use(rememberMiddleware)
app.use(userMiddleware)

app.use("/",mainRouter);
app.use("/products", productRouter);
app.use("/users",userRouter);


//para la API
app.use("/api/users",apiUsersRouter);
app.use("/api/products",apiProductsRouter);
app.use("/api/categories", apiCategoriesRouter);


app.use(cors());
/*
permite configurar el servidor para que incluya los encabezados CORS 
apropiados en sus respuestas HTTP. Esto permite que los navegadores permitan o 
bloqueen las solicitudes según la configuración definida por el servidor.
*/
app.listen(3001, () => console.log("Servidor corriendo en http://localhost:3001"));




