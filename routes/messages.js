/**
 * path: api/messages
 * 
 */
const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getMessages } = require('../controllers/messages');

const router = Router();

router.get('/:from', validarJWT, getMessages);

module.exports = router;