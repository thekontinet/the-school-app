const auth = require('../middlewares/auth')
const Course = require('../models/course')

const router = require('express').Router()


// get all courses
router.get('/', async (req, res)=>{
    let courses = await Course.find()
    res.send(courses)
})

// create a course  
router.post('/', async  (req, res)=>{
    const {title, description, teacher} = req.body
    
    let course =  await Course.create({title, description, teacher})
    await course.save()
    
    return res.send(course)
})

// update a course 
router.put('/:id', async (req,res)=>{
    const {title, description, teacher} = req.body
    const {id} = req.params
    let course = await Course.findOne({_id:id})
     if(!course){
        return res.send ('id not found')
    }
    let updated = await course.update({title, description, teacher})
    res.send(updated)
})

// delete a course
router.delete('/:id', async (req,res)=>{
    const {id} = req.params
    let deleted = await Course.deleteOne({_id:id})
    res.send(deleted)
})

module.exports = router