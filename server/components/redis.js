var config = require('../config/environment');

if(config.env==='production'){
module.exports = require('redis').createClient(6379,'honours.ijgyff.0001.apse2.cache.amazonaws.com');

}
	else{
module.exports = require('redis').createClient();
}
