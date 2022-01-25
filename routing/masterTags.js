const Controller = require('../controller/masterTagsController')
const router = require('express').Router()
const authentification = require('../middleware/authentification')
const upload= require('../helper/upload')

router.post('/register',authentification,Controller.register)
router.post('/update',authentification,Controller.update)
router.get('/list',authentification,Controller.list)
router.get('/detailsById/:id',authentification,Controller.detailsById)
router.get('/listByKontenId/:id',Controller.listByKontenId)
router.post('/delete',authentification,Controller.delete)



module.exports=router