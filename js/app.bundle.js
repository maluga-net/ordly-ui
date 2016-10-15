(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

$(function(){
	app.ordly = require('./lib/ordly/src/ordly.js');
	app.logger = new app.Logger(CONSOLE_ENABLED);
	new app.AppView();
});
},{"./lib/ordly/src/ordly.js":2}],2:[function(require,module,exports){


var Ordly = function(elements) {
    
    if ((typeof elements) === 'undefined') {
        
        elements = [];
    };
    
    this.elements = elements;
    
    this.startIndex = 0;
    
    this.endIndex = this.elements.length - 1;
    
    this.middleIndex = 0;
    
    this.lastChooseFrom = [];
    
    this.itemToAdd;
    
    this.logger;
    
    this.findMiddleIndex = function() {
        
        this.middleIndex = Math.floor((this.endIndex - this.startIndex) / 2) + this.startIndex;
        
        return this.middleIndex;
    }
};

Ordly.prototype.setLogger = function(logger) {
    
    this.logger = logger;
}

Ordly.prototype.log = function(message) {

    if('function' === typeof(this.logger)) {
        
        this.logger(message);
    }
    
}

Ordly.prototype.getHumanFriendlyIndexesString = function() {

    return (this.startIndex + 1) + '/' + (this.middleIndex + 1) + '/' + (this.endIndex + 1);
    
}

Ordly.prototype.get = function() {
    
    return this.elements;
}

Ordly.prototype.add = function(item) {
    
    this.startIndex = 0;
    this.endIndex = this.elements.length - 1;
    this.lastChooseFrom = [];
    this.itemToAdd = item;
    
    this.log('Adding "' + item + '" to "' + this.elements + '" (' + this.getHumanFriendlyIndexesString() + ')');
    
    if (this.elements.length > 0) {
        
        this.lastChooseFrom = [this.elements[this.findMiddleIndex()], this.itemToAdd];
        
        this.log('Need to choose from "' + this.lastChooseFrom + '"');
        
    } else {
    
        this.elements.push(this.itemToAdd);
    }
    
    this.log('Indexes state: ' + this.getHumanFriendlyIndexesString());
    
    return this.lastChooseFrom;
}
    
Ordly.prototype.choose = function(item) {
    
    if(item == this.lastChooseFrom[0]) {
    
        this.log('Choosed "'+ item + '" as first item from pair');
        
        this.startIndex = this.middleIndex + 1;
    } else {
        
        this.log('Choosed "'+ item + '" as second item from pair');

        this.endIndex = this.middleIndex - 1;
    }

    this.log('Indexes state before finding middle: ' + this.getHumanFriendlyIndexesString());

    this.findMiddleIndex();
    
    this.log('Indexes state after finding middle: ' + this.getHumanFriendlyIndexesString());
    
    if(this.middleIndex < 0) {
        
        this.log('Middle index < 0, unshifting "' + item + '" and returning []');
        
        this.elements.unshift(this.itemToAdd);
        
        this.log('Indexes state after finding middle: ' + this.getHumanFriendlyIndexesString());
        
        return [];
    }

    if(this.startIndex > this.endIndex) {
        
        this.log('Start index > end index, addig item "' + item + '" on position '+ (this.middleIndex + 1) + ' and returning []');
        this.elements.splice(this.middleIndex+ 1, 0, this.itemToAdd);
        return [];
    }

    this.lastChooseFrom = [this.elements[this.middleIndex], this.itemToAdd];
    this.log('Need to choose from "' + this.lastChooseFrom + '"');

    return this.lastChooseFrom;
}
    
    
module.exports = {
    Ordly: Ordly
}
},{}]},{},[1]);
