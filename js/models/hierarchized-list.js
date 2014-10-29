var HierarchizedList = Backbone.Model.extend({
	
	defaults: {
		'title' : new Date().toLocaleString()
	},

	initialize: function () {
		console.log('HierarchizedList initialize');
		this.on('change:title', function() {
			console.log('title changed');	
		});
	},
	
	validate: function(attributes) {
		if (attributes.title === undefined || attributes.title === '') {
			return "Please enter a title for a list.";
		}
	}
});