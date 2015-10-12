var my = require("./libs/my");
var async = require("async");

insertLargeData();

function insertLargeData() {
	my.mysql.pool.query("start transaction", function(){
		console.log( "start transaction" );
		var i = 0;
		var insertMax = 1000;
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
			my.mysql.pool.query("commit", function(){
				console.log( "commit." );
				my.mysql.pool.query("select count(*) from large_data", function(err, rows) {
					err ? console.log( err ) :
					console.log( rows[0] );
					
				});
			});
		}
	});
}


my.mysql.pool.getConnection(function(err, connection) {
	console.log( "first connection." );
	// connection.release();
	my.mysql.pool.getConnection(function(err, connection) {
		console.log( "second connection." );
		// connection.release();
	});
});
