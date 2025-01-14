const usuarios = require('../models/usuariosModel');

const usuarioController = {
    getAll: (req, res) => {
        usuarios.getAll((err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(200).json(results);
        });
    },

    // Obter usuário por ID
    getById: (req, res) => {
        const userId = req.params.id;

        usuarios.findById(userId, (err, user) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (!user) {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }
            res.status(200).json(user);
        });
    },

    // Atualizar usuário
    update: (req, res) => {
        const userId = req.params.id;
        const updatedUser = {
            nome: req.body.nome,
            datanasc: req.body.datanasc,
            fone: req.body.fone,
            email: req.body.email,
        };

        usuarios.update(userId, updatedUser, (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (results.affectedRows === 0) {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }
            res.status(200).json({ id: userId, ...updatedUser });
        });
    },

    // Deletar usuário
    delete: (req, res) => {
        const userId = req.params.id;

        usuarios.delete(userId, (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (results.affectedRows === 0) {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }
            res.status(204).send();
        });
    },
};

module.exports = usuarioController;
