const router = require('express').Router()
const user = require('./user')
const masterTags=require('./masterTags')



router.use('/user',user)
router.use('/masterTags',masterTags)

module.exports=router