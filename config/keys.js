//keys.js figure out what set of cardentials we are in

if(process.env.Node_ENV === 'production'){
// we are in production
module.exports = require('./prod');
}else {
//we are in development
module.exports = require('./dev');
}