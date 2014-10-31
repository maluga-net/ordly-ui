var app = app || {};

app.HierarchizedListView = Backbone.View.extend({
	template : _.template($('#hierarchized-list-template').html()),

	events : {
		'keypress #new-hierarchized-list-item' : 'createOnEnter',
	},

	initialize : function() {
		this.inputId = '#new-hierarchized-list-item';

		this.listenTo(this.model, 'reset', this.render);
		this.listenTo(this.model, 'change', this.render);
		this.listenTo(this.model, 'destroy', this.remove);
		this.listenTo(app.HierarchizedLists, 'showOne', this.removeOverride);
		app.logger.log('HierarchizedListView : initialize');
	},

	render : function() {
		this.$el.html(this.template(this.model.attributes));
		this.addItems();
		app.logger.log('HierarchizedListView : render');
		return this;
	},

	clear : function() {
		this.model.destroy();
	},

	addItem : function(hierarchizedListItem) {
		var view = new app.HierarchizedListItemView({
			model : hierarchizedListItem
		});
		this.$('#hierarchized-list-items').append(view.render().el);
		app.logger.log('HierarchizedListView : addItem ('
				+ hierarchizedListItem.get('name') + ')');

	},

	addItems : function() {
		this.$('#hierarchized-lists-items').html('');
		var items = this.model.get('items');
		for (i in items) {
			this.addItem(new app.HierarchizedListItem({
				name : items[i]
			}));
		}
		app.logger.log('HierarchizedListView : addItems');
	},

	createOnEnter : function(event) {
		var $input = this.$(this.inputId);

		if (event.which !== ENTER_KEY || !$input.val().trim()) {
			return;
		}

		this.model.addItem($input.val().trim());
		$input.val('');
		app.logger.log('HierarchizedListView : createOnEnter');
	},
	
	removeOverride : function() {
		app.logger.log('HierarchizedListView : removeOverride ('
				+ this.model.get('title') + ')');
		this.remove();
	},

});