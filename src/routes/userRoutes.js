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
    .notEmpty().withMessage('Por favor, completa con un correo electrónico.')
    .isEmail().withMessage('Por favor, completa con un correo electrónico válido.'),
    body('password')
    .notEmpty().withMessage('Por favor, completa con una contraseña.'),
]

const registrationValidations = [
    body('firstname')
    .notEmpty().withMessage('Por favor, completa con tu nombre.').bail()
    .isLength({ min: 2 }).withMessage('Por favor completa con un nombre válido'),
    body('surname')
    .notEmpty().withMessage('Por favor, completa con tu apellido.')
    .isLength({ min: 2 }).withMessage('Por favor completa con un nombre válido'),
    body('email')
    .notEmpty().withMessage('Por favor, completa con un correo electrónico.')
    .isEmail().withMessage('Por favor, completa con un correo electrónico válido.'),
    body('emailConfirmation')
    .notEmpty().withMessage('Por favor, completa con un correo electrónico.')
    .isEmail().withMessage('Por favor, completa con un email válido.'),
    body('password').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
    .withMessage([
        'La Contraseña debe tener al menos:',
        '1. una mayúscula.',
        '2. una minúscula.',
        '3. un número.',
        '4. un caracter especial de estos @$!%*?&.',
        '5. 8 caracteres de longitud.'
      ]),
    body('checkbox_terminos_y_condiciones')
    .notEmpty().withMessage('Debes aceptar los Términos y Condiciones para continuar.'),
    body('image').custom((value, { req }) => {
            
            if(!(value == undefined)){
                
                let file = req.file;
                let acceptedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];

                let fileExtension = path.extname(file.originalname);
                if(!acceptedExtensions.includes(fileExtension)){
                    throw new Error(`Las exteciones permitidas son ${acceptedExtensions.join(', ')}.`);
                }

            }
            
        return true;
    })
]

const profileValidations = [
    body('profile-email')
    .isEmail().withMessage('Por favor, completa con un correo electrónico válido.'),
    body('profile-password-current')
    .notEmpty().withMessage('Por favor, complete su contraseña para realizar los cambios')
    .isLength({ min: 8 }).withMessage('Por favor, completa con una contraseña con mas de 8 caracteres.'),
    body('profile-password-new').custom((value, { req }) => {
        // Si el campo profile-password-new está vacío, no se realiza la validación
        if (value === '') {
            return true;
        }

        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  
        // Verificar si la contraseña cumple con el patrón
        if (!regex.test(value)) {
            throw new Error('La contraseña no cumple con los criterios requeridos');
        }
        
        
        return true;
    }),
    body('profile-image').custom((value, { req }) => {
        
        if(!(value == undefined)){

            let file = req.file;
            let acceptedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
            let fileExtension = path.extname(file.originalname);

            if(!acceptedExtensions.includes(fileExtension)){
                throw new Error(`Las exteciones permitidas son ${acceptedExtensions.join(', ')}.`);
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
    
    login: '/login',
    registration: '/registration',
    shoppingCart: '/:id/shopping-cart',
    profile: '/profile',
    logout: '/logout',
    saveData: '/profile'
}

router.get(routes.login, guestMiddleware, controller.login);
router.post(routes.login, loginValidations, controller.userLogin);
router.post(routes.logout, controller.logout);
router.put(routes.saveData, fileUpload.single('profile-image'), profileValidations, controller.saveData);
router.get(routes.registration, guestMiddleware, controller.registration);
router.post(routes.registration, fileUpload.single('image'), registrationValidations, controller.newUser);
router.get(routes.shoppingCart, controller.shoppingCart);
router.get(routes.profile, authMiddleware, controller.profile);


module.exports = router;
