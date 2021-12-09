const router = require('express').Router()
const user = require('./user')
const masterTags=require('./masterTags')
const konten = require('./konten')
const subKonten = require('./subKonten')



router.use('/user',user)
router.use('/masterTags',masterTags)
router.use('/konten',konten)
router.use('/subKonten',subKonten)

module.exports=router