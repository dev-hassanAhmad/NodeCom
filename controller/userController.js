const User =require('../models/user')
const BigPromise =require('../middleware/bigPromise')




exports.signup=BigPromise(async(req,res,next)=>{
    // 
    res.status(200).send({
        message:"all good"
    })
})