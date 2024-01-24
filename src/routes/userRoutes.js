/* Responsabilidad de Lodi */
const {Router} = require('express');
const router = Router();
const controller = require('../controllers/userController');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const path = require('path');
const {body} = require('express-validator');

const loginValidations = [
    body('email')
    .notEmpty().withMessage('Por favor completa con un correo electrónico')
    .isEmail().withMessage('Por favor completa con un correo electrónico válido'),
    body('password')
    .notEmpty().withMessage('Por favor completa con una contraseña'),
]

const registrationValidations = [
    body('name')
    .notEmpty().withMessage('Por favor completa con tu nombre y apellido').bail(),
    body('email')
    .notEmpty().withMessage('Por favor completa con un correo electrónico')
    .isEmail().withMessage('Por favor completa con un correo electrónico válido'),
    body('emailConfirmation')
    .notEmpty().withMessage('Por favor completa con un correo electrónico')
    .isEmail().withMessage('Por favor completa con un email válido'),
    body('password')
    .notEmpty().withMessage('Por favor completa con una contraseña válida')
    .isLength({ min: 5 }).withMessage('Por favor completa con una contraseña con mas de 5 caracteres'),
    body('checkbox_terminos_y_condiciones')
    .notEmpty().withMessage('Debes aceptar los Términos y Condiciones para continuar'),
    body('image').custom((value, { req }) => {
        let file = req.file;
        let acceptedExtensions = ['jpg', 'gif', 'png'];

        if(!file){
            throw new Error('Por favor adjunta una imagen');
        }else{
            let fileExtension = path.extname(file.originalname);
            if(!acceptedExtensions.includes(fileExtension)){
                throw new Error(`Las exteciones permitidas son ${acceptedExtensions.join(', ')}`);
            }
        }

        return true;
    })
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
    shoppingCart: '/:id/shopping-cart',
    profiles: '/profiles',
}

router.get(routes.login, guestMiddleware, controller.login);
router.post(routes.login, loginValidations, controller.userLogin)
router.get(routes.registration, guestMiddleware, controller.registration)
router.post(routes.registration, fileUpload.single('image'), registrationValidations, controller.newUser);
router.get(routes.shoppingCart, controller.shoppingCart);
router.get(routes.profiles, authMiddleware, controller.profiles);


module.exports = router;
