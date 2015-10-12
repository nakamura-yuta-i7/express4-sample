var express = require('express');
var router = express.Router();
var async = require("async");


router.get('/insert_large_data2', function(req, res, next) {
	
	my.mysql.getConnection(function(err, conn) {
		
		var insertMax = 500;
		insertLargeData(insertMax);
		
		function insertLargeData(insertMax) {
			conn.query("start transaction", function(err, rows) {
				console.log( "start transaction" );
				var i = 0;
				return async.whilst(
					function() {
						return i < insertMax;
					},
					function(cb){
						i++;
						insertData(cb);
					},
					function(err){
						commit();
						
					}
				);
				
				function insertData(cb) {
					conn.query("insert into large_data (`data`) values ('This is Data.') ", function(err) {
						err ? console.log( err ) :
						//console.log( i );
						cb();
					});
				}
				
				function commit(){
					conn.query("commit", function(){
						console.log( "commit." );
						conn.query("select count(*) from large_data", function(err, rows) {
							if ( err ) console.log( err ) ;
							var count = rows[0]["count(*)"];
							console.log( count );
							
							res.json("inserted large data(2).  inserted count: " + insertMax + "  total: " + count);
						});
					});
				}
			});
		}
		
	});

});

router.get('/insert_large_data', function(req, res, next) {
	
	my.mysql.getConnection(function(err, conn) {});
	
	var insertMax = 500;
	insertLargeData(insertMax);
	
	function insertLargeData(insertMax) {
		my.mysql.pool.query("start transaction", function(){
			console.log( "start transaction" );
			var i = 0;
			async.whilst(
				function() {
					return i < insertMax;
				},
				function(cb){
					i++;
					insertData(cb);
				},
				function(err){
					commit();
					
				}
			);
			
			function insertData(cb) {
				my.mysql.pool.query("insert into large_data (`data`) values ('This is Data.') ", function(err) {
					err ? console.log( err ) :
					console.log( i );
					cb();
				});
			}
			
			function commit(){
				my.mysql.pool.query("roolback", function(){
					console.log( "roolback." );
					my.mysql.pool.query("select count(*) from large_data", function(err, rows) {
						if ( err ) console.log( err );
						var count = rows[0]["count(*)"];
						console.log( count );
						
						res.json("inserted large data(1).  inserted count: " + insertMax + "  total: " + count);
					});
				});
			}
		});
	}

});




router.get('/mysql.pool', function(req, res, next) {
	my.mysql.getConnection(function(err, conn) {
		res.json("1");
	});
});

/* GET home page. */
router.get('/', function(req, res, next) {
		
		var output = {
			users: null,
			mysql : {
				Threads_connected : null,
				max_connections : null,
				wait_timeout : null,
			}
		};
		
		async.series([
			getUsers,
			getThredConnections,
			getMaxConnections,
			getWaitTimeout,
			
		],function(err){
			err ? res.json(500, err) :
			
			res.json(output);
			
		});
		
		function getUsers(cb) {
			console.log(arguments.callee.name);
			my.mysql.pool.query("select * from users", function(err, result) {
				output.users = result;
				cb(err);
			});
		}
		function getThredConnections(cb) {
			console.log(arguments.callee.name);
			my.mysql.pool.query("show status like 'Threads_connected'", function(err, result) {
				output.mysql.Threads_connected = result;
				cb(err);
			});
		}
		function getMaxConnections(cb) {
			console.log(arguments.callee.name);
			my.mysql.pool.query("SHOW VARIABLES like 'max_connections'", function(err, result) {
				output.mysql.max_connections = result[0];
				cb(err);
			});
		}
		function getWaitTimeout(cb) {
			console.log(arguments.callee.name);
			my.mysql.pool.query("show variables like '%wait%'", function(err, result) {
				output.mysql.wait_timeout = result[0];
				cb(err);
			});
		}
});

module.exports = router;
