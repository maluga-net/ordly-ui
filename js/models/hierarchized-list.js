var app = app || {};

app.HierarchizedList = Backbone.Model.extend({
	
	defaults: {
		'title' : new Date().toLocaleString(),
		'items' : [],
		'lastItem' : ''
	},

	initialize: function () {
		console.log('HierarchizedList initialize');
		this.on('change:title', function() {
			console.log('title changed');	
		});
		this.on('change:items', function() {
			console.log('items changed');	
		});
		this.on('change', function() {
			console.log('model changed');	
		});
	},
	
	validate: function(attributes) {
		if (attributes.title === undefined || attributes.title === '') {
			return "Please enter a title for a list.";
		}
	},
	
	addItem: function(item) {
		var items = this.get('items');
		items[items.length] = item;
		this.set('items', items);
		this.set('lastItem', item);
	}
});