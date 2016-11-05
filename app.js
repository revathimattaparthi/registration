
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var isodate = require("isodate");
var decode = require('isodate-convert').decode
//load customers route
var registrations = require('./routes/registrations'); 
var app = express();

var connection  = require('express-myconnection'); 
var mysql = require('mysql');

// all environments
app.set('port', process.env.PORT || 4300);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());

app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

/*------------------------------------------
    connection peer, register as middleware
    type koneksi : single,pool and request 
-------------------------------------------*/

app.use(
    
    connection(mysql,{
        
        host: 'localhost',
        user: 'root',
        password : '123',
        port : 3306, //port mysql
        database:'nodejs'

    },'pool') //or single

);



app.get('/', routes.index);
app.get('/registrations', registrations.list);
app.get('/registrations/add', registrations.add);
app.post('/registrations/add', registrations.save);
app.get('/registrations/delete/:id', registrations.delete_register);
app.get('/registrations/edit/:id', registrations.edit);
app.post('/registrations/edit/:id',registrations.save_edit);


app.use(app.router);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
