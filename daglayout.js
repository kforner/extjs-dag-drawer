/*
Copyright 2012 Leo Forner, Karl Forner

The JavaScript code in this page is dual licensed under the terms of the GPLv3 license or later
and the Sencha Model Extension License.
The Sencha licenses allows this component to be used with both the GPL and Commercial extjs framework licenses. 
*/
/*
 *
 * Package: DagLayout
 *
 * Javascript functions to calculate the layout of Acyclic graphs
 *
 *
 */


// ===============================
// Group: Data Structures

/*
 * Variable: dag
 * 
 * A dag contains two attributes: nodes and edges.
 * 
 * 
 * - nodes
 *
 * A hash whose keys are the node names (should be an integer), and the values
 * are the node objects. The node names should be the numbers from 1 to the
 * number of nodes. Attributes are:
 *
 *   label - will display the text in the node instead of the internal name
 *   dummy - identifies the node as a dummy node, that is usually drawn as a point
 *   link - url that will be used if the node is clicked
 *   highlighted - node is highlighted (drawn differently, depending on the settings)
 *
 *
 * - edges
 *
 * A list of edges, where each edge is a list [a, b] where a and b are *node
 * names* (should be integers).
 *
 */


// ============================
// Group: Layout

/*
 * Function: topDownLayerLayout
 *
 * Compute a layout using - longestPathLayering - topDown layer sweep
 *
 * Parameter: dag - the nodes and the edges lists
 *
 * Returns: {dag:, layers: }
 * 
 */
function topDownLayerLayout(dag) {

	var layers = longestPathLayering(dag);

    // add dummy nodes and corresponding edges
    var dagAndLayers = addDummyNodes(dag, layers);
    
    var res = topDownLayerByLayerSweep(dagAndLayers.dag, dagAndLayers.layers, two_layer_adjacent_exchange);
    
    return {dag:dagAndLayers.dag, layers:res.layers };
 }

/*
 * Function: bottomUpLayerLayout
 *
 * Compute a layout using - longestPathLayering - bottom_up layer sweep
 *
 * Parameter: dag - the nodes and the edges lists
 *
 * Returns: {dag:, layers: }
 * 
 */
function bottomUpLayerLayout(dag) {

    var layers = longestPathLayering(dag);

    // add dummy nodes and corresponding edges
    var dagAndLayers = addDummyNodes(dag, layers);
    
    var res = bottomUpLayerByLayerSweep(dagAndLayers.dag, dagAndLayers.layers, two_layer_adjacent_exchange);
    
    return {dag:dagAndLayers.dag, layers:res.layers };
}

/*
 * Function: maxUpOrDownLayerLayout
 *
 * Compute a layout using - longestPathLayering - max(bottom_up, top_down) layer
 * sweep
 *
 * Parameter: dag - the nodes and the edges lists
 *
 * Returns: {dag:, layers: }
 * 
 */
function maxUpOrDownLayerLayout(dag) {
    var layers = longestPathLayering(dag);

    // add dummy nodes and corresponding edges
    var dagAndLayers = addDummyNodes(dag, layers);
    
    var res = orderLayersUsing2waysSweep(dagAndLayers.dag, dagAndLayers.layers, two_layer_adjacent_exchange);
    
    return {dag:dagAndLayers.dag, layers:res.layers };
}


// ==============================
// Group: Setup

/*
 * Function: compute_successors
 *
 * Compute the list of successors
 *
 * Parameter: dag - the nodes and the edges lists 
 *
 * Returns: successors - hash of nodes: sorted list of nodes
 *
 *
 */
function compute_successors(dag) {
    var successors = {};
    for (nn in dag.nodes) {
        successors[nn] = [];
    }
    dag.edges.forEach(function(e) {
    		successors[e[0]].push(e[1]);
    	});
    for (nn in dag.nodes) {
        successors[nn].sort(function(a, b) {
        	return a < b ? -1 : a == b ? 0 : 1
    	});
    }
    return successors;
}


