var app = app || {};

app.HierarchizedListItemView = Backbone.View.extend({
	tagName : 'li',

	template : _.template($('#hierarchized-list-item-template').html()),

	events : {
		'click .destroy' : 'clear',
	},
	
	initialize : function() {
		this.listenTo(this.model, 'change', this.render);
		this.listenTo(this.model, 'destroy', this.removeOverride);
		this.listenTo(this.model, 'addItem', this.removeOverride);
		this.listenTo(app.HierarchizedLists, 'showOne', this.removeOverride);
	},

	render : function() {
		this.$el.html(this.template(this.model.attributes));
		return this;
	},
	
	clear : function() {
		app.HierarchizedLists.trigger('itemRemoved', this.model);
		//this.model.destroy();
	},
	
	removeOverride : function() {
		app.logger.log('HierarchizedListItemView : removeOverride ('
				+ this.model.get('name') + ')');
		this.remove();
	},
});