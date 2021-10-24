var multer  = require('multer')


const storage = multer.diskStorage({
    destination:'./asset/file/',
    filename:function(req,file,cb){
        cb(null,Date.now()+file.originalname)
        //  console.log(file)
    }
})

const upload=multer({
    storage:storage
}).fields([{ name: 'file1'}])

module.exports = upload