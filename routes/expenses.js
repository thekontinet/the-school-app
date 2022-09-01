const router = require('express').Router();
const expenseValidator = require('../validators/expense')
const Expense = require('../models/expense');

router.get('/', async (req, res) => {
    const expenses = await Expense.find()
    res.send(expenses)
});

router.post('/', async (req, res) => {
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

router.delete('/delete/:id', async (req, res) => {
   try {
    const id = req.params.id
     await Expense.findByIdAndDelete(id)
     return res.send('deleted successfully')
   } catch (error) {
    console.log(error)
    return res.send('unable to delete')
   }
});

router.put('/:id', async (req, res) => {
    try {
        let {error} = expenseValidator({description, income, amount})

        if(error){
            return res.status(400).send(error.message)
        }
        const id = req.params.id

        let {description, type, amount} = req.body;

        await Expense.findByIdAndUpdate(id, {description, type, amount});

        return res.send('update successful')

    } catch (error) {
        
        return res.send('update unsuccessful')
    }
});


module.exports = router