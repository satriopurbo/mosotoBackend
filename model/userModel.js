const { DataTypes } = require('sequelize');
const sq =  require('../config/connection');

const user = sq.define('user',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username:{
        type:DataTypes.STRING
    },
    password:{
        type:DataTypes.STRING
    },
    nama:{
        type:DataTypes.STRING
    },
    alamat:{
        type:DataTypes.STRING
    },
    role:{
        type:DataTypes.STRING
    },
    email:{
        type:DataTypes.STRING
    },
    noHp:{
        type:DataTypes.STRING
    },
    foto:{
        type:DataTypes.STRING
    }
},
{
freezeTableName:true
});


// users.sync({ alter: true })
module.exports = user