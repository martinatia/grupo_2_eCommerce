/* Responsabilidad de Lodi */
const {Router} = require('express');
const router = Router();
const controller = require('../controllers/userController')

const routes = {
    login: '/login',//creo que va en el main controller
    registration: '/registration',//creo que va en el main controller
    /* aqui iria otra pagina como editUser, que reciba un id/edit */
    shoppingCart: '/:id/shopping-cart'

}

router.get(routes.login, controller.login);
router.get(routes.registration, controller.registration);


module.exports = router;
