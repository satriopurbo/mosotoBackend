const masterTags= require('../model/masterTagsModel')

class Controller{

        static register(req,res){
            const{namaTags}=req.body
            masterTags.findAll({where:{
                namaTags:namaTags
            }})
            .then(hasil=>{
                if(hasil.length){
                    res.status(200).json({ status: 200, message: "data sudah ada" });
                }
                else{
                    masterTags.create({namaTags})
                    .then(data=>{
                        res.status(200).json({ status: 200, message: "sukses" });
                    })
                }
            })
        }

        static update(req,res){
            const{id,namaTags}=req.body
            masterTags.findAll({where:{
                namaTags:namaTags
            }})
            .then(hasil=>{
                if(hasil.length){
                    res.status(200).json({ status: 200, message: "data sudah ada" });
                }
                else{
                    masterTags.update({namaTags},{where:{
                        id:id
                    }})
                    .then(data=>{
                        res.status(200).json({ status: 200, message: "sukses" });
                    })
                }
            })
            .catch(err=>{
                res.status(500).json({ status: 200, message: "gagal", data: err });
            })
        }

        static list(req,res){
           masterTags.findAll({})
           .then(data=>{
            res.status(200).json({ status: 200, message: "sukses",data})
            })
           .catch(err=>{
                res.status(500).json({ status: 200, message: "gagal", data: err });
            })
        }

        static detailsById(req,res){
            const {id}= req.params
            masterTags.findAll({where:{
                id:id
            }})
            .then(data=>{
             res.status(200).json({ status: 200, message: "sukses",data})
             })
            .catch(err=>{
                 res.status(500).json({ status: 200, message: "gagal", data: err });
             })
         }
        
        static delete(req,res){
            const{id}= req.body
            masterTags.destroy({where:{
                id:id
            }})
            .then(data=>{
                res.status(200).json({ status: 200, message: "sukses"})
                })
            .catch(err=>{
                    res.status(500).json({ status: 200, message: "gagal", data: err });
                })
        }


}

module.exports=Controller