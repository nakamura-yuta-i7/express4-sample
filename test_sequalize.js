var my = require("./libs/my");
var sequelize = my.sequelize;


sequelize.transaction().then(function (t) {
	
	sequelize.LargeData.create({data:"This is Data."}, {transaction: t}).then(function(insertedData) {
		console.log( JSON.stringify(insertedData) );
	
	}).then(function () {
		t.commit();
		
	}).catch(function (err) {
		t.rollback();
		
	});
});
