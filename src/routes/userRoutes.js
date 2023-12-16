/* Responsabilidad de Lodi */
const {Router} = require('express');
const router = Router();
const controller = require('../controllers/userController')

const routes = {
    login: '/login',
    registration: '/registration',
}

router.get(routes.login, controller.login);
router.get(routes.registration, controller.registration);


module.exports = router;
