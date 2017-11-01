var mongoose = require('mongoose');
var remind = 'reminders';

var remindSchema = mongoose.Schema({
	title:{
		type: String,
		require: true
	},
	description:{
		type: String,
		require:true
	},
	create_date:{
		type: Date,
		default: Date.now
	},
	userId:{
		type: String,
	}
});

var Remind = module.exports = mongoose.model('Remind',remindSchema,remind);

module.exports.getRemind = function(callback, limit){
	Users.find(callback).limit(limit);
}