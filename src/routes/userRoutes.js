/* Responsabilidad de Lodi */
const {Router} = require('express');
const router = Router();
const controller = require('../controllers/userController')
const multer = require('multer');
const path = require('path');

const multerDiskStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        const folder = path.join(__dirname, "../../public/img/userImageProfile");
        callback(null, folder);
    },
    filename: (req, file, callback) => {
        let imageName = Date.now() + path.extname(file.originalname);
        callback(null, imageName);
    }
});

const fileUpload = multer({ storage: multerDiskStorage });

const routes = {
    login: '/login',//creo que va en el main controller
    registration: '/registration',//creo que va en el main controller
    //TODO: MOVER AL MAIN
    /* aqui iria otra pagina como editUser, que reciba un id/edit */
    shoppingCart: '/:id/shopping-cart'
}

router.get(routes.login, controller.login);
router.post(routes.registration, fileUpload.single('image'), controller.registration);
router.get(routes.shoppingCart, controller.shoppingCart);


module.exports = router;
