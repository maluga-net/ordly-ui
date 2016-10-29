var app = app || {};

app.ChooseItemView = Backbone.View.extend({
	tagName : 'form',

	template : _.template($('#choose-item-template').html()),

	events : {
		'click .one' : 'chooseOne',
		'click .two' : 'chooseTwo',
	},
	
	initialize : function() {
		//this.listenTo(this.model, 'change', this.render);
		this.listenTo(this.model, 'destroy', this.remove);
	},

	render : function() {
		this.$el.html(this.template(this.model));
		return this;
	},
	
	chooseOne : function() {
		this.choose(0);
	},
	
	chooseTwo : function() {
		this.choose(1);
	},

	choose : function(which) {
		app.logger.log('Choosing ' + which);
		app.HierarchizedLists.trigger('handleChosen', which);
	}
	
});