var app = app || {};

app.Logger = function(enable) {
	this.enabled = enable;
	
	this.log = function(message) {
		if (this.enabled) {
			console.log(message);
		}
	};
};