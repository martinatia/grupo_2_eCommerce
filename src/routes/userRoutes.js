/* Responsabilidad de Lodi */
const {Router} = require('express');
const router = Router();
const controller = require('../controllers/userController')
const path = require('path');
const {body} = require('express-validator')

const validations = [
    body('email')
    .notEmpty()
    .isEmail()
    .withMessage('Escribe un email válido'),
    body('pass')
    .notEmpty()
    .isLength({min: 5})
    .withMessage('Escribe una contraseña con mas de 4 caracteres')
]


const multer = require('multer');
const multerDiskStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        const folder = path.join(__dirname, "../../public/img/usersImageProfile");
        callback(null, folder);
    },
    filename: (req, file, callback) => {
        let imageName = Date.now() + path.extname(file.originalname);
        callback(null, imageName);
    }
});

const fileUpload = multer({ storage: multerDiskStorage });

const routes = {
    /* aqui iria otra pagina como editUser, que reciba un id/edit */
    login: '/login',
    registration: '/registration',
    shoppingCart: '/:id/shopping-cart'
}

router.get(routes.shoppingCart, controller.shoppingCart);
router.get(routes.login, controller.login);
router.post(routes.login, validations, controller.userLogin)
router.get(routes.registration, controller.registration)
router.post(routes.registration, fileUpload.single('image'), controller.newUser);


module.exports = router;
