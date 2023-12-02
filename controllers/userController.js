/* Responsabilidad de Martin */
const controller = {
    login: (req,res) =>{
        return res.send('login');
    },
    registration:(req, res) =>{
        return res.render('registration');
    }    
}
module.exports = controller;