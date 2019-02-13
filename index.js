const express = require('express');
const app=express();
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
    let subject={
        id:courses.length+1,
        name:req.body.name
    }
    courses.push(subject);
    res.send(subject);
})
const port=process.env.PORT || 3000;
app.listen(port,()=> console.log(`listining on port ${port}.....`));