const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/students_info').then(()=>{
    console.log('dbs connected sucessfully')
}).catch((err)=>{
    console.log(err)
});

