/* Responsabilidad de Lodi */
const { Router } = require('express');
const controller = require('../controllers/mainController');
const router = Router();
/* rutas */
const routes = {
    home: '/',
    productDescription: '/product-description',
    shoppingCart: '/shopping-cart',
    createProduct: '/create-product',
    modifyProduct: '/modify-product/:id',
};

router.get(routes.home, controller.index);
router.get(routes.productDescription, controller.productDescription);
router.get(routes.shoppingCart, controller.shoppingCart);
router.get(routes.createProduct, controller.createProduct);
router.get(routes.modifyProduct, controller.modifyProduct);



module.exports = router;
