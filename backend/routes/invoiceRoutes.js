const express=require('express');
const router=express.Router();
const jwt=require('jsonwebtoken')
const jwtSecret='aaef4765879adfg579769e'
const userModel=require('../db/userSchema');
const profileModel=require('../db/profile.Schema');
const productModel=require('../db/productSchema')
const nodemailer=require('nodemailer');
const multer=require('multer');
const storage=multer.memoryStorage();
var upload =multer({storage:storage});
require('dotenv').config();

function autenticateToken(req,res,next){
    const authHeader=req.headers['authorization'];
    const token=authHeader && authHeader.split(' ')[1];
    console.log(token)
    if(token==null){
        res.json({"err":1,"msg":"Token not match"})
    }
    else {
        jwt.verify(token,jwtSecret,(err,data)=>{
            if(err){
                res.json({"err":1,"msg":"Token incorrect"})
            }
            else {
                console.log("Match")
                next();
            }
        })
    }
}

router.get('/getuser',(req,res)=>{
 userModel.find({},(err,data)=>{
    if (err) {
        res.json({"err":1,"msg":"Something went wrong"})
    }
    else if(data===null && data.length<=0){
        res.json({"err":1,"msg":"Nothing to add"})
    }
    else{
        res.json({"err":0,"regUser":data})
    }
 })
})

router.post('/reguser',(req,res)=>{
    console.log(req.body);
    let fname=req.body.fname;
    let email=req.body.email
    let lname=req.body.lname;
    let uname=req.body.uname;
    let password=req.body.password;
    let con_password=req.body.con_password;
    let image=req.body.image;
    //insert data
    let ins=new userModel({fname:fname,email:email,lname:lname,uname:uname,password:password,con_password:con_password,image:image});
    ins.save((err)=>{
        if(err){ res.send(err)}
        else{
        console.log("User Added!")
        // res.redirect('/login')
        }
    })
})

router.post('/loguser',(req,res)=>{
    let email=req.body.email;
    let password=req.body.password;
    userModel.findOne({email:email,password:password},(err,data)=>{
        console.log(email);
        if(err){
            res.json({"err":1,"msg":"Email or password is not correct"})
        }
        else if(data==null)
        {
            res.json({"err":1,"msg":"Email or password is not correct"})
        }
        else {
            let payload={
                uid:email
            }
            const token=jwt.sign(payload,jwtSecret,{expiresIn:360000})
            console.log(token)
            res.json({"err":0,"msg":"Login Success",token:token})
        }
        
    })
})

router.post('/addinvoice',(req,res)=>{
    let insert = new productModel({
        rname:req.body.rname,
        remail:req.body.remail,
        raddress:req.body.raddress,
        rdate:req.body.rdate,
        email:req.body.email,
        product:req.body.product,
        status:req.body.status

    })
    insert.save((e)=>{
        console.log(e)
        if(e){
            res.send('Already added')
        }
        else{
            res.send('category added')
        }
    })
})

router.post('/fetchproduct',(req,res) => {
    let email = req.body.email;
    productModel.find({email:email},(err,data)=>{
        if(err) throw err;
        else{
            res.send(data)
        }
    })
})

router.post("/deleteinvoice",(req,res)=>{
    productModel.remove({_id:req.body._id},(err,data)=>{
        if(err) throw err;
        else{
            res.send(data)
        }
    })
})
router.post("/updatepost",(req,res)=>{
    productModel.updateOne({_id:req.body._id},{$set:{status:'PAID'}},(err,data)=>{
        if(err) throw err;
        else{
            res.send(data)
        }
    })
})

router.post('/addpro',(req,res)=>{
    console.log(req.body);
    let item=req.body.item;
    let qty=req.body.qty
    let price=req.body.price;
   
    //insert data
    invoiceModel.find({},(err,data)=>{
        
        if(data===[]){
            let ins=new invoiceModel({product:{item:item,qty:qty,price:price,amount:qty*price}});
            ins.save((err)=>{
                if(err){ res.send(err)}
                else{
                console.log("Prodcut Added!")
                // res.redirect('/login')
                }
            })
        }
        else{
            invoiceModel.updateOne({uid:req.body.uid},{$push: { product: {item:item,qty:qty,price:price,amount:qty*price} }})
        }
    })
    
})

router.get('/getpro',autenticateToken,(req,res)=>{
    invoiceModel.find({},(err,data)=>{
        if (err) {
            res.json({"err":1,"msg":"Something went wrong"})
        }
        else if(data===null && data.length<=0){
            res.json({"err":1,"msg":"Nothing to add"})
        }
        else{
            console.log(data)
            res.json({"err":0,"proData":data})
        }
     })
})

router.post('/sendmail', upload.single('file'), (req,res)=>{
    console.log(process.env.email)
 
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.email,
        pass: process.env.password,
      }
    });
    
    var mailOptions = {
      from: process.env.email,
      to: process.env.email,
      subject: 'Invoice PDF',
      text:
       `
       Dear Customer,

       Your Have Successfully downloaded the pdf.
       
       Thank You!`,
       attachments:[
           {
               filename:"invoice.pdf",
                content:req.file.buffer,
        },
       ]
      
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log("hey");
    } else {
          console.log("hey");
        console.log('Email sent: ' + info.response);
      }
    });
    res.send("Email Sent!")
  })

module.exports=router;