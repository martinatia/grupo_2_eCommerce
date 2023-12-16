/* Responsabilidad de Lodi */
const { Router } = require('express');
const controller = require('../controllers/mainController');
const router = Router();

/* rutas */
const routes = {
    home: '/',
    productDescription: '/productDescription',
    carrito: '/carrito',
    nuevoProducto: '/create-product',
    modifyProducts: '/producto-modificacion',
}

router.get(routes.home, controller.index);
router.get(routes.productDescription, controller.productDescription);
router.get(routes.carrito, controller.carrito);
router.get(routes.nuevoProducto, controller.nuevoProducto);
router.get(routes.modifyProducts, controller.modifyProducts);


module.exports = router;
