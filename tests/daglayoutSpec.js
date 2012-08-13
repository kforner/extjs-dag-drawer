describe("daglayout", function() {

	var nodes1 = { 1:{},2:{},3:{"highlighted":1},4:{},5:{},6:{},7:{},8:{} };
	var edges1 = [ [3,5],[2,7],[4,6],[6,8],[2,4],[5,7],[1,3],[2,8],[1,2],[7,8],[3,4] ];
	var dag1 = {nodes:nodes1, edges:edges1};
	
	var nodes2 = { 1:{},2:{},3:{},4:{},5:{} };
	var edges2 = [ [1,3],[2,3],[3,4],[4,5] ];
	var dag2 = {nodes:nodes2, edges:edges2};
	
	var nodes3 = { 1:{"highlighted":1},2:{},3:{},4:{},5:{},6:{},7:{"highlighted":1} };
	var edges3 = [ [1,2],[1,3],[1,4],[1,5],[1,6],[1,7],[2,5],[3,6],[4,7] ];
	var dag3 = {nodes:nodes3, edges:edges3};
	
	var nodes4 = { 1:{},2:{},3:{} };
	var edges4 = [ ];
	var dag4 = {nodes:nodes4, edges:edges4};
	
	var nodes5 = { 1:{},2:{},3:{},4:{},5:{},6:{}};
	var edges5 = [ [1,4],[1,5],[1,6],[2,4],[2,5],[2,6],[3,4],[3,5],[3,6] ];
	var dag5 = {nodes:nodes5, edges:edges5};
	
	function countNodesInLayers(layers){
		var nodesNumber = 0;
		for(layer in layers) for(node in layers[layer]) nodesNumber++;
		return nodesNumber;
	}
	
	function countDummyNodes(nodes){
		var dummiesNumber = 0;
		for(node in nodes) if(nodes[node].dummy) dummiesNumber++;
		return dummiesNumber;
	}
	

	it("compute_successors", function() {
		{
			var successors = compute_successors(dag1);
			expect( successors ).toEqual( {1:[2,3],2:[4,7,8],3:[4,5],4:[6],5:[7],6:[8],7:[8],8:[]} );	
		}
		{
			var successors = compute_successors(dag3);
			expect( successors ).toEqual( {1:[2,3,4,5,6,7],2:[5],3:[6],4:[7],5:[],6:[],7:[]} );
		}
		{
			var successors = compute_successors(dag4);
			expect( successors ).toEqual( {1:[],2:[],3:[]} );
		}
	});
	

	it("longestPathLayering", function() {
		{
			var layers = longestPathLayering(dag1);
			var nodesNumber = countNodesInLayers(layers);
			expect( layers ).toEqual( [['1'],['2','3'],['4','5'],['6','7'],['8']] );
			expect( layers.length ).toEqual( 5 );
			expect( nodesNumber ).toEqual( 8 );
		}
		{
			var layers = longestPathLayering(dag3);
			var nodesNumber = countNodesInLayers(layers);
			expect( layers ).toEqual( [['1'],['2','3','4'],['5','6','7']] );
			expect( layers.length ).toEqual( 3 );
			expect( nodesNumber ).toEqual( 7 );
		}
		{
			var layers = longestPathLayering(dag4);
			var nodesNumber = countNodesInLayers(layers);
			expect( layers ).toEqual( [['1','2','3']] );
			expect( layers.length ).toEqual( 1 );
			expect( nodesNumber ).toEqual( 3 );
		}
	});
	

	it("addDummyNodes", function() {
		{
			var dag = dag1;
			var layers = longestPathLayering(dag);
			var nodesNumber = countNodesInLayers(layers);
			
			var dagWithLayers = addDummyNodes(dag, layers);
			var dummiesNumber = countDummyNodes(dagWithLayers.dag.nodes);
			var nodesNumberWithDummies = countNodesInLayers(dagWithLayers.layers);
			for(var node=1; node<=nodesNumber; node++) expect(dagWithLayers.dag[node]).toEqual(dag[node]);
			expect(dummiesNumber).toEqual(3);
			expect(dummiesNumber + nodesNumber).toEqual(nodesNumberWithDummies);
		}
		{
			var dag = dag2;
			var layers = longestPathLayering(dag);
			var nodesNumber = countNodesInLayers(layers);
			var dagWithLayers = addDummyNodes(dag, layers);
			var dummiesNumber = countDummyNodes(dag.nodes);
			var nodesNumberWithDummies = countNodesInLayers(dagWithLayers.layers);
			for(var node=1; node<=nodesNumber; node++) expect(dagWithLayers.dag[node]).toEqual(dag[node]);
			expect(dummiesNumber).toEqual(0);
			expect(dummiesNumber + nodesNumber).toEqual(nodesNumberWithDummies);
		}
		{
			var dag = dag3;
			var layers = longestPathLayering(dag);
			var nodesNumber = countNodesInLayers(layers);
			var dagWithLayers = addDummyNodes(dag, layers);
			var dummiesNumber = countDummyNodes(dag.nodes);
			var nodesNumberWithDummies = countNodesInLayers(dagWithLayers.layers);
			for(var node=1; node<=nodesNumber; node++) expect(dagWithLayers.dag[node]).toEqual(dag[node]);
			expect(dummiesNumber).toEqual(3);
			expect(dummiesNumber + nodesNumber).toEqual(nodesNumberWithDummies);
		}

	});
	
	
	it("compute_crossing_numbers", function() {
		{
			var layer1 = ['2','3'];
			var layer2 = ['4','5'];
			var successors = compute_successors(dag1);
			var crossings = compute_crossing_numbers(successors, layer1, layer2);
			expect( crossings ).toEqual( {4:{4:0,5:0},5:{4:1,5:0}} );
		}
		{
			var layer1 = [];
			var layer2 = ['1'];
			var successors = compute_successors(dag4);
			var crossings = compute_crossing_numbers(successors, layer1, layer2);
			expect( crossings ).toEqual( {1:{1:0}} );
		}
		{
			var layer1 = ['1','2','3'];
			var layer2 = ['4','5'];
			var successors = compute_successors(dag4);
			var crossings = compute_crossing_numbers(successors, layer1, layer2);
			expect( crossings ).toEqual( {4:{4:0,5:0},5:{4:0,5:0}} );
		}
	});
	
	
	it("compute_crossing", function() {
		{
			var layer1 = ['2','3'];
			var layer2 = ['4','5'];
			var successors = compute_successors(dag1);
			var crossings = compute_crossing_numbers(successors, layer1,
		            layer2);
			var cn = compute_crossing(crossings, layer2);
			expect( cn ).toEqual( 0 );
		}
		{
			var layer1 = ['1','2','3'];
			var layer2 = ['4','5'];
			var successors = compute_successors(dag5);
			var crossings = compute_crossing_numbers(successors, layer1,
		            layer2);
			var cn = compute_crossing(crossings, layer2);
			expect( cn ).toEqual( 3 );
		}
	});
	
	
	it("compute_crossing_lower_bound", function() {
		{
			var layer1 = ['2','3'];
			var layer2 = ['4','5'];
			var successors = compute_successors(dag1);
			var crossings = compute_crossing_numbers(successors, layer1,
		            layer2);		
		    var lb = compute_crossing_lower_bound(crossings, layer2);
		    expect( lb ).toEqual( 0 );
		}
		{
			var layer1 = ['1','2','3'];
			var layer2 = ['4','5','6'];
			var successors = compute_successors(dag5);
			var crossings = compute_crossing_numbers(successors, layer1,
		            layer2);		
		    var lb = compute_crossing_lower_bound(crossings, layer2);
		    expect( lb ).toEqual( 9 );
		}
	});
	

	it("two_layer_adjacent_exchange", function() {
		{
			var layer1 = ['2','3'];
			var layer2 = ['5','4'];
			var successors = compute_successors(dag1);
			var res = two_layer_adjacent_exchange(nodes1, successors,
		        layer1, layer2);
			expect( res ).toEqual( {crossings:0, lower_bound:0, ordering:['4','5']} );
		}
		{
			var layer1 = ['1','2','3'];
			var layer2 = ['4','6'];
			var successors = compute_successors(dag5);
			var res = two_layer_adjacent_exchange(nodes1, successors,
		        layer1, layer2);
			expect( res ).toEqual( {crossings:3, lower_bound:3, ordering:['4','6']} );
		}
	});
	
	
	it("topDownLayerByLayerSweep", function() {
		{
			var layers = longestPathLayering(dag1);
			var dagWithLayers = addDummyNodes(dag1, layers);
			var res_top = topDownLayerByLayerSweep(dagWithLayers.dag, dagWithLayers.layers, two_layer_adjacent_exchange);
			expect( res_top.crossings ).toEqual( 3 );
		    expect( res_top.lower_bound ).toEqual( 2 );
		    expect( res_top.layers[1] ).toEqual( ['2','3'] );	
		}
		{
			var layers = longestPathLayering(dag4);
			var dagWithLayers = addDummyNodes(dag4, layers);
			var res_top = topDownLayerByLayerSweep(dagWithLayers.dag, dagWithLayers.layers, two_layer_adjacent_exchange);
			expect( res_top.crossings ).toEqual( 0 );
		    expect( res_top.lower_bound ).toEqual( 0 );
		    expect( res_top.layers[0] ).toEqual( ['1','2','3'] );	
		}
	});
	
	
	it("bottomUpLayerByLayerSweep", function() {
		{
			var layers = longestPathLayering(dag1);
			var res_up = bottomUpLayerByLayerSweep(dag1, layers, two_layer_adjacent_exchange);
			expect( res_up.crossings ).toEqual( 0 );
		    expect( res_up.lower_bound ).toEqual( 0 );
		    expect( res_up.layers[1] ).toEqual( ['2','3'] );
		}
		{
			var layers = longestPathLayering(dag2);
			var res_up = bottomUpLayerByLayerSweep(dag2, layers, two_layer_adjacent_exchange);
			expect( res_up.crossings ).toEqual( 0 );
		    expect( res_up.lower_bound ).toEqual( 0 );
		    expect( res_up.layers[1] ).toEqual( ['3'] );
		}
	});
	
	
	it("orderLayersUsing2waysSweep", function() {
		{
			var layers = longestPathLayering(dag1);
			var dagWithLayers = addDummyNodes(dag1, layers);
			var res = orderLayersUsing2waysSweep(dagWithLayers.dag, dagWithLayers.layers, two_layer_adjacent_exchange);
			expect( res.crossings ).toEqual( 1 );
		    expect( res.lower_bound ).toEqual( 1 );
		    expect( res.layers[1] ).toEqual( ['3','2'] );
		}
		{
			var layers = longestPathLayering(dag3);
			var dagWithLayers = addDummyNodes(dag3, layers);
			var res = orderLayersUsing2waysSweep(dagWithLayers.dag, dagWithLayers.layers, two_layer_adjacent_exchange);
			expect( res.crossings ).toEqual( 0 );
		    expect( res.lower_bound ).toEqual( 0 );
		    expect( res.layers[2] ).toEqual( ['5','6','7'] );
		}
	});
	
	
	it("topDownLayerLayout", function() {
		{
			var layout = topDownLayerLayout(dag1);
			expect(layout.dag.nodes).toEqual( {1:{},2:{},3:{highlighted:1},4:{},5:{},6:{},7:{},8:{},dummy_2_7_2:{label:'',dummy:true},dummy_2_8_2:{label:'',dummy:true},dummy_2_8_3:{label:'',dummy:true}} );
			expect(layout.dag.edges).toEqual( [[3,5],[2,'dummy_2_7_2'],['dummy_2_7_2',7],[4,6],[6,8],[2,4],[5,7],[1,3],[2,'dummy_2_8_2'],['dummy_2_8_2','dummy_2_8_3'],['dummy_2_8_3',8],[1,2],[7,8],[3,4]] );
			expect(layout.layers).toEqual( [ [ '1', 'dummy_2_7_2', 'dummy_2_8_2', 'dummy_2_8_3' ], [ '2', '3' ], [ 'dummy_2_7_2', 'dummy_2_8_2', '4', '5' ], [ '6', '7', 'dummy_2_8_3' ], [ '8' ] ] );	
		}
		{
			var layout = topDownLayerLayout(dag2);
			expect(layout.dag.nodes).toEqual( { 1 : { }, 2 : { }, 3 : { }, 4 : { }, 5 : { } } );
			expect(layout.dag.edges).toEqual( [ [ 1, 3 ], [ 2, 3 ], [ 3, 4 ], [ 4, 5 ] ] );
			expect(layout.layers).toEqual( [ [ '1', '2' ], [ '3' ], [ '4' ], [ '5' ] ] );	
		}
		{
			var layout = topDownLayerLayout(dag4);
			expect(layout.dag.nodes).toEqual( { 1 : { }, 2 : { }, 3 : { } } );
			expect(layout.dag.edges).toEqual( [] );
			expect(layout.layers).toEqual( [ [ '1', '2', '3' ] ]  );	
		}
		
	});
	
	
	it("bottomUpLayerLayout", function() {
		{
			var layout = bottomUpLayerLayout(dag1);
			expect(layout.dag.nodes).toEqual( {1:{},2:{},3:{highlighted:1},4:{},5:{},6:{},7:{},8:{},dummy_2_7_2:{label:'',dummy:true},dummy_2_8_2:{label:'',dummy:true},dummy_2_8_3:{label:'',dummy:true}} );
			expect(layout.dag.edges).toEqual( [[3,5],[2,'dummy_2_7_2'],['dummy_2_7_2',7],[4,6],[6,8],[2,4],[5,7],[1,3],[2,'dummy_2_8_2'],['dummy_2_8_2','dummy_2_8_3'],['dummy_2_8_3',8],[1,2],[7,8],[3,4]] );
			expect(layout.layers).toEqual( [ [ '1', 'dummy_2_7_2', 'dummy_2_8_2', 'dummy_2_8_3' ], [ '3', '2' ], [ '4', '5', 'dummy_2_7_2', 'dummy_2_8_2' ], [ '6', '7', 'dummy_2_8_3' ], [ '8' ] ] );	
		}
		{
			var layout = bottomUpLayerLayout(dag2);
			expect(layout.dag.nodes).toEqual( { 1 : { }, 2 : { }, 3 : { }, 4 : { }, 5 : { } } );
			expect(layout.dag.edges).toEqual( [ [ 1, 3 ], [ 2, 3 ], [ 3, 4 ], [ 4, 5 ] ] );
			expect(layout.layers).toEqual( [ [ '1', '2' ], [ '3' ], [ '4' ], [ '5' ] ] );	
		}
		{
			var layout = bottomUpLayerLayout(dag4);
			expect(layout.dag.nodes).toEqual( { 1 : { }, 2 : { }, 3 : { } } );
			expect(layout.dag.edges).toEqual( [] );
			expect(layout.layers).toEqual( [ [ '1', '2', '3' ] ]  );	
		}
		
	});
	
	
	it("maxUpOrDownLayerLayout", function() {
		{
			var layout = maxUpOrDownLayerLayout(dag1);
			var layout_up = bottomUpLayerLayout(dag1);
			expect(layout).toEqual( layout_up );
		}
		{
			var layout = maxUpOrDownLayerLayout(dag2);
			var layout_up = bottomUpLayerLayout(dag2);
			expect(layout).toEqual( layout_up );
		}
		{
			var layout = maxUpOrDownLayerLayout(dag4);
			var layout_down = topDownLayerLayout(dag4);
			expect(layout).toEqual( layout_down );
		}
		
	});
		
});