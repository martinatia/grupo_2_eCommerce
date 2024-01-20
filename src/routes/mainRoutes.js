/* Responsabilidad de Lodi */
const { Router } = require('express');
const controller = require('../controllers/mainController');
const router = Router();
const path = require('path');


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


/* rutas */
const routes = {
    home: '/',
    login: '/login',
    registration: '/registration',
};

router.get(routes.home, controller.index);
router.get(routes.login, controller.login);
router.post(routes.login, controller.userLogin)
router.get(routes.registration, controller.registration)
router.post(routes.registration, fileUpload.single('image'), controller.newUser);


module.exports = router;
