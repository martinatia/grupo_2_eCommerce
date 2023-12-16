/* Responsabilidad de Martin*/
const controller = {
    index: (req,res) => {
        res.render('products/index');
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
        res.render('products/modify-product')
    },
}
module.exports = controller;