var app = app || {};
var ENTER_KEY = 13;
var CONSOLE_ENABLED = true;
var CONSOLE_DISABLED = false;

$(function(){
	app.logger = new app.Logger(CONSOLE_ENABLED);
	new app.AppView();
});