/* Responsabilidad de Martin*/
const fs = require("fs");
const path = require("path");
const productsFilePath = path.join(__dirname, "../data/products.json");
const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
  editProduct: (req, res) => {
    const producto = products.find((producto) => producto.id == req.params.id);

    res.render("products/edit-product", { producto });
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
};

module.exports = controller;
