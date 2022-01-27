const express=require('express');
const cors=require('cors');
const mongoose=require('mongoose');
const PORT=9000;
const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(cors());

//db connection
const db="mongodb://localhost:27017/invoice_app";
const connectDB=async()=>{
    try{
        await mongoose.connect(db,{useNewUrlParser:true});
        console.log("MOngoDB connected");
    }
    catch(err){
        console.log(err.message);
    }
}
connectDB();
//end

// const userModel=require('./db/userSchema')
//routes
//load routes
const invoiceRoutes=require('./routes/invoiceRoutes');
const { urlencoded } = require('express');
app.use('/api/user',invoiceRoutes);

app.listen(PORT,(err)=>{
    if (err) throw err
    console.log(`Work on ${PORT}`);
})