var mongoose = require('mongoose');
var user = 'users';

var userSchema = mongoose.Schema({
	name:{
		type: String,
		require: true
	},
	email:{
		type: String,
		require:true
	}
});

var Users = module.exports = mongoose.model('Users',userSchema,user);

module.exports.getUsers = function(callback, limit){
	Users.find(callback).limit(limit);
}
