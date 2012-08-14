
Ext.create('Ext.panel.Panel', {
	width: 800,
	height: 800,
	title: 'Directed Acyclic Graph',
	x: 10,
	y: 10,
	
	items: [{
		xtype: 'dagdrawer',
		settings: dag_settings,
		dag: dag, 
	 	computeLayout: bottomUpLayerLayout,
	}],
	
	layout: 'fit',
	draggable: {
	    constrain: true,
	    constrainTo: Ext.getBody()
	},
	resizable: {
	    constrain: true,
	    constrainTo: Ext.getBody(),
	    dynamic: true,
	    pinned: true,
	    handles: 'all'
	},  
	renderTo: Ext.getBody()
});
