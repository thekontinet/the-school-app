const router = require('express').Router()
const auth = require('../middlewares/auth')
const Exam = require('../models/exam')


// MANAGE-EXAMS : MANAGE-EXAMS : MANAGE-EXAMS : MANAGE-EXAMS
// CREATE QUESTIONS
router.post('/manage_exams',auth, async function(req, res, next) {
    try {
      const { question, answer, option1, option2, option3 } = req.body
      const exam = await Exam.create({question, answer, option1, option2, option3})
      await exam.save()
      res.send('Question added to database')
    } catch (error) {
      res.status(500)
      next(new Error(error.message))
    }
  });
  // READ EXAM QUESTIONS
  router.get('/manage_exams',auth, async function(req, res, next) {
    try {
      const {page=1} = req.query
      const paginate = {
        perPage: 1,
        currentPage: page ? page : 1,
        total: await Exam.count(),
        nextPage(){
          return (this.perPage * this.currentPage) >= this.total ? false: Number(this.currentPage) + 1
        },
        prevPage(){
          return this.currentPage <= 1 ? false: Number(this.currentPage) - 1
        }
      }
      let totalNoQuestions = paginate.total
      let questions = []
        questions = await Exam.find({limit: paginate.perPage, offset: paginate.perPage * (paginate.currentPage - 1), order: [['id', 'DESC']]})
        res.send(questions)
    //   return res.json('admin/manage_exams', {questions, totalNoQuestions, paginate})
    } catch (error) {
      res.status(500)
      next(new Error(error.message))
    }
  });
  // UPDATE EXAM QUESTIONS
  router.put('/manage_exams/edit/:id',auth, async function(req,res,next){
    try {
        const id = req.params.id
      const { question, answer, option1, option2, option3 } = req.body
      const manageQuestions =  await Exam.findByIdAndUpdate(id, {question, answer, option1, option2, option3})
      if(!manageQuestions){
        return next("Update not successful")
      }
      res.send('Update successful')
    } catch (error) {
      res.status(500)
      next(new Error(error.message))
    }
  })
  // DELETE EXAM QUESTIONS
  router.delete('/manage_exams/delete/:id',auth, async function(req,res,next){
    try {
        const id = req.params.id
      await Exam.findByIdAndDelete(id)
      res.send('Deleted Succesfully')
    } catch (error) {
      res.status(500)
      next(new Error(error.message))  }
  })

module.exports = router
