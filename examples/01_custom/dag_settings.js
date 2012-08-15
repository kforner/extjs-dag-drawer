
var dag_settings = {
	nodes: {
		label: {
			marginWidth: 10,
			marginHeight: 5,
	    },
	    rect: {
	    	width: 50,
	        height: 50,
	        stroke: 'green',
	    },
	},
	interaction: {
		onMouseOver: function(label, rect, mask, settings) {
			var group = Ext.create('Ext.draw.CompositeSprite', {
			    surface: this.surface
			});
			
			group.add(label);
			group.add(rect);
			
			group.animate({
				to: {
					rotate: {
						degrees: 360
					},
					scale: {
						x: 1.2,
						y: 1.2
					}
		   		}
			});
			label.animate({
				to: {
					fill: (rect.attr.fill == 'orange') ? 'red' : 'blue'
		   		},
			});
		},
		onMouseOut: function(label, rect, mask, settings) {
			var group = Ext.create('Ext.draw.CompositeSprite', {
			    surface: this.surface
			});
			
			group.add(label);
			group.add(rect);
			
			group.animate({
				to: {
					rotate: {
						degrees: 0
					},
					scale: {
						x: 1,
						y: 1
					}
		   		}
			});
			label.animate({
				to: {
					fill: 'black'
		   		},
			});
		},
	}    
};
