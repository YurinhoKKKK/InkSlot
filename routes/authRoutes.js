const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

router.post('/login', authController.login);

router.post('/cadastro', authController.cadastro);

router.get('/cadastro', function (req, res) {
    res.render('cadastro');
});


router.post('/logout', authController.logout);

router.get('/session', authController.checkSession);

module.exports = router;