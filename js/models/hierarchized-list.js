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
		this.set('lastItem', itemName);
		
		var ordly = new app.ordly.Ordly(this.get('items'));
		ordly.setLogger(app.logger.logFunction());
		
		var choose = ordly.add(itemName);
		if(choose.length > 0) {

			this.set('ordly', ordly);
			this.set('choose', choose);
			app.HierarchizedLists.trigger('choose', {choose : choose});
		} else {
		
	        this.set('items', ordly.get());
	 		this.save();
		}
		app.logger.log('HierarchizedList model : addItem');
	},
	
	removeItem : function(item) {
		var items = this.get('items');
		items.splice(items.indexOf(item.get('name')), 1);
		this.set('items', items);
		this.set('lastItem', item.get('name'));
		this.save();
		app.logger.log('HierarchizedList model : removeItem (' + item.get('name') + ')');
	},
	
	choose: function(which) {
		var chosen = this.get('choose')[which];
		var ordly = this.get('ordly');
		
		var choose = ordly.choose(chosen);
		if(choose.length > 0) {

			this.set('choose', choose);
			app.HierarchizedLists.trigger('choose', {choose : choose});
		} else {

			this.set('items', ordly.get());
	 		this.save();
		}
	}
	
});