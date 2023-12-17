/* Responsabilidad de Martin*/
const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
    // list: (req, res) => {
    //     const inSaleProducts = products.filter((product) => product.section == "in-sale");
    //     const featuredProducts = products.filter((product) => product.section == "featured");
    //     const lastColectionProducts = products.filter((product) => product.section == "last-colection");
    //     res.render('products/index', { inSaleProducts, featuredProducts, lastColectionProducts });
    // },
    editProduct: (req, res) => {
        const producto = products.find((producto) => producto.id == req.params.id);
        res.render('products/edit-product', { producto })
    },
    productDetail:(req, res) =>{
        const id = req.params.id;
        res.render('products/product-description',{id});
    },
    createProduct: (req,res)=>{
        res.render('products/create-product');
    },
    postProduct:(req,res)=>{
        //TODO: 


        //res.redirect(....);
    },
    putProduct:(req,res)=>{
        const id = req.params.id;
        const producto = products.find((producto) => producto.id == req.params.id);
        //debo encontrar los valores nuevos ingresados en el formulario, crear un objeto y actualizar dicho producto....
        //luego redireccionar
        

    },
    deleteProduct:(req,res)=>{
        
    }

}
module.exports = controller;