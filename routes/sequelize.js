var express = require('express');
var router = express.Router();

router.get('/large_data/insert', function(req, res, next) {
	var sequelize = my.sequelize;
	var model = my.sequelize.LargeData;
	var i = 0;
	var insertMax = 1000;
	
	sequelize.transaction().then(function (t) {
		
		async.whilst(
			function() { return i < insertMax; },
			function(cb) {
				i++;
				model.create({data:"This is Data."}, {transaction: t}).then(function(insertedData) {
					// console.log( JSON.stringify(insertedData) );
					cb();
				}).catch(function(e) {
					cb(e);
				});
			},
			function(err) {
				
				async.waterfall([
					function(cb) {
						
						if ( err ) {
							t.roolback();
						} else {
							t.rollback();
							//t.commit();
							cb();
							setTimeout(function() {
								
							}, 10);
						}
					}
				], function() {
					
					model.create({data:"This is Data."}).then(function(insertedData) {
						console.log( JSON.stringify(insertedData) );
						console.log( "request_id: " + req.query.request_id );
						
						model.count().then(function(count) {
							var message = "inserted.  count: " + insertMax + "  total: " + count;
							console.log( message );
							res.json(message);
						});
						
					});
					
				});
				
			}
		);
		
	});
	
});

module.exports = router;
