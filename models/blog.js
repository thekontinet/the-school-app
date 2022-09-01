const mongoose = require('mongoose')

const BlogSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date,
        required: true
    },
})

const Blog = mongoose.model('blog', BlogSchema)

module.exports = Blog