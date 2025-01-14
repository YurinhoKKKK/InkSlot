const express = require('express');
const usuarioController = require('../controllers/usuariosController');
const router = express.Router();

router.get('/', usuarioController.getAll);

router.get('/new', (req, res) => {
    res.send('Formulário de criação');
});

router.get('/:id', usuarioController.getById);

router.get('/:id/edit', (req, res) => {
    res.send(`Formulário de edição para o usuário com ID ${req.params.id}`);
});

router.put('/:id', usuarioController.update);

router.delete('/:id', usuarioController.delete);

module.exports = router;
