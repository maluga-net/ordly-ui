var app = app || {};

var HierarchizedListCollection = Backbone.Collection.extend({

	model : app.HierarchizedList,

	localStorage : new Backbone.LocalStorage('hierachized-lists'),

	nextOrder : function() {
		if (!this.length) {
			return 1;
		}
		return this.last().get('order') + 1;
	},

	comparator : function(hierarchizedList) {
		return hierarchizedList.get('order');
	}
});

app.HierarchizedLists = new HierarchizedListCollection();