/* Responsabilidad de Martin*/
const fs = require ('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const controller = {
    index: (req,res) => {
        const inSaleProducts = products.filter((product) => product.section=="in-sale");
        const featuredProducts = products.filter((product) => product.section == "featured");
        const lastColectionProducts = products.filter((product) => product.section == "last-colection");
        res.render('products/index', {inSaleProducts, featuredProducts, lastColectionProducts});
    },
}
module.exports = controller;