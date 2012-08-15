
Ext.create("DagDrawer",{	
	settings: dag_settings,
	dag: dag, 
	computeLayout: maxUpOrDownLayerLayout,
	
	width : 500,
	height : 600,
    
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
 
	renderTo : Ext.getBody(),
});
