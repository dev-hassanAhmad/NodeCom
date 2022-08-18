const BigPromise=require("../middleware/bigPromise")

exports.home=BigPromise(async(req,res)=>{

    // const db=await connection
    
    res.status(200).json({
        
        success:true,
        greetings:"hello there mate !"
    })
})

exports.homeDummy=BigPromise(async(req,res)=>{
    res.status(200).json({
        success:true,
        greetings:"hello there dummyyy !"
    })
})