/* Responsabilidad de Martin*/
const fs = require ('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '../data/products.json');
// const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const db = require('../database/models'); 

let productList = db.products;


const controller = {
    index: (req,res) => {
        // const inSaleProducts = products.filter((product) => product.section=="in-sale");
        // const featuredProducts = products.filter((product) => product.section == "featured");
        // const lastColectionProducts = products.filter((product) => product.section == "last-colection");
        // res.render('products/index', {inSaleProducts, featuredProducts, lastColectionProducts,user: req.session.userToLoggedIn});
        productList.findAll()
        .then((products) => {
            console.log(products);
            const inSaleProducts = products.filter((product) => product.product_section=="in-sale").map(product => product.dataValues);
            console.log("Insale:", inSaleProducts);
            const featuredProducts = products.filter((product) => product.product_section=="featured").map(product => product.dataValues);
            const lastColectionProducts = products.filter((product) => product.product_section=="last-colection").map(product => product.dataValues);
            res.render('products/index', {inSaleProducts, featuredProducts, lastColectionProducts,user: req.session.userToLoggedIn});
        })
    },

    // list: (req, res) => {
    //     productList.findAll()
    //     .then((products) => {
    //       res.render('products/list-products', {products})
    //     })
        
    //   }
}
module.exports = controller;