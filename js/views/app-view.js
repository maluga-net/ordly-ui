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
		//this.listenTo(app.HierarchizedLists, 'all', this.render);
		this.listenTo(app.HierarchizedLists, 'showOne', this.showOne);

		app.HierarchizedLists.fetch();
		
		app.logger.log('AppView : initialize');
	},

	render : function() {
		if (app.HierarchizedLists.length) {
			this.$main.show();
		} else {
			this.$main.hide();
		}
		app.logger.log('AppView : render');
	},

	addOne : function(hierarchizedList) {
		var view = new app.HierarchizedListNavigationView({
			model : hierarchizedList
		});
		this.$('#hierarchized-lists').append(view.render().el);
		app.logger.log('AppView : addOne');
	},

	addAll : function() {
		this.$('#hierarchized-lists').html('');
		app.HierarchizedLists.each(this.addOne, this);
		app.logger.log('AppView : addAll');
	},

	showOne : function(id) {
		var hierarchizedList = app.HierarchizedLists.get(id);
		view = new app.HierarchizedListView({
			model : hierarchizedList
		});
		
		this.$('#hierarchized-list').html(view.render().el);
		app.logger.log('AppView : showOne');
	},
	
	newAttributes : function() {
		var order = app.HierarchizedLists.nextOrder();
		return {
			title : this.$input.val().trim(),
			order : order,
			id : order
		};
	},

	createOnEnter : function(event) {
		if (event.which !== ENTER_KEY || !this.$input.val().trim()) {
			return;
		}

		app.HierarchizedLists.create(this.newAttributes());
		this.$input.val('');
		app.logger.log('AppView : createOnEnter');
	}
});