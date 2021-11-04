const konten = require('../model/kontenModel')
const poolTags=require('../model/poolTagsModel')

class Controller{


    static register(req,res){
        const{judulKonten,typeKonten,modelKonten}=req.body
        let f1=""
        if(req.files){
            if(req.files.file1){
                f1 = req.files.file1[0].filename
            }
        }

        konten.findAll({where:{
            judulKonten:judulKonten
        }})
        .then(hasil=>{
           if(hasil.length){
            res.status(200).json({ status: 200, message: "judul sudah ada" })
           }
           else{
               konten.create({judulKonten,typeKonten,modelKonten,kreatorId:req.dataUsers.id,gambaKonten:f1})
           }
        })
    }
}

module.exports=Controller