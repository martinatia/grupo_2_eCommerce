const { Router } = require('express');
const controller = require('../controllers/productController');
const router = Router();

const routes = {
    // productList: '/',
    createProduct: '/create-product',
    productDetail: '/:id/product-description',
    postProduct: '/',
    editProduct: '/:id/edit-product',
    putProduct: '/:id/',
    deleteProduct: '/:id/'
};

// router.get(routes.productList, controller.list);
router.get(routes.createProduct, controller.createProduct);
router.get(routes.productDetail, controller.productDetail);
router.post(routes.postProduct, controller.postProduct);
router.get(routes.editProduct, controller.editProduct);
router.put(routes.putProduct, controller.putProduct);
router.delete(routes.deleteProduct, controller.deleteProduct);

//TODO: putProduct deleteProduct





module.exports = router;
