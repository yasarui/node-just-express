const express = require("express");
const router = express.Router();
const Course = require('../models/course');
const CourseContext = require('../context/courseContext');
const auth = require('../middlewares/authenticate');

router.get("/api/courses",auth,async (req,res)=>{
    const courses = await CourseContext.getAllCoureses(req.user._id);
    res.status(200).json({courses});
});

router.get("/api/courses/:id",auth,async (req,res)=>{
    const _id = req.params.id;
    const course = await CourseContext.getCourse(_id,req.user._id);
    if(!course) return res.status(404).send();
    res.status(200).json({course});
 });

router.post("/api/courses/",auth,async (req,res)=>{
    const { name } = req.body;
    try{
        const course = await CourseContext.addCourse({name,"student":req.user._id})
        res.status(201).send({course});
    }
    catch(e){
        res.status(400).send(e.message);
    }
});

router.put("/api/courses/:id",auth,async (req,res)=>{
    const _id = req.params.id;
    try{
      const course = await CourseContext.updateCourse(_id,req.user._id,req.body);
      if(!course) return res.status(404).send();
      res.status(200).send({course});
    }catch(e){
      res.status(400).send(e.message);
    }
});

router.delete("/api/courses/:id",auth,async (req,res)=>{
    const _id = req.params.id;
    try{
       const course = await CourseContext.deleteCourse(_id,req.user._id);
       if(!course) return res.status(404).send();
       res.sendStatus(204);
    }catch(e){
       res.status(400).send(e.message);
    }
})

module.exports = router;