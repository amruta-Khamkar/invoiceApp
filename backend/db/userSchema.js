const mongoose=require('mongoose');


const userSchema=new mongoose.Schema({
    fname:{
        type: String,
        required:'This field is required'
    },
    email:{
        type: String,
        required:true,
        unique:true
    },
    lname:{
        type:String,
        required:true        
    },
    uname:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
        unique:true
    },
    con_password:{
        type:String,
        required:true
    },
    image:{
        type:String
    }

})

module.exports=mongoose.model('user',userSchema)