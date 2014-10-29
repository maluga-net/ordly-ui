var HierarchizedListView = Backbone.View.extend({
	className : 'hierarchized-list',
	
	template: _.template($('#hierarchized-list-template').html()),
	
	render: function() {
		this.$el.html(this.template(this.model.attributes));
		return this;
	}
});