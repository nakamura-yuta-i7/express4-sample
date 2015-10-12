var my = require("./libs/my");
var here = require("here").here;

var sql = here(/*
	SELECT  
	(SELECT COUNT(*) FROM INFORMATION_SCHEMA.INNODB_BUFFER_PAGE 
	WHERE TABLE_NAME IS NULL OR (INSTR(TABLE_NAME, '/') = 0 AND INSTR(TABLE_NAME, '.') = 0)
	) AS system_pages,
	(
	SELECT COUNT(*)
	FROM INFORMATION_SCHEMA.INNODB_BUFFER_PAGE
	) AS total_pages,
	(
	SELECT ROUND((system_pages/total_pages) * 100)
	) AS system_page_percentage;
*/).unindent();

var sql2 = "show processlist;";


sql = sql2;

my.mysql.getConnection( function(err, conn) {
	
	(function showInfo(sql) {
		
		conn.query(sql, function(err, rows) {
			console.log( rows );
		});
	})(sql);
	
});
