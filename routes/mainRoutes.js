/* Responsabilidad de Lodi */
const {Router} = require('express');
const controller = require('../controllers/mainController');
const router = Router();


const routes = {
    home: '/',
    productDescription: '/productDescription',
    carrito: '/carrito',
}

router.get(routes.home, controller.index);
router.get(routes.productDescription, controller.productDescription);
routes.get(routes.carrito, controller.carrito);
