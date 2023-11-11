const mongoose = require('mongoose')
const validator = require('validator')

const studentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:3,
    },
    age:{
        type:Number,
        required:true,
    },
    Hobbies:[String],
    identity:{
        hasPanCard:Boolean,
        hasAdhaarCard:Boolean
    },
    bio:{
        type:String,
        required:false,
    },
    email:{
        type:String,
        required:true,
        unique:[true , 'Email is already present'],
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Invalid Email');
            }
        }
    }
})

const Student = new mongoose.model('Student' , studentSchema)

module.exports = Student ; 