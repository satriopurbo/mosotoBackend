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
        const {username,password,nama,alamat,role}= req.body
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
                
                user.create({username,password:encryptedPassword,nama,role,alamat}, {returning: true})
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

    static update(req,res){
        const {nama,alamat,role}= req.body
        
    }
}

module.exports=Controller