require('express-async-errors')
const express = require('express')
const winston = require('winston')
const config = require('config')
const errorHandler = require('./middlewares/error-handler')
const app = express()

require('./startup/logging')()
require('./startup/database')()
require('./startup/config')()



app.use(express.json())
app.use('/api/v1', require('./routes/index'))
app.use('/api/v1', require('./routes/auth'))
app.use('/api/v1/blog', require('./routes/blog'))
app.use('/api/v1/course', require('./routes/courses'))
app.use('/api/v1/users', require('./routes/user'))
app.use(errorHandler)


const port = config.get('port') || 5000

app.listen(port, function(){
    winston.info(`Server started at http://127.0.0.1:${port}`)
})