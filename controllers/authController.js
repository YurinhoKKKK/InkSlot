const bcrypt = require('bcrypt');
const usuarios = require('../models/usuariosModel');

const authController = {
  login: async (req, res) => {
    const { email, senha } = req.body;
    try {
      const user = await usuarios.findOne({ where: { email } });

      if (!user || !(await bcrypt.compare(senha, user.senha))) {
        return res.render('index', { errorMessage: 'Usuário ou senha incorretos' });
      }

      req.session.userId = user.id;
      req.session.user = user;

      res.redirect('/');
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  cadastro: async (req, res) => {
    const { nome, genero, fone, email, senha } = req.body;
  
    if (!nome || !genero || !fone || !email || !senha) {
      return res.render('cadastro', { errorMessage: 'Todos os campos são obrigatórios' });
    }
  
    const userExists = await usuarios.findOne({ where: { email } });
    if (userExists) {
      return res.render('cadastro', { errorMessage: 'Email já cadastrado' });
    }
  
    try {
      const salt = await bcrypt.genSalt(10);
      const senhaHash = await bcrypt.hash(senha, salt);
  
      const newUser = { nome, genero, fone, email, senha: senhaHash };
  
      const createdUser = await usuarios.create(newUser);
  
      req.session.userId = createdUser.id;
      req.session.user = newUser;
  
      res.redirect('/');
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },  

  logout: (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(200).json({ message: 'Logout realizado com sucesso' });
    });
  },

  checkSession: (req, res) => {
    if (req.session && req.session.userId) {
      res.status(200).json({
        isAuthenticated: true,
        userId: req.session.userId,
        userName: req.session.userName,
      });
    } else {
      res.status(200).json({ isAuthenticated: false });
    }
  },
};

module.exports = authController;
