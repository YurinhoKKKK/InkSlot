const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Usuario = sequelize.define('Usuario', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    nome: { type: DataTypes.STRING(255), allowNull: false },
    fone: { type: DataTypes.STRING(20), allowNull: false },
    email: { type: DataTypes.STRING(50), allowNull: false },
    senha: { type: DataTypes.STRING(255), allowNull: false },
    genero: { type: DataTypes.STRING(50), allowNull: false }
}, {
    tableName: 'usuarios',
    timestamps: false,
});

module.exports = Usuario;
