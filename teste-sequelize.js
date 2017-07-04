const sequel = require('sequelize');

const sequelize = new sequel.Sequelize('nodemysql', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
});

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
  }).catch(err => {
    console.error('Unable to connect to the database:', err);
});

const Clientes = sequelize.define('Clientes', {
  nome: {
    type: sequel.Sequelize.STRING
  }
});

Clientes.findAll({
  attributes: ['nome', 'cpf']
});
