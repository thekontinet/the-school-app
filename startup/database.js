const mongoose = require('mongoose')
const config = require('config')

module.exports = function(){
    mongoose.connect(config.get('database').url)
    mongoose.connection.on('connected', function(){
        console.log('DB connected');
    })
}