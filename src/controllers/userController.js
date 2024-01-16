/* Responsabilidad de Martin */
const controller = {
    login: (req,res) =>{
        res.render('users/login');
    },
    registration:(req, res) =>{
        res.render('users/registration');
    },
    shoppingCart: (req,res)=>{
        res.render('users/shopping-cart');
    }
}
module.exports = controller;