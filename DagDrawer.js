/*
Copyright 2012 Leo Forner, Karl Forner

The JavaScript code in this page is dual licensed under the terms of the GPLv3 license or later
and the Sencha Model Extension License.
The Sencha licenses allows this component to be used with both the GPL and Commercial extjs framework licenses. 
*/
/*
 *
 * Package: DagDrawer
 *
 * Javascript functions to draw Acyclic graphs
 *
 *
 */

Ext.define('DagDrawer', {
    extend: 'Ext.draw.Component',
    xtype: 'dagdrawer',
    
    autoSize: true,	
    
    settings: {
    	margin: 50,		// margin around the DAG  	
	    layerSpacing: 50,		// space between layers (vertically)
	    nodes: {
	        spacing: 20,		// space between nodes (horizontally)
	        label: {
	            marginWidth: 5,		// margin between text and rectangle 
	            marginHeight: 0,
	            'font-size': '12px',		
	            'font-family': 'Arial,Helvetica,sans-serif',
	            'font-weight': 'bold',
	        },
	        rect: {
	        	width: 60,		// minimum width (resized if the text is bigger)
		        height: 40,		// minimum height
		        fill: 'white',
		        radius: 5,
		        'fill-opacity': 0,
		        stroke: 'blue',
		        'stroke-width': 2,
	        },
	    },
	    highlightedNodes: {
	        rect: {
	            fill: 'orange',
	            stroke: 'red',
	            'fill-opacity': 0.5,
	        },
	    },
	    dummyNodes: {
	    	fill: 'black',
	    	radius: 2,
	    },
	    edges: {
	        color: 'red',
	        arrow_height: 6,		// size of head of the arrows
	    },
	    interaction: {
	    	radius: 5,		// size of the node when your mouse is over
	    	cursor: 'pointer',		// type of cursor when your mouse is over
	    	onMouseOver: function(label, rect, mask, settings) {
	    		var t = settings.interaction.radius;
	    		
	    		rect.animate({
	    			to: {
	    				x : rect.x - t,
	    				y : rect.y - t,
	    				width : rect.width + 2 * t,
	    				height : rect.height + 2 * t,
	    	   		}
	    		});
	    	},
	    	onMouseOut: function(label, rect, mask, settings) {
	    		rect.animate({
	    			to: {
	    				x : rect.x,
	    				y : rect.y,
	    				width : rect.width,
	    				height : rect.height,
	    			}
	    	    });
	    	},
	    	onClick: function(label, rect, mask, settings) {
	    		if(label.link)
	    			document.location.href = label.link;
	    	},
	    },
    },
    
    constructor: function(options){
    	Ext.Object.merge(this, options);
    	Ext.applyIf(this.settings.highlightedNodes, this.settings.nodes);
    	Ext.applyIf(this.settings.highlightedNodes.rect, this.settings.nodes.rect);
    	Ext.applyIf(this.settings.highlightedNodes.label, this.settings.nodes.label);
    	this.callParent();
    },    
       
    initComponent: function () {    
    	this.dagLayout = this.computeLayout.call(null, this.dag);    	
    	this.callParent();   	
    },
    
    onRender: function() {
    	this.callParent();  
    	
    	this.backgroundSprite = this.surface.add({
    		type: 'rect',
        	opacity: 0
    	});
    	
    	this.allShapes = this.applyLayout(this.dagLayout);
    	this.center();    	
    },
});


//============================
//Group: Layout

/*
 * Method: applyLayout
 *
 * apply a layout to the graph, and draw it
 *
 * Parameters: layout - {dag: {nodes:, edges:}, layers: }
 *
 * Returns: list of shapes
 * 
 */
DagDrawer.prototype.applyLayout = function(layout) {
	 this.eraseAll();
	 var settings = this.settings;
	
	 var shapes_by_layer = this.buildShapesByLayer(this.surface, layout.dag.nodes,
			 layout.layers, settings);
	
	 this.setLayerHeights(shapes_by_layer, settings);
	 this.centerLayersHorizontally(shapes_by_layer, settings);	
	
	 var allShapes = [];
	 allShapes.push(shapes_by_layer);
	
	 var connections = this.initEdges(this.surface, shapes_by_layer, layout.dag.edges, settings);
	 connections.forEach(function(s) {
             if (s.line)
                 allShapes.push(s.shape);
             if (s.bg)
                 allShapes.push(s.bg)
         });
	 return allShapes;
},


