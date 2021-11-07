const { DataTypes } = require('sequelize');
const sq =  require('../config/connection');

const masterTags = sq.define('masterTags',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    namamasterTags:{
        type:DataTypes.STRING
    }
},
{
freezeTableName:true
});


// masterTagss.sync({ alter: true })
module.exports = masterTags