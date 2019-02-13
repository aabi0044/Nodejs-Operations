const express = require('express');
const app=express();
const Joi=require('joi');
app.use(express.json());
const courses=[
    {id: 1 ,name:'course1'},
    {id: 2 ,name:'course2'},
    {id: 3 ,name:'course3'}
]
app.get('/',(req,res)=>{
    res.send('Hello World');
});
app.get('/api/course',(req,res)=>{
    res.send(courses);
});
app.get('/api/course/:id',(req,res)=>{
  const course= courses.find(e=>e.id===parseInt( req.params.id));
  if(!course)
      res.status(404).send('this course is not available');

      res.send(course);
  
});
app.post('/api/courses',(req,res)=>{
 const {error}=validateCourse(req.body);
       if(error.details[0].message){
        res.status(404).send( error.details[0].message);
        return;
    }
    let subject={
        id:courses.length+1,
        name:req.body.name
    }
    courses.push(subject);
    res.send(subject);
});
app.put('/api/courses/:id',(req,res)=>{
    const course=courses.find(e=>e.id ===parseInt(req.params.id));
    if(!course) {
        res.status(404).send('ID id not existed');
    }
   const {error}= validateCourse(req.body);

     if(error){
        res.status(404).send(error.details[0].message);
        return;
    }
    course.name=req.body.name;
    res.send(course);
})
const port=process.env.PORT || 3000;
app.listen(port,()=> console.log(`listining on port ${port}.....`));
function validateCourse(course){
    const schema={
        name:Joi.string().min(3).required()
    };
return Joi.validate(course,schema);
}