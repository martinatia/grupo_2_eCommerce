/* Responsabilidad de Martin */
const controller = {
    login: (req,res) =>{
        res.render('users/login');
    },
    registration:(req, res) =>{
        res.render('users/registration');
    },
}
module.exports = controller;