How to use extjs-dag-drawer
================

This component extends the [ExtJS drawComponent](http://docs.sencha.com/ext-js/4-1/#!/api/Ext.draw.Component), so you can use all its parent properties and methods.

The new configs of DagDrawer are:

* **dag** - A hash which contains information about the DAG to draw. Attributes are: 

   * nodes - A hash whose keys are the node names (should be an integer), and the values are the node objects. The node names should be numbers from 1 to the number of nodes. Attributes are:

      * label - will display the text in the node instead of the internal name
      * link - url that will be used if the node is clicked (optional)
      * highlighted - node is highlighted (drawn differently, depending on the settings, optional too)

   * edges - A list of edges, where each edge is a list [a, b] where a and b are node names (should be integers). 
  		
   Example of dag:
```javascript
	dag:{ 	
		nodes: {
		  	1: { link: "/onMyWebSite/Motivation", label: "Motivation" },
			2: { link: "/onMyWebSite/Data_Structures", label: "Data Structures" },
			3: { link: "/onMyWebSite/Graph_Theory", label: "Graph Theory", highlighted: 1 },
			4: { link: "/onMyWebSite/Basic_Algorithms", label: "Basic Algorithms" },
			5: { link: "/onMyWebSite/Planarity", label: "Planarity" },
			6: { link: "/onMyWebSite/Basic_Graph_Algorithms", label: "Basic Graph Algorithms" },
			7: { link: "/onMyWebSite/Topological_Data_Structures", label: "Topological Data Structures" },
			8: { link: "/onMyWebSite/Planarity_Algorithms", label: "Planarity Algorithms" }
		},
		edges: [ [3, 5], [2, 7], [4, 6], [6, 8], [2, 4], [5, 7], [1, 3], [2, 8], [1, 2], [7, 8], [3, 4] ]	
	}
```	
  		
* **computeLayout**:

A function which calculates how to display the layout (number of layers, number of dummy nodes, ...).
Three algorithms are proposed: topDownLayerLayout, bottomUpLayerLayout or maxUpOrDownLayerLayout.
The last one compares the results of the first one and the second one and keeps the optimized one.
  	
You can add your own algorithm by including your file, the drawing part is entirely independent.
Take a look to theses algorithms to know how to make your own one.
  	
  
* **settings**:

The user settings. It is a hash/object that enables customization.
  	
Each node is composed by a rectangle and a text, excepted dummy nodes which are circles.
By the way, a dummy node is an empty node between an edge from an upper node and an edge from a lower node.
These elements are [ExtJS Sprites](http://docs.sencha.com/ext-js/4-1/#!/api/Ext.draw.Sprite), so you can use all the configs of Sprites.
Specific configs are explained below.

Highlighted nodes are copying configs of normal nodes, excepted the default configs.

Each edge is represented by an arrow, declared as a path.
It's also a Sprite, but it's not more configurable as it is in the default settings. 

Interactions with the nodes are configurable too. You can modify three actions: 
   * when you drag your mouse over,
   * when you drag your mouse out,
   * when you click on.

For example the current defaults look like this:
```javascript  	
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
}
```	
  	
--> _Learn more with [examples sources](../examples)..._
