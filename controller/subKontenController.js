const subKonten = require('../model/subKontenModel')
// const poolTags=require('../model/poolTagsModel')

class Controller{


    static register(req,res){
        const{judulSubKonten , gambarSubKonten ,namaGambar ,textKonten , modelSubKonten ,linkSub , nomorSub , kontenId}=req.body
        let f1=""
        if(req.files){
            if(req.files.file1){
                f1 = req.files.file1[0].filename
            }
        }
        subKonten.create({judulSubKonten , gambarSubKonten: f1 ,namaGambar ,textKonten , modelSubKonten ,linkSub , nomorSub , kontenId})
               .then(hasil=>{
                    res.status(200).json({ status: 200, message: "sukses"})
                   })
                   .catch(err=>{
                    res.status(500).json({ status: 500, message: "gagal", data: err})
                   })
    }

    static update(req,res){
        const{judulSubKonten , gambarSubKonten ,namaGambar ,textKonten , modelSubKonten ,linkSub , nomorSub , kontenId}=req.body
        let f1=""
        if(req.files){
            if(req.files.file1){
                f1 = req.files.file1[0].filename
            }
        }
        subKonten.update({judulSubKonten , gambarSubKonten: f1 ,namaGambar ,textKonten , modelSubKonten ,linkSub , nomorSub , kontenId})
               .then(hasil=>{
                    res.status(200).json({ status: 200, message: "sukses"})
                   })
                   .catch(err=>{
                    res.status(500).json({ status: 500, message: "gagal", data: err})
                   })
    }

    static listByKontenId(req,res){
        const {kontenId} = req.body

        subKonten.findAll({
            where:{
                kontenId:kontenId
            }
        }).then(data=>{
            res.status(200).json({ status: 200, message: "sukses", data})
            })
           .catch(err=>{
                res.status(500).json({ status: 200, message: "gagal", data: err });
            })
    }
}

module.exports=Controller