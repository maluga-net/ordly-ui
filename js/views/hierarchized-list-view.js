var app = app || {};
var _ = _ || {};
var ENTER_KEY = ENTER_KEY || {};

app.HierarchizedListView = Backbone.View.extend({
	template : _.template($('#hierarchized-list-template').html()),

	events : {
		'keypress #new-hierarchized-list-item' : 'createOnEnter'
	},

	initialize : function() {
		"use strict";
		this.inputId = '#new-hierarchized-list-item';

		this.listenTo(this.model, 'reset', this.render);
		this.listenTo(this.model, 'change', this.render);
		this.listenTo(this.model, 'destroy', this.remove);
		this.listenTo(app.HierarchizedLists, 'showOne', this.removeOverride);
		this.listenTo(app.HierarchizedLists, 'choose', this.choose);
		this.listenTo(app.HierarchizedLists, 'handleChosen', this.handleChosen);
		app.logger.log('HierarchizedListView : initialize');
	},

	render : function() {
		"use strict";
		this.$el.html(this.template(this.model.attributes));
		this.addItems();
		app.logger.log('HierarchizedListView : render');
		return this;
	},

	clear : function() {
		"use strict";
		if (confirm("Are you sure?")) {
			this.model.destroy();
		}
	},

	addItem : function(hierarchizedListItem) {
		"use strict";
		var view = new app.HierarchizedListItemView({
			model : hierarchizedListItem
		});
		this.$('#hierarchized-list-items').append(view.render().el);
		app.logger.log('HierarchizedListView : addItem ('
				+ hierarchizedListItem.get('name') + ')');

	},

	addItems : function() {
		"use strict";
		this.$('#hierarchized-lists-items').html('');
		var items = this.model.get('items');
		var itemIndex;
		for (itemIndex in items) {
			if (items.hasOwnProperty(itemIndex)) {
				this.addItem(new app.HierarchizedListItem({
					name : items[itemIndex]
				}));
			}
		}
		app.logger.log('HierarchizedListView : addItems');
	},

	createOnEnter : function(event) {
		"use strict";
		var $input = this.$(this.inputId);

		if (event.which !== ENTER_KEY || !$input.val().trim()) {
			return;
		}

		this.model.addItem($input.val().trim());
		

		$input.val('');
		app.logger.log('HierarchizedListView : createOnEnter');
	},
	
	removeOverride : function() {
		"use strict";
		app.logger.log('HierarchizedListView : removeOverride ('
				+ this.model.get('title') + ')');
		this.remove();
	},
	
	choose: function(data) {
		var view = new app.ChooseItemView({
			model : data
		});
		
		this.$('#choose').html(view.render().el);
	},
	
	handleChosen: function(which) {
		app.logger.log('Handle chosen ' + which);
		this.model.choose(which);
	}

});