// =========
// Group: Layering

/*
 * Function: longestPathLayering
 *
 * Simple algorithm that computes the layers of a digraph 
 * See "Graph Drawing" pp272
 *
 * This algorithm produces the minimum number of layers, but some layers may be
 * quite large compared to the others.
 *
 * Parameter: dag - the nodes and the edges lists 
 *
 * Returns: the layers - a list of lists of node indices
 *
 */
function longestPathLayering(dag) {
    // make a hash of out edges from nodes
    var out_edges = {};
    var in_edges_counts = {};
    for (var name in dag.nodes) {
        out_edges[name] = [];
        in_edges_counts[name] = 0;
    }

    dag.edges.forEach(function(e) {
            out_edges[e[0]].push(e[1]);
            in_edges_counts[e[1]]++;
        });

    // init queue with sources
    var queue = [];
    for (var nodename in dag.nodes) {
        if (in_edges_counts[nodename] == 0)
            queue.push(nodename);
    }

    var longest_path = {}; 
    for (var nodename in dag.nodes)
        longest_path[nodename] = 0;

    var n = null;
    while (n = queue.pop()) {
        var l = longest_path[n] + 1;
        out_edges[n].forEach(function(son) {
                longest_path[son] = Math.max(longest_path[son], l);
                queue.push(son);
            });
    }

    var layers = [];
    for (var nodename in dag.nodes) {
        var l = longest_path[nodename];
        if ( ! layers[l] )
            layers[l] = [];
        layers[l].push(nodename);
    }


    return layers;
}

/*
 * Function: addDummyNodes
 *
 * Add dummy nodes so that no edge crosses a layer.
 *
 * The edges crossing a layer are broken in several edges passing by dummy
 * nodes.
 *
 * Parameters: dag - the nodes and the edges lists, layers - a list of node indices, 
 * see <longestPathLayering>
 *
 * Returns: an object with {
 * 	dag: the newly created dag with dummy nodes, 
 * 	layers: the layers
 * }
 */
function addDummyNodes(dag, layers) {
    var layer_by_node = {};
    for(var i=0; i< layers.length; ++i) 
        layers[i].forEach(function(n) {layer_by_node[n] = i ;} );

    var dagWithDummies = {nodes:dag.nodes, edges: []};
    var new_layers = layers;
    
    dag.edges.forEach(function(e) {
        var a = e[0], b = e[1];
        var pred = a;

        if (layer_by_node[b] - layer_by_node[a] > 1) {
            for (var l = layer_by_node[a] + 1; l < layer_by_node[b]; ++l) {
                var name = ['dummy', a, b, l].join('_');
                var node = {
                    label : '',
                    dummy : true
                };
                dagWithDummies.nodes[name] = node;
                new_layers[l].push( name );

                dagWithDummies.edges.push([pred, name]);
                pred = name;
            }
            dagWithDummies.edges.push([pred, b]);
        } else {
        	dagWithDummies.edges.push(e);
        }
    });

    return {dag:dagWithDummies, layers:new_layers};
}


// ======================
// Group: Layer ordering

/*
 * Function: two_layer_adjacent_exchange
 *
 * 2-layer crossing minimization problem : Algorithm adjacent exchange. This is
 * the base method for layer ordering
 * See Graph Drawing pp283
 * 
 * Parameters: nodes - the list of nodes, successors - the list
 * of successors, layer1 - ordered layer : an array of node indices, layer2 -
 * an array of node indices.
 *
 * Returns: an object with: {
 * 	crossings: the matrix of crossing numbers, see <compute_crossing_numbers>,
 * 	lower_bound: the lower bound of the number of crossing numbers : int,
 * 	ordering: an ordering of layer2 : list of nodes indices
 * }
 */

