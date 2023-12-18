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
    if (req.file) {//verico que haya adjuntado una imagen
      if (//TODO: falta verificar que haya seleccionado colores y talles... muestra undefined si lo pongo en el if
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
          sizes: req.body.talle,
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
    // const id = req.params.id;
    // const producto = products.find((producto) => producto.id == req.params.id);
    // //debo encontrar los valores nuevos ingresados en el formulario, crear un objeto y actualizar dicho producto....
    // //luego redireccionar
    // let editedProduct = {
    //   id : id,
    //   name: req.body.name,
    //   description: req.body.description,
    //   image: req.file.filename,
    //   category: req.body.category,
    //   colors: req.body.color,
    //   price: req.body.price,
    //   sizes: req.body.talle,
    //   section: req.body.section,
    // };
    // console.log("Producto editado:");
    // console.log(editedProduct);
    // products[id] = editedProduct;
    // fs.writeFileSync(productsFilePath, JSON.stringify(products));

    // res.redirect('/');
    const id = req.params.id;
  var producto = products.find((producto) => producto.id == req.params.id);

  // Verifica si se cargó un nuevo archivo
  let editedProduct;
  console.log("producto original tiene:");
  console.log(producto);
  if (req.file) {
    console.log("viene por el si");
    editedProduct = {
      id: id,
      name: req.body.name || producto.name,
      description: req.body.description || producto.description,
      image: req.file.filename || producto.image, // Actualiza la imagen solo si se carga un nuevo archivo
      category: req.body.category || producto.category,
      colors: req.body.color || producto.colors,
      price: req.body.price || producto.price,
      sizes: req.body.size || producto.sizes,
      section: req.body.section || producto.section,
    };
  } else {
    console.log("viene por el no");
    // Si no se carga un nuevo archivo, conserva la imagen existente

    editedProduct = {
      id: id,
      name: req.body.name || producto.name,
      description: req.body.description || producto.description,
      image: producto.image, // Conserva la imagen existente
      category: req.body.category || producto.category,
      colors: req.body.color || producto.colors,
      price: req.body.price || producto.prices,
      sizes: req.body.talle || producto.sizes,
      section: req.body.section || producto.section,
    };
  }
  let nuevoArreglo = products.map((producto) => {
    if (producto.id == id) {
      console.log("entró en id: "+ id);
      return editedProduct;
    }
    return producto;
  });
  

  console.log("Producto editado:");
  console.log(editedProduct);

  // Actualiza el producto en el array de productos
  fs.writeFileSync(productsFilePath, JSON.stringify(nuevoArreglo));

  res.redirect('/');
  },
  deleteProduct: (req, res) => {},
};

module.exports = controller;
