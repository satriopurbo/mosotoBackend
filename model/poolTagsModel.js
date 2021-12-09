const { DataTypes } = require('sequelize');
const sq =  require('../config/connection');
const konten = require('./kontenModel')
const masterTags = require('./masterTagsModel')

const poolTags = sq.define('poolTags',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
},
{
freezeTableName:true
});

poolTags.belongsTo(konten)
konten.hasMany(poolTags)

poolTags.belongsTo(masterTags)
masterTags.hasMany(poolTags)

// poolTagss.sync({ alter: true })
module.exports = poolTags