//=====================
//Group: Other Methods

/*
 * Method: eraseAll
 *
 * delete and erase all shapes
 *
 */
DagDrawer.prototype.eraseAll = function() {
	if ( this.allShapes)
		this.allShapes.forEach(function(s) { s.remove() });
	this.allShapes = null;
},

/*
 * Method: center
 *
 * center the whole graph drawing
 *
 */
DagDrawer.prototype.center = function() {
	var settings = this.settings;
	DagDrawer.TRANSLATE(this.surface.items, settings.margin, settings.margin);
	var box = this.surface.items.getBBox();	

	// create artificial margin
	this.backgroundSprite.setAttributes({
		x: -this.settings.margin,
		y: -this.settings.margin,
		width: box.width + 2*settings.margin,
		height: box.height + 2*settings.margin,
	}, true);
	
	if(this.viewBox && this.autoSize){
		// resize canvas
		this.setSurfaceSize(box.width  + 2*settings.margin, box.height + 2*settings.margin);
		this.autoSize = false;
	};
}

/*
 * Static Method: TRANSLATE 
 * 
 * translate a Sprite or a CompositeSprite (from ExtJS4)
 * 
 * Parameters: sprites - the sprites to translate, dx - the horizontal delta, dy - the vertical delta
 *
 */
DagDrawer.TRANSLATE = function(sprites, dx, dy) {
	sprites.each(function(sprite) {
		sprite.setAttributes({ 
			translate: { 
				x: sprite.attr.translation.x + dx, 
				y: sprite.attr.translation.y + dy 
			} 
		}, true);
	})
}


//============================
//Group: Shapes related Methods

/*
 * Method: initEdges
 *
 * create the drawing/shapes for the edges
 *
 * Parameters: surface - the Ext.draw canvas, allShapes - the list of all
 * Shapes/graphics, should contain the node shapes, edges - the edges list :
 * <edges>, settings - the user settings : <settings>
 *
 * Returns: the list of edge shapes
 *
 */
DagDrawer.prototype.initEdges = function(surface, shapes_by_layer, edges, settings) {
	// make a hash of node names
	var shape_by_name = {};
	shapes_by_layer.forEach(function(layer) {
		layer.forEach(function(shape) {
			shape_by_name[shape.node.name] = shape;
		});
	});
	
	var color = settings.edges.color;
	var me = this;
	var connections = edges.map(function(e) {
		var pred = shape_by_name[e[0]];
        var succ = shape_by_name[e[1]];
        var c = me.drawEdge(surface, pred, succ, color);

        return c;
	});

	return connections;
}

/*
 * Method: buildShapesByLayer
 *
 * create the nodes shapes and organize them by layer.
 *
 * Parameters: surface - the Ext.draw canvas, nodes - the nodes :
 * <nodes>, layers - the layers : a list of lists of nodes, settings - the
 * user settings : <settings>
 *
 * Returns: a list of lists of nodes, ordered by layer
 *
 */
DagDrawer.prototype.buildShapesByLayer = function(surface, nodes,
     layers, settings) {

	var me = this;
	var shapes_by_layer = [];
	
	layers.forEach (function(layer){
		var entry = [];
		layer.forEach (function(node){
			var lnodes = nodes[node];
			lnodes.name = node;
			entry.push(lnodes);
		});
        var shapes = me.buildNodeShapes(surface, entry, settings);
        shapes_by_layer.push(shapes);
	});
	
	return shapes_by_layer;
}

/*
 * Method: centerLayersHorizontally
 *
 * Center horizontally all the layers. It translates the shapes in the
 * layers.
 *
 * Parameters: shapes_by_layer - the shapes by layer as returned by
 * <buildShapesByLayer>
 *
 */
