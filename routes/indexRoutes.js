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



module.exports = router;
