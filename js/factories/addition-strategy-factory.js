var app = app || {};

app.AdditionStrategyFactory = function() {
	"use strict";
	
	var strategiesCache = [];
	
	this.getStrategy = function(strategyName) {
		if (strategiesCache[app.AdditionStrategyFactory.STRATEGY_LAST] === undefined) {
			strategiesCache[app.AdditionStrategyFactory.STRATEGY_LAST] = new app.AdditionStrategyLast();
		}
		return strategiesCache[app.AdditionStrategyFactory.STRATEGY_LAST];
	};
};

app.AdditionStrategyFactory.STRATEGY_LAST = 'last';