/* Responsabilidad de Lodi */
const { Router } = require('express');
const controller = require('../controllers/mainController');
const router = Router();



/* rutas */
const routes = {
    home: '/',
    
};

router.get(routes.home, controller.index);


module.exports = router;
