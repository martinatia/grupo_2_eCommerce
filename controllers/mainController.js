/* Responsabilidad de Martin*/
const controller = {
    index: (req,res) => {
        res.render('products/index');
    },
    productDescription:(req, res) =>{
        res.render('products/produc-description');
    },
    carrito: (req,res) =>{
        res.render('products/carrito');
    },
    nuevoProducto: (req,res)=>{
        res.render('products/create-product');
    },
    modifyProducts: (req,res) =>{
        res.render('products/modify-products')
    },
}
module.exports = controller;