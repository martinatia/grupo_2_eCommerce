/* Responsabilidad de Lodi */
const { Router } = require('express');
const controller = require('../controllers/mainController');
const router = Router();

/* rutas */
const routes = {
    home: '/',
    productDescription: '/productDescription',
    carrito: '/carrito',
    nuevoProducto: '/nuevo-producto'
}

router.get(routes.home, controller.index);
router.get(routes.productDescription, controller.productDescription);
routes.get(routes.carrito, controller.carrito);
routes.get(routes.nuevoProducto, controller.nuevoProducto);


module.exports = router;
