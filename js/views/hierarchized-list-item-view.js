var app = app || {};

app.HierarchizedListItemView = Backbone.View.extend({
	
	tagName : 'li',

	template : _.template($('#hierarchized-list-item-template').html()),

	events : {
		'click .destroy' : 'clear'
	},
	
	initialize : function() {
		"use strict";
		this.listenTo(this.model, 'change', this.render);
		this.listenTo(this.model, 'destroy', this.removeOverride);
		this.listenTo(this.model, 'addItem', this.removeOverride);
		this.listenTo(app.HierarchizedLists, 'showOne', this.removeOverride);
	},

	render : function() {
		"use strict";
		this.$el.html(this.template(this.model.attributes));
		return this;
	},
	
	clear : function() {
		"use strict";
		app.HierarchizedLists.trigger('itemRemoved', this.model);
		//this.model.destroy();
	},
	
	removeOverride : function() {
		"use strict";
		app.logger.log('HierarchizedListItemView : removeOverride ('
				+ this.model.get('name') + ')');
		this.remove();
	}
});