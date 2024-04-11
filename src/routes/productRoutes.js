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
    productList:    '/',
    createProduct:  '/create-product',
    productDetail:  '/product-description/:id',
    postProduct:    '/new-product',
    editProduct:    '/edit-product/:id',
    putProduct:     '/modify-product/:id',
    deleteProduct:  '/deleteProduct/:id',
    searchProduct: '/search'
};
router.get(routes.productList, controller.list);

router.get(routes.createProduct, controller.createProduct);//Listo (lleva permiso de administrador)
router.get(routes.productDetail, controller.productDetail);//Listo
router.post(routes.postProduct, fileUpload.single('imagenProduto'), controller.postProduct);//Listo (lleva permiso de administrador)

router.get(routes.editProduct, controller.editProduct);//TODO: Ahora (va con permiso de admin)
router.put(routes.putProduct, fileUpload.single('imagenProducto'), controller.putProduct); //lleva permisos de administrador
//TODO: NO SE PORQUE NO ENTRA POR EL IF (REQ.FILE) CUANDO SI ESTOY ADJUNTANDO UNA IMAGEN!!!!


router.delete(routes.deleteProduct, controller.deleteProduct);
router.get(routes.searchProduct, controller.searchProduct);
//TODO: deleteProduct





module.exports = router;
