var fs 				= require('fs'); 							//работа с файловой системой
var express 		= require('express'); 						//сервер
var bodyParser 		= require('body-parser');
var app 			= express(); 								//создаём Express-приложение
var ports			= 80;
var elasticsearch = require('elasticsearch');
var client = elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
});										


app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());


// var css='/www/css';
// var img='/www/img';
// var js='/www/js';

var css='/dist/myapp';
var img='/dist/myapp';
var js='/dist/myapp';

// var index='./www/index.html';

var index='./dist/myapp/index.html';



// app.use("/css", express.static(__dirname + css));
// app.use("/img", express.static(__dirname + img));
// app.use("/js", express.static(__dirname + js));

app.use("/", express.static(__dirname + css));

app.get('/', function(req, res) {		
	res.sendfile(index);
});


require('./app/routes')(app, client);							//передаем в модуль экземпляр объекта или ссылку на него

app.listen(ports, () => {										// запускаем сервер на порту 80
  console.log('We are live on ' + ports);						// отправляем сообщение
});

//--------------------------------------------------------------------------------------------------









                