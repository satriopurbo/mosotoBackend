const { DataTypes } = require('sequelize');
const sq =  require('../config/connection');
const konten = require('./kontenModel')

const subKonten = sq.define('subKonten',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    judulSubKonten:{
        type:DataTypes.STRING
    },
    gambarSubKonten:{
        type:DataTypes.STRING
    },
    namaGambar:{
        type:DataTypes.STRING
    },
    textKonten:{
        type:DataTypes.STRING
    },
    modelKonten:{
        type:DataTypes.STRING
    },
    linkSub:{
        type:DataTypes.STRING
    },
    kontenId:{
        type:DataTypes.INTEGER
    },
    nomorSub:{
        type:DataTypes.INTEGER
    }
},
{
freezeTableName:true
});

subKonten.belongsTo(konten)
konten.hasMany(subKonten)

// kontens.sync({ alter: true })
module.exports = konten