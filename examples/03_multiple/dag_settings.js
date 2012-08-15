
var dag_settings = {
	margin: 20,
	nodes: {
	    label: {
	        marginWidth: 5,
	        marginHeight: 5,
	    },
	    rect: {
	    	width: 60,
	        height: 40,
	        fill: 'blue',
	        radius: 5,
	        'fill-opacity': 0.1,
	        stroke: 'blue',
	        'stroke-width': 1,
	    },
	},
	interaction: {
		radius: 5,
		cursor: 'pointer',
		onMouseOver: function(label, rect, mask, settings) {
			var group = Ext.create('Ext.draw.CompositeSprite', {
				surface: this.surface
			});
			group.add(label);
			group.add(rect);
			group.add(mask);
			
			group.animate({
				to: {
					scale: {
						x: 1.3,
						y: 1.3,
					},
					'stroke-width': 2,
		   		}
			});
		},
		onMouseOut: function(label, rect, mask, settings) {
			var group = Ext.create('Ext.draw.CompositeSprite', {
			    surface: this.surface
			});
			group.add(label);
			group.add(rect);
			group.add(mask);
			
			group.animate({
				to: {
					scale: {
						x: 1,
						y: 1,
					},
		            'stroke-width': 1,	 
				}
		    });
		},
	}
};
