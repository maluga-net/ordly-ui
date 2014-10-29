var app = app || {};

app.AppView = Backbone.View.extend({

	el : '#rarchy',

	events : {
		'keypress #new-hierarchized-list' : 'createOnEnter'
	},

	initialize : function() {
		this.$input = this.$('#new-hierarchized-list');
		this.$main = this.$('#main');

		this.listenTo(app.HierarchizedLists, 'add', this.addOne);
		this.listenTo(app.HierarchizedLists, 'reset', this.addAll);
		this.listenTo(app.HierarchizedLists, 'all', this.render);

		app.HierarchizedLists.fetch();
	},

	render : function() {
		if (app.HierarchizedLists.length) {
			this.$main.show();
		} else {
			this.$main.hide();
		}
	},

	addOne : function(hierarchizedList) {
		var view = new app.HierarchizedListView({
			model : hierarchizedList
		});
		this.$('#hierarchized-lists').append(view.render().el);
	},

	addAll : function() {
		this.$('#hierarchized-lists').html('');
		app.HierarchizedLists.each(this.addOne, this);
	},

	newAttributes : function() {
		return {
			title : this.$input.val().trim(),
			order : app.HierarchizedLists.nextOrder(),
		};
	},

	createOnEnter : function(event) {
		if (event.which !== ENTER_KEY || !this.$input.val().trim()) {
			return;
		}

		app.HierarchizedLists.create(this.newAttributes());
		this.$input.val('');
	}
});