var config = require("../config.js").database;

var mysql = require('mysql');
var pool  = mysql.createPool({
	connectionLimit : 2,
	host            : config.host,
	user            : config.user,
	password        : config.password,
	database        : config.name,
});
pool.on('connection', function (connection) {
	console.log( "EVENT: mysql.pool.connection: threadId: " + connection.threadId );
});
pool.on('enqueue', function () {
	console.log( "EVENT: mysql.pool.enqueue" );
});
pool.on("end", function() {
	console.log( "EVENT: mysql.pool.end (all connections in the pool have ended)" );
});

// module.exports = {
// 	connection : mysql.createConnection({
// 		host     : config.host,
// 		user     : config.user,
// 		password : config.password,
// 		database : config.name,
// 	}),
// 	pool : pool,
// };

pool.pool = pool;

module.exports = pool;
