var app = app || {};

app.AdditionStrategyLast = function() {
	"use strict";

	var item;
	var list;
	
	this.setItem = function(item) {
		this.item = item;
	};
	
	this.setList = function(list) {
		this.list = list;
	}
}