const config = require('config')

module.exports = function(){
    if(!config.get('jwtPrivateKey')){
        throw new Error('JWT private key not defined in config file')
    }
}