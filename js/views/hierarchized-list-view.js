var app = app || {};

app.HierarchizedListView = Backbone.View.extend({
	template : _.template($('#hierarchized-list-template').html()),

	events : {
		'keypress #new-hierarchized-list-item' : 'createOnEnter',
		'click .destroy' : 'log'
	},

	initialize : function() {
		this.inputId = '#new-hierarchized-list-item';

		this.listenTo(this.model, 'change', this.render);
		this.listenTo(this.model, 'destroy', this.remove);
		this.listenTo(app.HierarchizedLists, 'showOne', this.removeOverride);
		this.log('initialize');
	},

	render : function() {
		this.$el.html(this.template(this.model.attributes));
		this.log('render');
		return this;
	},

	clear : function() {
		this.model.destroy();
	},

	createOnEnter : function(event) {
		var $input = this.$(this.inputId);
		
		if (event.which !== ENTER_KEY || !$input.val().trim()) {
			return;
		}

		this.model.addItem($input.val().trim());
		$input.val('');
	},

	removeOverride : function() {
		console.log('removeing list view for ' + this.model.get('title'));
		this.remove();
	},
	
	log : function(event) {
		console.log('list view '+event);
	}
});