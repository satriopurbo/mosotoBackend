const subKonten = require('../model/subKontenModel')
const sq = require("../config/connection")
// const poolTags=require('../model/poolTagsModel')

class Controller{


    static register(req,res){
        const{judulSubKonten , gambarSubKonten ,namaGambar ,textKonten , tipeSub ,linkSub , nomorSub , kontenId}=req.body
        console.log(req.body)
        let f1=""
        if(req.files){
            if(req.files.file1){
                f1 = req.files.file1[0].filename
            }
        }
        subKonten.create({judulSubKonten , gambarSubKonten: f1 ,namaGambar ,textKonten , tipeSub ,linkSub , nomorSub , kontenId})
            .then(hasil=>{
                    res.status(200).json({ status: 200, message: "sukses", data: hasil})
                })
                .catch(err=>{
                    res.status(500).json({ status: 500, message: "gagal", data: err})
                })
    }

    static async update(req,res){

        const{id, judulSubKonten,namaGambar ,textKonten , tipeSub ,linkSub , nomorSub}=req.body
        if(req.files){
            if(req.files.file1){
                await sq.query(`update "subKonten" SET "gambarSubKonten" ='${req.files.file1[0].filename}' where id = ${id}`)
            }
        }
        subKonten.update({judulSubKonten ,namaGambar ,textKonten , tipeSub ,linkSub , nomorSub},{
            where:{
                id:id
            }})
            .then(hasil=>{
                    res.status(200).json({ status: 200, message: "sukses"})
                })
                .catch(err=>{
                    res.status(500).json({ status: 500, message: "gagal", data: err})
                })
    }

    static listByKontenId(req,res){
        const {kontenId} = req.params

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

    static delete (req,res){
        const{id}= req.body

        subKonten.destroy({
            where:{
                id:id
            }
        }).then(data=>{
            res.status(200).json({status:200, message:"sukses", data})
        }).catch(err=>{
            res.status(500).json({status:200, message:"gagal", data: err})
        })

    }
}

module.exports=Controller