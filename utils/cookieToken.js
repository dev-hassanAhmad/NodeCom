const cookieToken=async(user,res)=>{

    const token=await user.getJwtToken()
    console.log("token",token)
    const options={
        expire: new Date(
            Date.now()+process.env.COOKIE_TIME
        ),
        httpOnly:true
    }
    user.password=undefined
    res.status(200).cookie('token',token,options).json({
        success:true,
        token,
        user
    })

}



module.exports=cookieToken;