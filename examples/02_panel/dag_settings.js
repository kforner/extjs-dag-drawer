
var dag_settings = {		
	nodes: {
	    label: {
	        'font-size': '16px',
	        'font-family': 'Arial,Helvetica,sans-serif',
	        'font-weight': 'normal',
	        'font-style': 'italic',
	        fill: 'blue',
	    },
	    rect: {
	    	radius: 50,
	    },
	},
	highlightedNodes: {
		label: {
			'font-weight': 'bold',
	    },
	    rect: {
	        fill: 'blue',
	        stroke: 'blue',
	        'fill-opacity': 0,
	        'stroke-width': 4,
	    }
	},
	dummyNodes: {
		radius: 10,
	},
	edges: {
	    color: 'black',
	    arrow_height: 2,
	},
	interaction: {
		onClick: function(label, rect, mask, settings) {
			var rectBox = rect.getBBox();
			Ext.create('Ext.window.Window', {
			    title: label.text,
			    html: 'Your stuff here',
			    width: rectBox.width,
			    x: rectBox.x + 500,
			    y: rectBox.y + rectBox.height 
			}).show();
		}
	},
};
