Sequelize = require("sequelize");
var config = my.config.database;
var sequelize = new Sequelize(config.name, config.user, config.password, {
	host: config.host,
	dialect: 'mysql',
	
	logging: false,

	pool: {
		max: 10,
		min: 0,
		maxIdleTime: 1000, // The maximum time, in milliseconds, that a connection can be idle before being released
	},

	// SQLite only
	// storage: 'path/to/database.sqlite'
});

sequelize.LargeData = sequelize.define('large_data', {
	id : {
		type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true
	},
	data: {
		type: Sequelize.TEXT,
	},
}, {
	timestamps: false,
	freezeTableName: true, // Model tableName will be the same as the model name
});

module.exports = sequelize;
