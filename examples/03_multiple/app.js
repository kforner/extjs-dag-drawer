
Ext.create('Ext.panel.Panel', {
	width: 650,
	height: 400,
	title: 'Resizable Panel',
	x: 10,
	y: 10,
	
	items: [{
			xtype: 'dagdrawer',
			settings: dag_settings,
			dag: dag1, 
			computeLayout: maxUpOrDownLayerLayout,
		}, {
			xtype: 'dagdrawer',
			settings: dag_settings,
			dag: dag2, 
			computeLayout: maxUpOrDownLayerLayout,
	}],
	
	layout: {
	    type: 'hbox',
	    align: 'stretch'
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

Ext.create('Ext.panel.Panel', {
	width: 400,
	height: 450,
	title: 'Scrollable Panel',
	x: 710,
	y: 10,
	
	items: [{
			xtype: 'dagdrawer',
			settings: dag_settings,
			dag: dag1, 
			computeLayout: maxUpOrDownLayerLayout,
			autoSize: false,
		}, {
			xtype: 'dagdrawer',
			settings: dag_settings,
			dag: dag2, 
			computeLayout: maxUpOrDownLayerLayout,
			autoSize: false,
	}],
	
	layout: {
	    type: 'hbox',
	    align: 'stretch'
	},
	autoScroll: true,
	floating: true,
	renderTo: Ext.getBody()
});
