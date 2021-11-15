const router = require('express').Router()
const user = require('./user')
const masterTags=require('./masterTags')
const konten = require('./konten')



router.use('/user',user)
router.use('/masterTags',masterTags)
router.use('/konten',konten)

module.exports=router