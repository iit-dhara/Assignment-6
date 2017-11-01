var express = require('express'),
	mongoose = require('mongoose'),
	bodyParser = require('body-parser');

mongoose.connection.on('open', function (ref) {
  console.log('Connected to mongo server.');
});
mongoose.connection.on('error', function (err) {
  console.log('Could not connect to mongo server!');
  console.log(err);
});	

var db = mongoose.connect('mongodb://localhost/usersData',{
	useMongoClient: true
});

var User = require('./models/users');

var Remind = require('./models/reminders');

var app = express();

var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended:true}));

app.use(bodyParser.json());

console.log(mongoose.connection.readyState);

app.post('/users',function(req,res){
	var user = new User(req.body);

	console.log(user);
	user.save().then(item => {
	 console.log("item saved to database");
	 });
	res.status(200).send(user);
});

app.get('/users',function(req,res){
 	var query = req.query; 
	
	User.find(query,function(err, user1){
		if(err){
			res.status(404).send(err);
		}
		else{
			console.log(mongoose.connection.readyState);
			res.json(user1);
		}
	});
});

app.get('/users/:userId',function(req,res){
 	User.findById(req.params.userId,function(err, userid){
		if(err){
			res.status(404).send(err);
		}
		else{
			console.log(mongoose.connection.readyState);
			res.status(200).json(userid);
		}
	});
});

app.post('/users/:userId/reminders',function(req,res){
	var use1 = User.findById(req.params.userId);
	if (use1){
		var remind = new Remind(req.body);

		console.log(remind);
		remind.save().then(item => {
		 console.log("item saved to database");
		 });
		res.status(200).send(remind);
	}
});

app.get('/users/:userId/reminders',function(req,res){
	var use1 = User.findById(req.params.userId);
	 	var query = req.query; 
	if(use1){
		Remind.find(query,function(err, rem){
		if(err){
			res.status(404).send(err);
		}
		else{
			console.log(mongoose.connection.readyState);
			res.json(rem);
		}
		});
	} 		
});


app.get('/users/:userId/reminders/:remindId',function(req,res){
	var use1 = User.findById(req.params.userId);
	 	var query = req.query; 
	if(use1){
		Remind.find(query,function(err, rem){
		if(err){
			res.status(404).send(err);
		}
		else{
			Remind.findById(req.params.remindId,function(err,remind1){
				if(err){
				res.status(404).send(err);
			}
			else{
				res.status(200).json(remind1);
			}
			})
		}
		});
	} 		
});


app.get('/users/:userId/reminders',function(req,res){
	var use1 = User.findById(req.params.userId);
	 	var query = {}; 
	if(req.query.title){
		query.title = req.query.title;
	}

	Remind.find(query,function(err, rem){
		if(err){
			res.status(404).send(err);
		}
		else{
			console.log(mongoose.connection.readyState);
			res.json(rem);
		}
	});
});

app.delete('/users/:Userid',function(req,res){
	User.findOne(req.params.id).exec(function(req,res){
		if(User){
			User.remove();
			console.log('Removed!!');
		}
	});
	console.log(req.params.id);
});

db.on('error',console.error.bind(console,'error found in connection'));

app.get('/', function(req,res){
	res.send('Please use /api/books or /api/genre');
});

app.listen(port,function(){
	console.log('Running server on PORT: ' + port);
})