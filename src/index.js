const express = require('express');
const app = express();
const Student = require('./models/students.js')
require('./db/connection.js')
const port = process.env.PORT || 5173

app.use(express.json())
app.get('/' , (req,res)=>{
  res.send('home')
})
//! POST REQUEST
app.post('/students' , async(req,res)=>{
  try{
      const std = new Student(req.body)
      const response = await std.save();
      res.status(201).send(response);
      console.log(req.body)
  }catch(err){
    console.log(err);
  }
})
//GET REQUEST
app.get('/students' , async(req,res)=>{
    try{
       const stdData = await Student.find();
       res.send(stdData)
    }catch(err){
        console.log(err)
    }
})
//GET SINGLE REQUEST BY ID
app.get('/students/:id' , async(req,res)=>{
    try{
     const name = req.params.id;
     const stdDataByName =await Student.findById(name);
     res.send(stdDataByName);
    }catch(err){
        console.log(err)
    }
})
//HANDELING PATCH REQUEST OF AN INDIVIDUAL
app.patch ('/students/:id' , async(req,res)=>{
try{
    const id = req.params.id ;
const update = await Student.findByIdAndUpdate(id , req.body , {
    new:true
});
if(!update){
    return res.status(404).send({error : 'student not found'})
}
res.send(update);
}catch(err){
    console.log(err)
    res.status(400).send({ error: 'Internal Server Error' }); 
}
})
//DELETE DOCUMENT BY ID
app.delete('/students/:id' , async(req,res)=>{
  try{
   const id = req.params.id;
   const deleteStd = await Student.findByIdAndDelete(id)
   if(!deleteStd){
    return res.status(404).send({error : 'cant delete'})
   }
   res.send(deleteStd);
  }catch(err){
    console.log(err);
    res.status(400).send(err)
  }
})


app.listen(port , (err)=>{
    console.log('listening... to the port number' , port)
})