module.exports	= function(app, client) {	
	
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

	app.get('/serchOll/',function(req,res){
		client.search({
			index: 'asferro',
			type: 'user',
			size : 50,
			body: {
		   		query: {
			      "match_all" : {}
     			}
		   	}
		}).then(function(response) {
			var hits = response.hits.hits;
			res.send({hits});
		}, function(error) {
			console.trace(error.message);
		});
	});

	app.delete('/delleteById/',function(req,res){
		let index=req.query.id;		
		client.delete({
		  index: 'asferro',
		  type: 'user',
		  id: index,
		}).then(function(response) {			
				res.send(response);
			}, function(error) {				
				console.trace(error.message);
		});
		
	});
	   	
	app.post('/addUser/', function(req, res) {		
		let date=new Date();
		let last_modified_date=''+date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
		console.log(req.body);
		client.index({
		  index: 'asferro',
		  type: 'user',		  
		  body: {
		    "name": req.body.name,
			"surname":req.body.surname,
			"birthday":req.body.birthday,
			"contact":req.body.contact,
			"email":req.body.email,
			"last_modified_date":last_modified_date,
		  }
		}).then(function(response) {			
				res.send(response);
			}, function(error) {				
				console.trace(error.message);
		});				
	});

	app.put('/fixUser/', function(req, res) {		
		let date=new Date();
		let last_modified_date=''+date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
		console.log(req.body);
		console.log(req);
		client.update({
		  index: 'asferro',
		  type: 'user',
		  id: req.body.id,	  
		  body: {
		  	doc:{
			    "name": req.body.name,
				"surname":req.body.surname,
				"birthday":req.body.birthday,
				"contact":req.body.contact,
				"email":req.body.email,
				"last_modified_date":last_modified_date,
			}
		  }
		}).then(function(response) {
			console.log('User update');
			console.log(response);
				res.send(response);
			}, function(error) {				
				console.trace(error.message);
		});			
	});
};