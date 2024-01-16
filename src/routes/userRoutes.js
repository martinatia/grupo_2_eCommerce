/* Responsabilidad de Lodi */
const {Router} = require('express');
const router = Router();
const controller = require('../controllers/userController')

const routes = {
    login: '/login',//creo que va en el main controller
    registration: '/registration',//creo que va en el main controller
    //TODO: MOVER AL MAIN
    /* aqui iria otra pagina como editUser, que reciba un id/edit */
    shoppingCart: '/:id/shopping-cart'

}

router.get(routes.login, controller.login);
router.get(routes.registration, controller.registration);
router.get(routes.shoppingCart, controller.shoppingCart);


module.exports = router;
