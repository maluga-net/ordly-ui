var app = app || {};

app.HierarchizedListNavigationView = Backbone.View.extend({
	tagName : 'li',

	template : _.template($('#hierarchized-list-navigation-template').html()),

	events : {
		'click .destroy' : 'clear'
	},
	
	initialize : function() {
		this.listenTo(this.model, 'change', this.render);
		this.listenTo(this.model, 'destroy', this.remove);
	},

	render : function() {
		this.$el.html(this.template(this.model.attributes));
		return this;
	},
	
	clear : function() {
		if (confirm("Are you sure?")) {
			this.model.destroy();
		}
	}
});