const express = require('express');
const router = express.Router();
const usersAPIController = require('../../controllers/api/usersAPIController');

router.get('/',usersAPIController.list);
router.get('/last_added',usersAPIController.last_added);
router.get('/:id', usersAPIController.detail);


module.exports = router;
