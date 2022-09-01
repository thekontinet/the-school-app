const auth = require('../middlewares/auth')
const Blog = require('../models/blog')

const router = require('express').Router()


// get all blogs
router.get('/', auth, async (req, res)=>{
    let Blogs = await Blog.find()
    res.json(Blogs)
})

// create a blog post 
router.post('/', async  (req, res)=>{
    const {title, content} = req.body
    
    let blog =  await Blog.create({title, content})
    await blog.save()
    
    return res.send(blog)
})

// update a blog post
router.put('/:id', async (req,res)=>{
    const {title, content} = req.body
    const {id} = req.params
    let blog = await Blog.findOne({_id:id})
     if(!blog){
        return res.send ('id not found')
    }
    let updated = await blog.update({title, content})
    res.send(updated)
})

// delete a blog
router.delete('/:id', async (req,res)=>{
    const {id} = req.params
    let deleted = await Blog.deleteOne({_id:id})
    res.send(deleted)
})

module.exports = router