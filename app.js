const express=require("express")

require("dotenv").config()
const app=express()
const morgan=require("morgan")
const cookieParser=require("cookie-parser")
const fileUpload=require("express-fileupload")



// import all routes here
const home=require("./routes/home")
const user=require('./routes/user')

// regular middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// cookies and file middleware

app.use(cookieParser())
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/tmp/"
}))

// temp check
app.set('view engine','ejs')

// morgan middleWare
   
app.use(morgan("tiny")) //use morgan before /api/v1 


// router middleware

app.use('/api/v1',home)
app.use('/api/v1/',user)
// app.use('/api/v1/signup',user)
app.get('/signuptest',(req,res)=>{
    res.render('signuptest')

})
// export app js
module.exports=app;