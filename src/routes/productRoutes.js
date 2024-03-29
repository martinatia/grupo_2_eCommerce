const { Router } = require('express');
const controller = require('../controllers/productController');
const adminMiddleware = require('../middlewares/adminMiddleware')
const path = require('path');
const router = Router();

const multer = require('multer');
const multerDiskStorage = multer.diskStorage({
    destination:(req,file,callback) =>{
        const folder = path.join(__dirname, "../../public/img/mercaderia");
        callback(null, folder);
    },
    filename: (req,file,callback) =>{
        let imageName = Date.now() + path.extname(file.originalname);
        callback(null, imageName);
    }
});

const fileUpload = multer({storage: multerDiskStorage});

const routes = {
    // productList: '/',
    createProduct:  '/create-product',
    productDetail:  '/:id',
    postProduct:    '/create-product',
    editProduct:    '/:id/edit-product',
    putProduct:     '/:id',
    deleteProduct:  '/:id'
};

// router.get(routes.productList, controller.list);
router.get(routes.createProduct, adminMiddleware, controller.createProduct);//Listo
router.get(routes.productDetail, controller.productDetail);//Listo
router.post(routes.postProduct, fileUpload.single('imagenProduto'), adminMiddleware, controller.postProduct);//Listo

router.get(routes.editProduct, adminMiddleware, controller.editProduct);//TODO: Ahora
router.put(routes.putProduct, fileUpload.single('imagenProducto'), adminMiddleware, controller.putProduct);
//TODO: NO SE PORQUE NO ENTRA POR EL IF (REQ.FILE) CUANDO SI ESTOY ADJUNTANDO UNA IMAGEN!!!!


router.delete(routes.deleteProduct, controller.deleteProduct);

//TODO: deleteProduct





module.exports = router;
