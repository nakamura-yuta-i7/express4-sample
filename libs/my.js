(function globalSetting() {
	if (typeof my === "undefined") my={};
	async = require("async");
})();

my.config = require("./config");
my.mysql = require("./mysql/settings");
my.sequelize = require("./sequelize/settings");
my.utils = require("./utils");

module.exports = my;
