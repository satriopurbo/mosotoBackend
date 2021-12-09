const user = require('../model/userModel')
const bcrypt= require('../helper/bcrypt')
const jwt = require('../helper/jwt')

function createSuperUser() {
    let adminpass = bcrypt.hashPassword("mosoto")
    user.findOrCreate({

        where: {
            username: "mosoto"
        },
        defaults: {
            password: adminpass,
            role : "superuser"
        }
    })
}

createSuperUser()
class Controller{

    static register(req,res){
        const {username,password,nama,alamat,role,email,noHp}= req.body
        let f1=""
        if(req.files){
            if(req.files.file1){
                f1 = req.files.file1[0].filename
            }
        }
        let  encryptedPassword = bcrypt.hashPassword(password)
        user.findAll({
            where:{
                username:username
            }
        }).then(data=>{
            if(data.length){
                res.status(200).json({ status: 200, message: "username sudah terdaftar"})
            }
            else{
                
                user.create({username,password:encryptedPassword,nama,role,alamat,email,noHp,foto:f1}, {returning: true})
                .then(respon =>{
                res.status(200).json({ status: 200, message: "sukses"})
             })
             .catch(err=>{
                res.status(500).json({ status: 500, message: "gagal", data: err})
             })}
        })
    }

    static login(req,res){
        const{username,password}= req.body
      
        user.findAll({
            where:{
                username:username,
            }
        })
        .then(data=>{
            if(data.length){
            let dataToken ={"id":data[0].id,"password":data[0].password,"role":data[0].role}
            let hasil =  bcrypt.compare(password, data[0].dataValues.password);
                if(hasil){
                        res.status(200).json({status: 200,message: "sukses",token : jwt.generateToken(dataToken),id:data[0].id,role:data[0].role}) 
                }
                else{
                    res.status(200).json({ status: 200, message: "Password Salah"})
                }
            }
            else{res.status(200).json({ status: 200, message: "username Tidak Terdaftar"})}
        })
        .catch(err=>{
            res.status(500).json({ status: 500, message: "gagal", data: err})
        })
    }

    static async update(req,res){
        if(req.files){
            if(req.files.file1){
                await sq.query(`update user SET "foto" ='${req.files.file1[0].filename}' where id = ${req.dataUsers.id}`)
            }
        }
        const {nama,alamat,role,email,noHp}= req.body
        user.update({nama,alamat,role,email,noHp},{
            where:{
                id:req.dataUsers.id
            }
        })
        .then(data=>{
            res.status(200).json({ status: 200, message: "sukses"})
        })
        .catch(err=>{
            res.status(500).json({ status: 500, message: "gagal", data: err})
        })

    }

    static profil(req,res){
        user.findAll({where:{
            id:req.dataUsers.id
        }})
        .then(data=>{
            res.status(200).json({ status: 200, message: "sukses",data})
        })
        .catch(err=>{
            res.status(500).json({ status: 500, message: "gagal", data: err})
        })
    }

    static detailsById(req,res){
        const{id}=req.params
        user.findAll({where:{
            id:id
        }})
        .then(data=>{
            res.status(200).json({ status: 200, message: "sukses",data})
        })
        .catch(err=>{
            res.status(500).json({ status: 500, message: "gagal", data: err})
        })
    }

    static delete(req,res){
        const {id}= req.body
        user.findAll({
            where:{
                id:id
            }
        })
        .then(hasil=>{
            if(hasil.username="puka"){
                res.status(200).json({ status: 200, message: "terlalu Imba, tidak bisa di delete"})
            }
            else{
                user.destroy({
                    where:{
                        id:id
                    }
                })
                .then(data=>{
                    res.status(200).json({ status: 200, message: "sukses",data})
                })
                .catch(err=>{
                    res.status(500).json({ status: 500, message: "gagal", data: err})
                })
            }
        })
    }
}

module.exports=Controller