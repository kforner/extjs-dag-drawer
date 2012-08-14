
Ext.create('Ext.panel.Panel', {
	title : 'Table of Directed Acyclic Graphs',
	x: 0,
	y: 0,
	
	items : [ {
		xtype: 'dagdrawer',
		settings : dag_settings,
		dag : dag1,
		computeLayout : maxUpOrDownLayerLayout,
		height: 400,
	}, {
		xtype: 'dagdrawer',
		settings : dag_settings,
		dag : dag2,
		computeLayout : maxUpOrDownLayerLayout,
		height: 400,
	}, {
		xtype: 'dagdrawer',
		settings : dag_settings,
		dag : dag3,
		computeLayout : topDownLayerLayout,
		height: 400,
	}, {
		xtype: 'dagdrawer',
		settings : dag_settings,
		dag : dag4,
		computeLayout : topDownLayerLayout,
		height: 400,
	}],

	autoScroll : true,
	layout : {
		type : 'table',
		columns : 2
	},
	resizable: {
	    constrain: true,
	    constrainTo: Ext.getBody(),
	    dynamic: true,
	    pinned: true,
	    handles: 'all'
	},
	renderTo : Ext.getBody()
});