DagDrawer.prototype.centerLayersHorizontally = function(shapes_by_layer) {
	// compute all width
	var widths = shapes_by_layer.map(function(layer) {
        var bb = layer[layer.length - 1].getBBox();
        return bb.x + bb.width;
  	});
	
	var maxWidth = widths.reduce(function(a, b) {
		return Math.max(a, b)
	});
	
	// now center all layers
	shapes_by_layer.forEach(function(layer) {
	    var bb = layer[layer.length - 1].getBBox();
	    var x = maxWidth - (bb.x + bb.width);
	
	    if (x > 0) {
	    	layer.forEach(function(shape) {
	    		DagDrawer.TRANSLATE(shape, x/2, 0);
    	 	});
     	}
	});
}

/*
 * Method: setLayerHeights
 *
 * Center horizontally all the layers. It translates the shapes in the
 * layers.
 *
 * Parameters: shapes_by_layer - the shapes by layer as returned by
 * <buildShapesByLayer>, settings - the user settings : <settings>
 *
 */
DagDrawer.prototype.setLayerHeights = function(shapes_by_layer, settings) {
	 // process layers
	 var spacing = settings.layerSpacing;
	 var y = 0;
	
	 shapes_by_layer.forEach(function(layer) {
	     var layerHeight = 0;
	     layer.forEach(function(shape) {
             layerHeight = Math.max(shape.getBBox().height, layerHeight);
             DagDrawer.TRANSLATE(shape, 0, y);
         });
	     layer.forEach(function(shape) {
             DagDrawer.TRANSLATE(shape, 0, layerHeight/2);
         });
	     
	     y += layerHeight + spacing;
     });
}

/*
 * Method: buildNodeShapes
 *
 * Build the node shapes.
 *
 * Parameters: surface - the Ext.draw canvas, nodes - the list of nodes, settings -
 * the user settings : <settings>
 *
 * Returns: a list of shapes
 *
 */
DagDrawer.prototype.buildNodeShapes = function(surface, nodes, settings) {
	 var shapes = [];
	 var x = 0;
	 var me = this;
	
	 nodes.forEach(function(node) {
	     var s = me.buildNode(surface, node, x, settings);
	     s.node = {};
	     s.node = node;
	     x += s.getBBox().width + me.settings.nodes.spacing;
	
	     shapes.push(s);
	 });
	
	 return shapes;
}

/*
 * Method: buildNode
 *
 * Build the shape of a node.
 *
 * Parameters: surface - the Ext.draw canvas, node - the node, x - the shape
 * horizontal coordinate, settings - the user settings : <settings>
 *
 * Returns: a shape
 *
 */
DagDrawer.prototype.buildNode = function(surface, node, x, settings) {
	var nodSettings;
	if (!node.highlighted) nodSettings = settings.nodes;
	else nodSettings = settings.highlightedNodes;	

	var rectWidth = nodSettings.rect.width;
	var rectHeight = nodSettings.rect.height;
	
	// the node object : a composite sprite
	var sprites = Ext.create('Ext.draw.CompositeSprite', {
		surface: surface, 
	});
	
	// ? is it a dummy node ???
	if (node.dummy) {
		var dummy = surface.add({
	    	type: 'circle',
	    	x: x,
	    	y: rectHeight / 2,
	    });
	
		dummy.setAttributes( settings.dummyNodes, true );
		sprites.add( dummy );    
	} 
	else {    
	    // build a rectangle around the label
	    var rect = surface.add({
	    	type: 'rect',
	    	x: x,
	    	y: 0,
	    	highlighted: node.highlighted,
	    });
	     
	    var label = surface.add({
	    	type: 'text',
	    	x: x,
	    	y: 0,
	    	text: node.label,
	    	link: node.link
	    });
	    
	    rect.setAttributes( nodSettings.rect, true );
	    label.setAttributes(nodSettings.label, true);
	
	    var labelBB = label.getBBox();
	    var labelWidth = labelBB.width + 2 * nodSettings.label.marginWidth + rect.attr['stroke-width'];
	    var labelHeight = labelBB.height + 2 * nodSettings.label.marginHeight + rect.attr['stroke-width'];

	    // check if we need to resize the rectangle
	    if (labelWidth > rectWidth)
	    	rect.setAttributes( {width: labelWidth}, true );

	    if (labelHeight > rectHeight)
	    	rect.setAttributes( {height: labelHeight}, true );
	    
	    var rectBB = rect.getBBox();
	    rect.width = rectBB.width;
	    rect.height = rectBB.height;
	    
	    // create mask sprite for interactions
	    var mask = surface.add({
	    	type: 'rect',
	    	attr: rect.attr
	    });
	    
	    mask.setAttributes({opacity: 0});
	     
	    var labelX = rectBB.width/2 - labelBB.width/2;
	    var labelY = rectBB.height/2 - labelBB.height/2 - labelBB.y;
	    
	    sprites.add(label);
	    // center the label
	    DagDrawer.TRANSLATE(sprites, labelX, labelY);
	    sprites.add(rect);
	    sprites.add(mask);
	    // center the cell vertically
	    DagDrawer.TRANSLATE(sprites, 0, (rectHeight-rectBB.height)/2);

	    mask.on({
	    	mouseover: function() {
	    		mask.setStyle({ cursor: settings.interaction.cursor });
	    		settings.interaction.onMouseOver(label, rect, mask, settings) 
	    	},
	    	mouseout: function() { settings.interaction.onMouseOut(label, rect, mask, settings) },
	    	click: function() { settings.interaction.onClick(label, rect, mask, settings) },
	    	scope: mask
	    });    
	}
    sprites.redraw();
	
	return sprites;
}

