var app = app || {};

app.HierarchizedListItem = Backbone.Model.extend({
	
	initialize: function () {
		app.logger.log('HierarchizedListItem model : initialize');
	},
	
	validate: function(attributes) {
		if (attributes.name === undefined || attributes.name === '') {
			return "Please enter a name for an item.";
		}
	}
	
});