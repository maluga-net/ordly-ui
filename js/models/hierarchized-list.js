var app = app || {};

app.HierarchizedList = Backbone.Model.extend({

	defaults : {
		'title' : new Date().toLocaleString(),
		'items' : []
	},

	initialize : function() {
		app.logger.log('HierarchizedList model : initialize');
		// FIXME check why this event is fired twice if listenTo is used
		this.listenToOnce(app.HierarchizedLists, 'itemRemoved', this.removeItem);
	},

	validate : function(attributes) {
		if (attributes.title === undefined || attributes.title === '') {
			return "Please enter a title for a list.";
		}
	},

	addItem : function(itemName) {
		var items = this.get('items');
		items[items.length] = itemName;
		this.set('items', items);
		this.set('lastItem', itemName);
		this.save();
		app.logger.log('HierarchizedList model : addItem');
	},
	
	removeItem : function(item) {
		var items = this.get('items');
		items.splice(items.indexOf(item.get('name')), 1);
		this.set('items', items);
		this.set('lastItem', item.get('name'));
		this.save();
		app.logger.log('HierarchizedList model : removeItem (' + item.get('name') + ')');
	}
	
});