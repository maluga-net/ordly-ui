var HierarchizedListsRouter = Backbone.Router.extend({
	routes: {
		'about' : 'showAbout',
		'hierarchized-list/:cid' : 'showHierarchizedList'
	},

	showAbout: function() {
		console.log('showAbout');
	},
	
	showHierarchizedList: function(cid) {
		console.log('showHierarchizedList, cid:'+cid);
	} 
});

var hierarchizedListsRouter = new HierarchizedListsRouter();
Backbone.history.start();