/* Responsabilidad de Lodi */
const {Router} = require('express');
const router = Router();
const controller = require('../controllers/userController')

const routes = {
    /* aqui iria otra pagina como editUser, que reciba un id/edit */
    shoppingCart: '/:id/shopping-cart'
}

router.get(routes.shoppingCart, controller.shoppingCart);


module.exports = router;
