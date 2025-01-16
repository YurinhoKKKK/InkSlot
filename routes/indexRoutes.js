const express = require('express');
const router = express.Router();

// Rota inicial
router.get('/', function (req, res, next) {
  res.render('index');
});


router.get('/home', function (req, res) {
  res.render('home');
});

router.get('/camila', function (req, res) {
  res.render('camila');
});

router.get('/pedro', function (req, res) {
  res.render('pedro');
});

router.get('/laura', function (req, res) {
  res.render('laura');
});

router.get('/cadastro', function (req, res) {
  res.render('cadastro');
});

router.get('/login', function (req, res) {
  res.render('login');
});




module.exports = router;
