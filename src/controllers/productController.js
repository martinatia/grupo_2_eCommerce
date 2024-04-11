/* Responsabilidad de Martin*/
const fs = require("fs");
const path = require("path");
const productsFilePath = path.join(__dirname, "../data/products.json");
const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
const db = require('../database/models'); 
const { log } = require("console");

const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

let productList = db.products;
let categoriesList = db.categories;
let sizesList = db.sizes;
let stockList = db.stock;
let brandList = db.brands

const controller = {
  list: (req, res) => {
    const products = productList.findAll()
    const product = productList.findByPk(req.params.id)
    
    Promise.all([products, product])
    .then(([products, product]) => {
      res.render('products/list-products', {products: products, product: product})
    })
    
  },
  editProduct: (req, res) => {
    //const producto = products.find((producto) => producto.id == req.params.id);
    const producto = productList.findByPk(req.params.id);
    const categorias = categoriesList.findAll();
    const talles = sizesList.findAll();
    const stock = stockList.findAll();
    const marcas = brandList.findAll();

    
    
    Promise.all([producto, categorias, talles, stock, marcas])
    .then(([product, categories, sizes, stock, brands]) => {
      res.render("products/edit-product", 
      { 
        product: product, 
        categories: categories, 
        sizes: sizes, 
        stock: stock,
        brands: brands 
      });
    }) 

  },
  productDetail: (req, res) => {
    // const product = products.find((product) => product.id == req.params.id);
    db.products.findByPk(req.params.id)
    .then((product)=>{
      res.render("products/product-description", { product });
    });
    
  },
  createProduct: (req, res) => {
    const marcas = brandList.findAll();
    const categorias = categoriesList.findAll();
    const talles = sizesList.findAll();
    
    Promise.all([marcas, categorias, talles]) 
    .then(([brands, categories, sizes]) => {
      res.render("products/create-product", {brands: brands, categories: categories, sizes: sizes});
    })
    .catch((error => {console.log(error)}))
    
  },
  postProduct: (req, res) => {
    const productos = productList.findAll();
    const categorias = categoriesList.findAll();
    const talles = sizesList.findAll();
    const stock = stockList.findAll();
    const marcas = brandList.findAll();

    Promise.all([productos, categorias, talles, stock, marcas])
    .then(([productos, categorias, talles, stock, marcas]) => {
    
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
          //const lastIdSaved = products[products.length - 1].id;
    
          let categoryId;
          let brandId;
          let sizeId;
          let productId;
          let stockProduct = false;
          let productInStock = false;
  
          // verifica la categoria en la base de datos sea la misma que la categoria que trae el body, si es asi, guarda el id de la categoria traida de la base de datos en la variable categoryId
          for(let i = 0; i < categorias.length; i++){
            if(categorias[i].category_description == req.body.category){
              categoryId = categorias[i].category_id;
            }
          }
  
          //verifica que la marca del producto que viene en el body sea igual al de la base de datos, y en ese caso guarda el id de esa marca en la variable brandId
          for(let i = 0; i < marcas.length; i++){
            if(marcas[i].brand_name == req.body.brands){
              brandId = marcas[i].brand_id;
            }
          }
          
          for(let i = 0; i < productos.length; i++){
            if(req.body.name == productos[i].product_name){
              productId = productos[i].product_id;
              productInStock = true; 
            }else{
              productId = productos.length + 1;
            }
          }

          if(!productInStock){
            productList.create({
              product_name: req.body.name,
              product_description: req.body.description,
              product_image_url: req.file.filename,
              product_price: req.body.price,
              product_section: req.body.section,
              category_id: categoryId,
              brand_id: brandId
            })
          }
          
          
          //verifica que el talle que viene en el body se igual al de la base de datos en la table sizes, si es asi guarda el id de ese talle en la variable sizeId
          for(let i = 0; i < talles.length; i++){
            if(req.body.talle == talles[i].size_name){
              sizeId = talles[i].size_id
            }
          }
          
          //verifica que el id de guardado en la variable sizeId sea igual al id que contiene la columna size:id de la tabla stock, si es igual incrementa en 1 la cantidad de 
          for(let i = 0; i < stock.length; i++){
            if(productId == stock[i].product_id){
              if(sizeId == stock[i].size_id){
                stockList.update({
                  
                  quantity: stock[i].quantity + 1
                  
                },{
                  where:{
                    product_id: productId,
                    size_id: sizeId
                  }
                })
                stockProduct = true;
                break;
              }
            }
          }
          if(!stockProduct){
            stockList.create({
              product_id: productId,
              size_id: sizeId, 
              quantity: 1
            })
          }
          
          
          /* 
          products.push(producto);
          fs.writeFileSync(productsFilePath, JSON.stringify(products)); 
          */
          
          res.redirect("/products");
        } else {
          res.send("Por favor complete los campos solicitados");
        }
      } else {
        res.send("no adjuntaste ninguna imagen");
      }
    
    })
    .catch((error) => {console.log(error)})
    
    
  },
  putProduct: (req, res) => {
    const id = req.params.id;
    //var producto = products.find((producto) => producto.id == req.params.id);
    // Verifica si se cargó un nuevo archivo

    const productos = productList.findAll();
    const categorias = categoriesList.findAll();
    const marcas = brandList.findAll();

    Promise.all([productos, categorias, marcas])
    .then(([productos, categorias, marcas]) => {
        
      let categoryId;
      let brandId;
      let img;

      if (req.file) {
        img = req.file.filename
      }else{
        img = productos.product_image_url
      }
        
      for(let i = 0; i < categorias.length; i++){
        if(categorias[i].category_description == req.body.categoria){
          categoryId = categorias[i].category_id;
        }
      }
  
      //verifica que la marca del producto que viene en el body sea igual al de la base de datos, y en ese caso guarda el id de esa marca en la variable brandId
      for(let i = 0; i < marcas.length; i++){
        if(marcas[i].brand_name == req.body.brands){
          brandId = marcas[i].brand_id;
        }
      }
        
      productList.update({
        product_name: req.body.name,
        product_description: req.body.description,
        product_image_url: img, 
        product_price: req.body.price,
        product_section: req.body.seccion,
        category_id: categoryId,
        brand_id: brandId,
      },{
        where:{
          product_id: id
        }
      });
    })
    
    res.redirect("/products");
  },
  addStockProduct: (req, res) => {
    res.send('añadiendo stock')
  },
  deleteProduct: (req, res) => {
    
    //no me deja eliminar ya que es una foreingkey de otra tabla
    console.log(req.params.id)
    productList.destroy({
      where:{
        product_id: req.params.id
      }
    })
    
    /* 
    
    console.log("viene por delete!!!");
    const idProductoAAliminar = req.params.id;
    console.log("id producto :" + idProductoAAliminar);
    const updatedProducts = products.filter(product => product.id != idProductoAAliminar);

    if (updatedProducts.length === products.length) {
      return res.send("no se eliminó el producto");
    }
    fs.writeFileSync(productsFilePath, JSON.stringify(updatedProducts));
    
    */
    
    res.redirect("/products");

  },
  searchProduct: async (req, res) => {
    console.log("Hola")
    try {
      const searchQuery = req.query.q;
      const foundProducts = await db.products.findAll({
        where: {
          product_name: {
            [db.Sequelize.Op.like]: `%${searchQuery}%`
          }
        }
      });
      
      res.render('products/resultadoBusqueda', { products: foundProducts });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error interno del servidor');
    }
  }
};


module.exports = controller;
