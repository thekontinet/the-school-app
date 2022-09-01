const mongoose = require('mongoose')

const ExamSchema = mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true,
    },
    option1: {
        type: String,
    },
    option2: {
        type: String,
    },
    option3: {
        type: String,
    },
})

const Exam = mongoose.model('exams', ExamSchema)


module.exports = Exam