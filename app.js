/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , EmployeeProvider = require('./employeeprovider').EmployeeProvider;

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.set('view options', {layout: false});
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
  app.enable('trust proxy');
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

var employeeProvider= new EmployeeProvider();

//Routes

//index
app.get('/', function(req, res){
  employeeProvider.findAll(function(error, emps){
      res.render('index', {
            title: 'Employees',
            employees:emps
        });
  });
});

//new employee
app.get('/employee/new', function(req, res) {
    res.render('employee_new', {
        title: 'New Employee'
    });
});

//save new employee
app.post('/employee/new', function(req, res){
    employeeProvider.save({
        name: req.param('name'),
        title: req.param('title')
    }, function( error, docs) {
        res.redirect('/')
    });
});

//update an employee
app.get('/employee/:id/edit', function(req, res) {
	employeeProvider.findById(req.params.id, function(error, employee) {
		res.render('employee_edit',
		{
			_id: employee._id.toHexString(),
			name: employee.name,
			title: employee.title,
		});
	});
});

//save updated employee
app.post('/employee/:id/edit', function(req, res) {
	employeeProvider.update(req.params.id,{
		name: req.param('name'),
		title: req.param('title')
	}, function(error, docs) {
		res.redirect('/')
	});
});

//delete an employee
app.get('/employee/:id/delete', function(req, res) {
	employeeProvider.delete(req.params.id, function(error, docs) {
		res.redirect('/')
	});
});

app.listen(process.env.PORT || 3000);
