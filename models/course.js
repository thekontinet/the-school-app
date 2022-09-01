const mongoose = require('mongoose')

const CourseSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    teacher: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date,
        required: true
    },
})

const Course = mongoose.model('course', CourseSchema)

module.exports = Course