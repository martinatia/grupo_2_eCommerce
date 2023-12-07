/* Responsabilidad de Martin*/
const controller = {
    index: (req,res) => {
        res.render('index');
    },
    productDescription:(req, res) =>{
        res.render('produc-description');
    },
    carrito: (req,res) =>{
        res.send('carrito');
    },
    nuevoProducto: (req,res)=>{
        res.render('nuevo-producto');
    }
}
module.exports = controller;