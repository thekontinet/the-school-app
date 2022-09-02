const router = require('express').Router();
const expenseValidator = require('../validators/expense')
const Expense = require('../models/expense');
const auth = require('../middlewares/auth');

router.get('/', auth, async (req, res) => {
    const expenses = await Expense.find()
    res.send(expenses)
});

router.post('/', auth, async (req, res) => {
    let {description, income, amount} = req.body

    let {error} = expenseValidator({description, income, amount})

    if(error){
        return res.status(400).send(error.message)
    }

    amount = Math.abs(amount)
    if (!income){
        amount = amount * -1
    }
    const expense = await Expense.create({description, amount});

    await expense.save()
    res.send(expense)
});

router.delete('/delete/:id', auth, async (req, res, next) => {
   try {
    const _id = req.params.id
     await Expense.findByIdAndDelete(_id)
     return res.send('deleted successfully')
   } catch (error) {
    next(error)
   }
});

router.put('/:id', auth, async (req, res, next) => {
    try {
        let {description, income, amount} = req.body;
        let {error} = expenseValidator({description, income, amount})

        if(error){
            return res.status(400).send(error.message)

        }        const _id = req.params.id


        await Expense.findByIdAndUpdate(_id, {description, income, amount});

        return res.send('update successful')

    } catch (error) {        
        next(error)
    }
});


module.exports = router
