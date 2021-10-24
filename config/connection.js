const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('mosoTo', 'postgres', 'grafika9', {
    host: 'fosan.id',
    port: 5432,
    dialect: 'postgres',
    logging:false,
  });

  module.exports =  sequelize;