function two_layer_adjacent_exchange(nodes, successors,
        layer1, layer2) {
    var crossings = compute_crossing_numbers(successors, layer1,
            layer2);
    var cn = compute_crossing(crossings, layer2);
    var lb = compute_crossing_lower_bound(crossings, layer2);

    if (cn == lb) { // already optimal, nothing to do
        return {
            crossings : cn,
            lower_bound : lb,
            ordering : layer2
        };
    }

    var best_crossing = cn;
    var l2 = layer2.slice();
    var n2 = l2.length, i = 0, left = 0, right = 0, cross = 0;
    while (true) {
        left = l2[0];
        for (i = 1; i < n2; ++i) { // scan
            right = l2[i];

            if (crossings[left][right] > crossings[right][left]) {
                // swap nodes
                l2[i - 1] = right;
                l2[i] = left;
            }

            left = l2[i];
        }
        // compute
        cross = compute_crossing(crossings, l2);
       
        if (cross >= best_crossing)
            break;
        best_crossing = cross;
        if (best_crossing == lb)
            break; // reached the lower bound
    }
    return {
        crossings : best_crossing,
        lower_bound : lb,
        ordering : l2
    };
}


/*
 * Function: topDownLayerByLayerSweep
 *
 * Do a top-down layer by layer sweep ordering to reduce the number of
 * crossings.
 *
 * The two-layer algorithm function is given as argument, and takes
 * (dag.nodes, successors, layer1, layer2) as arguments, and return a hash of
 * {crossings:#, ordering:list}
 *
 * Parameters: dag - the nodes and the edges lists, layers_orig - a list of 
 * node indices, see <longestPathLayering>, two_layer_algorithm - the algorithm 
 * to use for 2-layer minimization problem : function, see <two_layer_adjacent_exchange>
 *
 * Returns: an object with: {
 * 	crossings: the matrix of crossing numbers, see <compute_crossing_numbers>,
 * 	lower_bound:the lower bound of the number of crossing numbers : int,
 * 	layers: the ordered layers : list of nodes indices
 * }
 */
function topDownLayerByLayerSweep(dag, layers_orig, two_layer_algorithm) {
     var successors = compute_successors(dag);
     var nb = layers_orig.length;

    var layers = layers_orig.map(function(t) {
            return t.slice()
        }); // clone

    var best = Number.MAX_VALUE;

    var lower_bound = 0;
    var l1 = layers[0];
    var nb_crossings = 0;
    for (var i = 1; i < nb; ++i) {
        var l2 = layers[i];
        var res = two_layer_algorithm.call(null, dag.nodes, successors,
            l1, l2);
        lower_bound += res.lower_bound;
        nb_crossings += res.crossings;
        l1 = layers[i] = res.ordering;
    }

    best = nb_crossings;

    return {
        crossings : best,
        lower_bound:lower_bound,
        layers : layers
    };
}

/*
 * 
 * Function: bottomUpLayerByLayerSweep
 *
 * Do a bottom-up layer by layer sweep to reduce crossing number. calls
 * <topDownLayerByLayerSweep>
 *
 * Parameters: dag - the nodes and the edges lists, layers - a list of list of 
 * node indices, see <longestPathLayering>, two_layer_algorithm - the algorithm to use for 
 * 2-layer minimization problem : function
 * 
 */
function bottomUpLayerByLayerSweep(dag, layers, two_layer_algorithm) {
     // inverse layers and edges
     var reversed_edges = dag.edges.map(function(e) {return e.slice().reverse() } );
     var reversed_layers = layers.slice().reverse();
     var reversed_dag = {nodes:dag.nodes, edges:reversed_edges};

     var res = topDownLayerByLayerSweep(reversed_dag,
         reversed_layers, two_layer_algorithm);
     res.layers.reverse();
     
     return res;
 }

