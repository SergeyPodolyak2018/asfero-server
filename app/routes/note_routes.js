module.exports			= function(app, client) {	
	app.get('/health',function(req,res){
	   	client.cluster.health({},function(err,resp,status) {  
	      	if(err){
	        	console.log("-- Client Health ERROR--",err);
	      	}else{
	         	console.log("-- Client Health --",resp);
	        res.send({resp});
	      }
	   });
	});

	app.get('/serchOll',function(req,res){
		client.search({
			index: 'asferro',
			type: 'user',
			body: {
		  		query: {
			      match: {
			        name: 'Her'
			    	}
    			}
		  	}
		}).then(function(response) {
			var hits = response.hits.hits;
			res.send({hits});
		}, function(error) {
			console.trace(error.message);
		});
	});

	app.get('/serchId',function(req,res){
		client.search({
			index: 'asferro',
			type: 'user',
			body: {
		  		query: {
			      match: {
			        _id: "92cjvmQBQkNE0rGWjcLK",
			    	}
    			}
		  	}
		}).then(function(response) {
			var hits = response.hits.hits;
			res.send({hits});
		}, function(error) {
			console.trace(error.message);
		});
	});
	   	







	// app.get('/user_status/', function(req, res) {		
	// 	db.table('users').select('*')
	// 	.then(function(rows) { 
	// 		console.log('Data received from Db:\n');
	// 		for (var i = 0; i < rows.length; i++) {
	// 			console.log(rows[i].name);
	// 		};
	// 		console.log(rows);
	// 	})
	// 	.then(()=>{	
	// 		console.log('point2');		
	// 		var jsontable={"control":1};			
	// 		let telegramm={'type':0,'message':'ok','data':jsontable};			
	// 		res.send(JSON.stringify(telegramm));
	// 	}).catch(error => {
	// 		console.log('error');
	// 		let telegramm={'type':1,'message':'хуй вам а не данные','data':[]};			
	// 		res.send(JSON.stringify(telegramm));    		
 //  		});
	// });

	/*app.get('/device_arxiv/', function(req, res) {		
		if(parseInt(req.query.index)==0){
			db.table('device').select('date','time','name','status')
			.then(function(rows) {
				res.send(JSON.stringify(rows));
			});			
		}		
	});*/


// 	app.get('/alarm_arxiv/', function(req, res) {	
// 		console.log('трата та тра та та2');	
// 		if(req.query.name){
// 			db.table('alarm_arxiv').where('device', req.query.name).select('color','date','time','device','text','ack')
// 			.then(function(rows) {
// 				let telegramm={'type':0,'message':'ok','data':rows};			
// 				res.send(JSON.stringify(telegramm));				
// 			});	
// 		}else{
// 				db.table('alarm_arxiv').select('color','date','time','device','text','ack')
// 							.then(function(rows) {
// 								let telegramm={'type':0,'message':'ok','data':rows};			
// 								res.send(JSON.stringify(telegramm));				
// 							});
// 		}		
// 	});

// 	app.get('/alarm/', function(req, res) {	
			
// 				db.table('alarm_arxiv').select('id','alarm','eqindex','color','date','time','device','text','ack')
// 							.then(function(rows) {
// 								let telegramm={'type':0,'message':'ok','data':rows};			
// 								res.send(JSON.stringify(telegramm));				
// 							});
				
// 	});
// 	app.get('/alarm_ack/', function(req, res) {				
// 		let telegramm={'type':0,'message':'ok','data':[]};			
// 		res.send(JSON.stringify(telegramm));
// 	});
// 	app.get('/alarm_ack_all/', function(req, res) {				
// 		let telegramm={'type':0,'message':'ok','data':[]};			
// 		res.send(JSON.stringify(telegramm));
// 	});

// 	app.get('/event_arxiv/', function(req, res) {
				
// 		if(req.query.name){
// 			console.log('трата та тра та та');
// 			db.table('event_arxiv').where('name', req.query.name).select('date','time','name','status')
// 			.then(function(rows) {
// 				let telegramm={'type':0,'message':'ok','data':rows};			
// 				res.send(JSON.stringify(telegramm));				
// 			});	
// 		}else{
// 			console.log('трата та тра та та3');
// 				db.table('event_arxiv').select('date','time','name','status')
// 							.then(function(rows) {
// 								let telegramm={'type':0,'message':'ok','data':rows};			
// 								res.send(JSON.stringify(telegramm));				
// 							});
// 		}		
// 	});

// //Qwery on menu buttons
// 	app.get('/get_menu_buttons/', function(req, res) {		
// 		db('device').where('NameShort', req.query.name).select('EType')
// 		.then(function(rows) {			
// 			if(rows.length){						
// 				return db('menu').where('eq_type', rows[0].EType).select('name','color','func','command');
// 			}else{				
// 				throw new Error('device do not exist');
//             	return null;
// 			}
// 		})
// 		.then(function(rows) {			
// 			let telegramm={'type':0,'message':'ok','data':rows};			
// 			res.send(JSON.stringify(telegramm));
// 		}).catch(error => {
// 			let telegramm={};
// 			if(error.message=='device do not exist'){
// 				telegramm={'type':5,'message':'хуй вам а не данные','data':[]};
// 			}else{
// 				telegramm={'type':1,'message':'хуй вам а не данные','data':[]};
// 			}
// 			res.send(JSON.stringify(telegramm));			
			
//   		});
// 	});

// 	//Qwery on menu command
// 	app.get('/io_command/', function(req, res) {
// 		/*console.log('qwery io_command name',req.query.name);
// 		console.log('qwery io_command data',req.query.command);*/
// 		let telegramm={'type':0,'message':'ok','data':[]};			
// 		res.send(JSON.stringify(telegramm));		
		
// 	});

// 	app.get('/device_get_settings/', function(req, res) {		
// 		let telegramm={'type':0,'message':'ok','data':settings.jsontable};			
// 		res.send(JSON.stringify(telegramm));		
		
// 	});
// 	app.get('/device_get_task/', function(req, res) {		
// 		let telegramm={'type':0,'message':'ok','data':texSettings.jsontable};			
// 		res.send(JSON.stringify(telegramm));
// 	});

// 	//Qwery on menu command
// 	app.post('/device_add_bd/', function(req, res) {		
// 		let redyObject=deviceAdress.getDeviceAdress(req.body);				
// 		db('device').insert(redyObject).then( function (result) {          
//           let telegramm={'type':0,'message':'ok','data':[]};			
// 		  res.send(JSON.stringify(telegramm));
//        });		
// 	});

// 	app.get('/analog_dat_get_settings/', function(req, res) {		
// 		let telegramm={'type':0,'message':'ok','data':analogDatSettings.jsontable};			
// 		res.send(JSON.stringify(telegramm));
// 	});


};