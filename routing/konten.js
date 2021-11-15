const Controller = require('../controller/kontenController')
const router = require('express').Router()
const authentification = require('../middleware/authentification')
const upload= require('../helper/upload')

router.post('/register',authentification,Controller.register)




module.exports=router