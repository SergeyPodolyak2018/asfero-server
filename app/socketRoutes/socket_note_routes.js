var clients = {};
var menuBottons		= require('../../testQuery/takeMenuButtons');

module.exports = function(cocket, db,store) {	

	cocket.on('connection', function(ws,req) {
	/*var cookie_string = ws.request.headers.cookie;
        cookies = cookie.parse(cookie_string);*/
    //console.log("куки бля " + cookies);
    let ip = req;
     console.log("куки бля " + ip);

     //----------------------------   
	let id = Math.random();										//личный идентификатор соединения хранится в замыкании
	clients[id] = ws;
	console.log("новое соединение " + id);
	console.log(ws.protocol);
	//-----------------------------------------------------
	ws.on('message', function(message) {
		console.log('получено сообщение ' + message);
		let tempParseMessage=JSON.parse(message);
		if(tempParseMessage.identificator==="get_menu_buttons"){			
			let tempObjet={};
			tempObjet.data=menuBottons.getButtons(tempParseMessage.data);
			tempObjet.identificator="menu";
			tempObjet.bufer=tempParseMessage.bufer;			
			clients[id].send(JSON.stringify(tempObjet));
		}		
	});

	ws.on('close', function() {
		console.log('соединение закрыто ' + id);
		delete clients[id];
  	});
});

//Циклически отдавать всем подключениям состояние объектов
setInterval(function() {
		let tempObjet={}
		let tempObjet2={}
		let query=require('../../testQuery/status');		
		tempObjet.data=query.jsontable;
		tempObjet.identificator="status";
		
		let a=JSON.stringify(tempObjet);
		
		for (var key in clients) {
	      clients[key].send(a);
	     
	   	}
}, 2000);

setInterval(function() {
		//db.table('alarm_arxiv').select('id','alarm','eqindex','color','date','time','device','text','ack')
		db.table('alarm_arxiv').select('id','alarm','color','date','time','device','text','ack')
			.then(function(rows) {
				let tempObjet={};
				tempObjet.data=rows;
				tempObjet.identificator="alarm";		
				let a=JSON.stringify(tempObjet);
		
				for (var key in clients) {
	      			clients[key].send(a);
	   			}			
			});
		
}, 10000);

setInterval(function() {
	let tempObjet 			={};
	let contentObject		={}
	contentObject.time		='9:55';
	contentObject.date		='31.05.2018';
	contentObject.timer		='20000';	
	contentObject.plc		=1;
	contentObject.drv		=6;
	contentObject.name		='Оператор';
	contentObject.message 	='Бла бла бла';
	contentObject.help		='Тра та та';
	contentObject.alarm		=1;
	contentObject.bell		=0;


	tempObjet.data=contentObject;
	tempObjet.identificator="status_bar";		
	let a=JSON.stringify(tempObjet);
	for (var key in clients) {
		clients[key].send(a);
	}	
}, 1000);


};