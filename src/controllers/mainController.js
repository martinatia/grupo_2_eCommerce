/* Responsabilidad de Martin*/
const fs = require ('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
    index: (req,res) => {
        const inSaleProducts = products.filter((product) => product.section=="in-sale");
        const featuredProducts = products.filter((product) => product.section == "featured");
        const lastColectionProducts = products.filter((product) => product.section == "last-colection");
        res.render('products/index', {inSaleProducts, featuredProducts, lastColectionProducts});
    },
    productDescription:(req, res) =>{
        res.render('products/product-description');
    },
    shoppingCart: (req,res) =>{
        res.render('products/shopping-cart');
    },
    createProduct: (req,res)=>{
        res.render('products/create-product');
    },
    modifyProduct: (req,res) =>{
        const producto = products.find((producto) => producto.id == req.params.id);
        res.render('products/modify-product', {producto})
    },
}
module.exports = controller;