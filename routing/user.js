const Controller = require('../controller/userController')
const router = require('express').Router()
const authentification = require('../middleware/authentification')
const upload= require('../helper/upload')

router.post('/register',upload,Controller.register)
router.post('/login',Controller.login)
router.post('/update',authentification,upload,Controller.update)
router.get('/profil',authentification,Controller.profil)
router.get('/detailsById/:id',authentification,Controller.detailsById)
router.post('/delete',authentification,Controller.delete)


module.exports=router