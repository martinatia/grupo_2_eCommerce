/* Responsabilidad de Martin*/
const controller = {
    index: (req,res) => {
        return res.render('index');
    },
    productDescription:(req, res) =>{
        return res.render('product-description');
    },
    carrito: (req,res) =>{
        return res.send('carrito');
    },
    nuevoProducto: (req,res)=>{
        return res.render('nuevo-producto');
    }
}
module.exports = controller;