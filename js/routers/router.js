var app = app || {};

HierarchizedListsRouter = Backbone.Router.extend({
	routes: {
		':id' : 'showHierarchizedList'
	},

	showHierarchizedList: function(id) {
		app.HierarchizedLists.trigger('showOne', {id : id});
	} 
});

app.hierarchizedListsRouter = new HierarchizedListsRouter();
Backbone.history.start();