/*
 * Method: drawDownwardsArrowHead
 *
 * draw and build the shape of an arrow head, pointing downwards. The extreme
 * point where the arrow is pointing is (0,0)
 *
 * Parameters: surface - the Ext.draw canvas, height - the height of the arrow, color -
 * the color of the arrow
 *
 * Returns: the arrow head shape
 *
 */
DagDrawer.prototype.drawDownwardsArrowHead = function(surface, height, color) {
	var x = height / 2;
	var h = -height - 1;
	var arrow = surface.add({
		type: 'path',
		path: 'M'+ -x +','+ h +'L'+ 0 +','+ -1 +'L'+ x +','+ h +'C'+ 0 +','+ h+2 +','+ -x +','+ h +'Z',
		stroke : color,
	   	fill : color
   	});
		
	return arrow;
}

/*
 * Method: drawEdge
 *
 * draw an edge between two objects/shapes borrowed from raphaeljs example
 * <http://raphaeljs.com/graffle.js>
 *
 * Parameters: surface - the Ext.draw canvas, obj1 - source shape, obj2 - destination
 * shape, line - the edge color
 *
 *
 * Returns: the edge shape
 *
 */
DagDrawer.prototype.drawEdge = function(surface, obj1, obj2, line, bg) {
	if (obj1.line && obj1.from && obj1.to) {
		line = obj1;
		obj1 = line.from;
		obj2 = line.to;
	}

	var arrowHeight = this.settings.edges.arrow_height;

	var bb1 = obj1.getBBox();
	var bb2 = obj2.getBBox();

	// origin
	var xo = bb1.x + bb1.width / 2;
	var yo = bb1.y + bb1.height + 1;

	// destination
	var xd = bb2.x + bb2.width / 2;
	var yd = bb2.y - 1;

	var xmid = (xo + xd) / 2;
	var ymid = (yo + yd) / 2;
	var color = typeof line == "string" ? line : "#000";
	var path = ["M", xo.toFixed(3), yo.toFixed(3), "C", xo.toFixed(3),
	            ymid.toFixed(3), xd.toFixed(3), ymid.toFixed(3), xd.toFixed(3),
	            (yd - arrowHeight).toFixed(3)].join(",");

	var arrow = this.drawDownwardsArrowHead(surface, arrowHeight, color);
	arrow.setAttributes({ translate: { x: xd, y: yd } }, true);
	
	var set = Ext.create('Ext.draw.CompositeSprite', {
		surface: surface
	});
 
	var line = surface.add({
		type: 'path',
		path: path,
		stroke : color, 
		fill : 'none'
	});
	
	set.add(line);
	set.add(arrow);

	return {
		bg : bg && bg.split && surface.add({
			type: 'path',
			path: path,
			stroke : bg.split("|")[0],
			fill : 'none',
			'stroke-width' : bg.split("|")[1] || 3
		}),
		line : line,
		shape : set,
		arrow : arrow,
		from : obj1,
		to : obj2
	};
}
