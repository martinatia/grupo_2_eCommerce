/* Responsabilidad de Martin*/
const fs = require("fs");
const path = require("path");
const productsFilePath = path.join(__dirname, "../data/products.json");
const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
const db = require('../database/models'); 

const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

let productList = db.products;
let categoriesList = db.categories;
let sizesList = db.sizes;
let stockList = db.stock;

const controller = {
  list: (req, res) => {
    productList.findAll()
    .then((products) => {
      res.render('products/list-products', {products})
    })
    
  },
  editProduct: (req, res) => {
    //const producto = products.find((producto) => producto.id == req.params.id);
    const producto = productList.findByPk(req.params.id);
    const categorias = categoriesList.findAll();
    const talles = sizesList.findAll();
    const stock = stockList.findAll();

    
    
    Promise.all([producto, categorias, talles, stock])
    .then(([product, categories, sizes, stock]) => {
      res.render("products/edit-product", 
      { 
        product: product, 
        categories: categories, 
        sizes: sizes, 
        stock: stock 
      });
    }) 

  },
  productDetail: (req, res) => {
    const product = products.find((product) => product.id == req.params.id);
    res.render("products/product-description", { product });
  },
  createProduct: (req, res) => {
    res.render("products/create-product");
  },
  postProduct: (req, res) => {
    if (req.file) {
      //verico que haya adjuntado una imagen
      if (
        //TODO: falta verificar que haya seleccionado colores y talles... muestra undefined si lo pongo en el if
        req.body.name &&
        req.body.description &&
        req.body.category &&
        req.body.price &&
        req.body.section
      ) {
        //verifico que no haya dejado ningun campo sin completar
        const lastIdSaved = products[products.length - 1].id;
        console.log(req.body);
        let producto = {
          id: lastIdSaved + 1,
          name: req.body.name,
          description: req.body.description,
          image: req.file.filename,
          category: req.body.category,
          colors: req.body.color,
          price: req.body.price,
          sizes: req.body.size,
          section: req.body.section,
        };
        products.push(producto);
        fs.writeFileSync(productsFilePath, JSON.stringify(products));
        res.redirect("/");
      } else {
        res.send("Por favor complete los campos solicitados");
      }
    } else {
      res.send("no adjuntaste ninguna imagen");
    }
  },
  putProduct: (req, res) => {
    const id = req.params.id;
    var producto = products.find((producto) => producto.id == req.params.id);
    console.log("estoy aqui:");
    console.log(req.body);
    console.log("file...");
    console.log(req.file);
    // Verifica si se cargó un nuevo archivo
    let editedProduct;
    console.log("producto original tiene:");
    console.log(producto);
    if (req.file) {
      console.log("está entrando con imagen");
      editedProduct = {
        id: id,
        name: (req.body.name)? req.body.name : producto.name,
        description: (req.body.description)? req.body.description : producto.description,
        image: req.file.filename, 
        category: (req.body.categoria)? req.body.categoria : producto.category,
        colors: (req.body.colors)? req.body.colors : producto.colors,
        price: (req.body.price)? req.body.price : producto.prices,
        sizes: (req.body.sizes)? req.body.sizes : producto.size,
        section: (req.body.seccion)? req.body.seccion : producto.section,
      };

    } else {
      console.log("viene por el no");
      // Si no se carga un nuevo archivo, conserva la imagen existente

      editedProduct = {
        id: id,
        name: (req.body.name)? req.body.name : producto.name,
        description: (req.body.description)? req.body.description : producto.description,
        image: producto.image, // Conserva la imagen existente
        category: (req.body.categoria)? req.body.categoria : producto.category,
        colors: (req.body.colors)? req.body.colors : producto.colors,
        price: (req.body.price)? req.body.price : producto.prices,
        sizes: (req.body.sizes)? req.body.sizes : producto.size,
        section: (req.body.seccion)? req.body.seccion : producto.section,
      };
    }
    let nuevoArreglo = products.map((producto) => {
      if (producto.id == id) {
        console.log("entró en id: " + id);
        return editedProduct;
      }
      return producto;
    });

    console.log("Producto editado:");
    console.log(editedProduct);

    // Actualiza el producto en el array de productos
    fs.writeFileSync(productsFilePath, JSON.stringify(nuevoArreglo));

    res.redirect("/");
  },
  addStockProduct: (req, res) => {
    res.send('añadiendo stock')
  },
  deleteProduct: (req, res) => {
    console.log("viene por delete!!!");
    const idProductoAAliminar = req.params.id;
    console.log("id producto :" + idProductoAAliminar);
    const updatedProducts = products.filter(product => product.id != idProductoAAliminar);

    if (updatedProducts.length === products.length) {
      return res.send("no se eliminó el producto");
    }
    fs.writeFileSync(productsFilePath, JSON.stringify(updatedProducts));
    res.redirect("/");

  },
  searchProduct: async (req, res) => {
    try {
      const searchQuery = req.query.q;
      const foundProducts = await db.products.findAll({
        where: {
          product_name: {
            [db.Sequelize.Op.like]: `%${searchQuery}%`
          }
        }
      });
      res.render('resultadoBusqueda', { products: foundProducts });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error interno del servidor');
    }
  }
};


module.exports = controller;