/*
 * Function: orderLayersUsing2waysSweep
 *
 * Do a topDown layer sweep *and* a bottomUp one, and return the layering of
 * which minimizes the number of crossings. See <bottomUpLayerByLayerSweep> and
 * <topDownLayerByLayerSweep>
 *
 * Parameters: dag - the nodes and the edges lists, layers - a list of list of 
 * node indices, see <longestPathLayering>, algo - the algorithm to use for 
 * 2-layer minimization problem : function
 *
 */

function orderLayersUsing2waysSweep(dag, layers, algo) {

    var res_top = topDownLayerByLayerSweep(dag, layers, algo);
    var res_up = bottomUpLayerByLayerSweep(dag, layers, algo);
    
    return res_top.crossings < res_up.crossings ? res_top : res_up;
}

/*
 * Function: compute_crossing
 *
 * Compute the number of crossings between one ordered layer and
 * an ordering of the next layer Useful to test an layer ordering
 *
 * Parameters: matrix - the matrix of crossing numbers, as computed by
 * <compute_crossing_numbers> layer2 - the layer : an array of node indices.
 *
 * Returns: the number of crossings - int
 * 
 */
function compute_crossing(matrix, layer2) {
    var n2 = layer2.length;
    var crossings = 0;
    for (var i = 0; i < n2; ++i) {
        for (var j = i + 1; j < n2; ++j)
            crossings += matrix[layer2[i]][layer2[j]];
    }
    return crossings;
}

/*
 * Function: compute_crossing_lower_bound
 *
 * Compute the lower bound of the number of crossings between
 * one ordered layer and the next (unordered) layer.
 *
 * Parameters: matrix - the matrix of crossing numbers, as computed by
 * <compute_crossing_numbers> layer2 - the layer : a list of node indices.
 *
 * Returns: lower bound - int
 * 
 */
function compute_crossing_lower_bound(matrix, layer2) {
    var n2 = layer2.length;
    var lb = 0;
    for (var i = 0; i < n2; ++i) {
        for (var j = i + 1; j < n2; ++j)
        	lb += Math.min(matrix[layer2[i]][layer2[j]],
    			matrix[layer2[j]][layer2[i]]);
    }
    return lb;
}

/*
 * Function: compute_crossing_numbers
 *
 * Compute the crossing numbers for layer 2 assuming that layer1
 * is ordered.
 *
 * Parameters: successors - the list of successors, layer1 - ordered layer : a
 * list of node indices, layer2 - the unordered layer : a list of node indices.
 *
 * Returns: matrix - a matrix n2 by n2 where n2 is the # of nodes in layer2
 * 
 */

function compute_crossing_numbers(successors, layer1, layer2) {
    var n1 = layer1.length;
    var p = layer1[0];
    var isNodeLayer2 = {};
    layer2.forEach(function(x) {
            isNodeLayer2[x] = true
        });

    // init crossing matrix
    var matrix = {};
    var n2 = layer2.length;
    for (var i = 0; i < n2; ++i) {
        var t = matrix[layer2[i]] = {};
        for (var j = 0; j < n2; ++j)
            t[layer2[j]] = 0;
    }

    // compute all successor lists from layer1 to layer2
    var succs = {};
    layer1.forEach(function(n) {
        var list = successors[n];
        succs[n] = list.filter(function(x) {
        	return isNodeLayer2[x]
        });

    });

    var psucc, pn, qsucc, qn, p, q, p2, q2;
    for (var pi = 0; pi < n1; ++pi) {
        p = layer1[pi];
        psucc = succs[p];
        pn = psucc.length;
        for (var qi = pi + 1; qi < n1; ++qi) {
            q = layer1[qi];
            qsucc = succs[q];
            qn = qsucc.length;
            for (var i = 0; i < pn; ++i) {
                p2 = psucc[i];
                for (var j = 0; j < qn; ++j) {
                    q2 = qsucc[j];
                    if (p2 != q2)
                        matrix[q2][p2]++;
                }
            }
        }
    }

    return matrix;
}

