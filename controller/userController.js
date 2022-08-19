const User =require('../models/user')
const BigPromise =require('../middleware/bigPromise')
const CustomError=require('../utils/customError')
const cookieToken=require('../utils/cookieToken')
const fileupload=require('express-fileupload')
const cloudinary=require('cloudinary')
exports.signup=BigPromise(async(req,res,next)=>{
    let result;
    if (req.files) {
        let file=req.files.photo
         result =await cloudinary.v2.uploader.upload(file.tempFilePath,{
            folder:'users',
            width:150,
            crop:'scale'
        })
        console.log("result 1 :",result)

        
    }
    console.log("result :",result)
    const {name,email,password}=req.body
    if(!email){
        return next(new CustomError('please provide email',400))
    }
    const user=await User.create({
        name,
        email,
        password
        // photo:{
        //     id:result.public_id,
        //     secure_url:result.secure_url
        // }
    })
    cookieToken(user,res)
})