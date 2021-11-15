const konten = require('../model/kontenModel')
const poolTags=require('../model/poolTagsModel')

class Controller{


    static register(req,res){
        console.log(req.files)
        const{judulKonten,typeKonten,modelKonten,bulkTag}=req.body
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
               .then(hasil2=>{
                   for(let i=0;i<bulkTag.length;i++){
                       bulkTag[i]["kontenId"]=hasil2.id
                   }
                   poolTags.bulkCreate(bulkTag)
                   .then(hasil3=>{
                    res.status(200).json({ status: 200, message: "sukses"})
                   })
                   .catch(err=>{
                    res.status(500).json({ status: 500, message: "gagal", data: err})
                   })
               })
           }
        })
    }
}

module.exports=Controller