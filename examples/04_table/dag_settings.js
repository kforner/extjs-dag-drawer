
var dag_settings = {
	margin: 50,
	layerSpacing: 50,
	nodes: {
	    spacing: 20,
	    label: {
	        'font-size': '16px',
	        'font-family': '"Times New Roman",Times,serif',
	        fill: 'white'
	    },
	    rect: {
	    	width: 20,
	        height: 40,
	        fill: 'grey',
	        'fill-opacity': 1,
	        stroke: 'black',
	    },
	},
	highlightedNodes: {
	    rect: {
	        fill: 'purple',
	        stroke: 'black',
	    },
	},
	edges: {
	    color: 'green',
	    arrow_height: 6,
	},
	interaction: {
		onMouseOver: function(label, rect, mask, settings) {
			var t = settings.interaction.radius;
			rect.animate({
				to:{
					scale: {
	    				x: 1.2,
	    				y: 1.2,
					}
				},
				easing: 'elasticIn',
				duration: 500
			});
		},
		onMouseOut: function(label, rect, mask, settings) {
			rect.animate({
				to: {
					scale: {
	    				x: 1,
	    				y: 1,
	    			}
				},
				easing: 'elasticIn',
				duration: 500
		    });
		},
		onClick: function(label, rect, mask, settings) {
			if(rect.highlighted){
				rect.highlighted = false;
				rect.setAttributes({
					fill: settings.nodes.rect.fill, 
					'fill-opacity': settings.nodes.rect['fill-opacity']
				}, true);
			}
			else {
				rect.highlighted = true;
				rect.setAttributes({
					fill: settings.highlightedNodes.rect.fill, 
					'fill-opacity': settings.highlightedNodes.rect['fill-opacity']
				}, true);
			}
		},
	},
};
