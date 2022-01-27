const mongoose=require('mongoose');


const profileSchema=new mongoose.Schema({
    logo:{
        type: String,
        // required:'This field is required'
    },
    email:{
        type: String,
        required:true,
        unique:true
    },
    mobile:{
        type:String,
        required:true        
    },
    bussname:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true,
    }
})

module.exports=mongoose.model('profile',profileSchema)