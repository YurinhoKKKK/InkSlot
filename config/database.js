const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();


const sequelize = new Sequelize(
    'inkslot',  
    'root',       
    'aluno01',  
    {
        host: '127.0.0.1',
        port: '3307',   
        dialect: 'mysql',           
        logging: console.log,      
    }
);

sequelize.authenticate()
    .then(() => {
        console.log('Conexão com o banco de dados MySQL foi bem-sucedida.');
    })
    .catch((err) => {
        console.error('Erro ao conectar-se ao banco de dados:', err);
    });

module.exports = sequelize;
