
$(function(){
	app.ordly = require('./lib/ordly/src/ordly.js');
	app.logger = new app.Logger(CONSOLE_ENABLED);
	new app.AppView();
});