const { DataTypes } = require('sequelize');
const sq =  require('../config/connection');

const konten = sq.define('konten',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    judulKonten:{
        type:DataTypes.STRING
    },
    gambarKonten:{
        type:DataTypes.STRING
    },
    typeKonten:{
        type:DataTypes.STRING
    },
    modelKonten:{
        type:DataTypes.STRING
    },
    kreatorId:{
        type:DataTypes.INTEGER
    }
},
{
freezeTableName:true
});


// kontens.sync({ alter: true })
module.exports = konten