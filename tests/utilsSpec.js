describe("utils", function() {
	
	
	it("getPropertiesValues", function() {
		// undefined
		expect( getPropertiesValues(undefined) ).toEqual([]);

		var res2 =  getPropertiesValues({a:1, b:"deux"});
		expect( res2.length ).toEqual( 2 );
		expect( res2 ).toContain(1);
		expect( res2 ).toContain("deux");
	});
	

	it("map", function() {
		{
			var layers = [['1','2'],['3']];
			var layers_copy = layers.map(function(t) {
	            return t.slice()
	        });	// clone
			expect( layers_copy ).toEqual( layers );
			
			var reversed_layers = layers.map(function(e) {
				return e.slice().reverse() 
			});	// inverse )
			expect( reversed_layers).toEqual( [['2','1'],['3']] );
		}
		{
			var layers = [];
			var layers_copy = layers.map(function(t) {
	            return t.slice()
	        });	// clone
			expect( layers_copy ).toEqual( [] );
			
			var reversed_layers = layers.map(function(e) {
				return e.slice().reverse() 
			});	// inverse 
			expect( reversed_layers ).toEqual( [] );
		}
	});
	
	
	it("filter", function() {
		{
			var layer1 = ['2','3'];
			var layer2 = ['4','5'];
			var successors = {1:[2,3],2:[4,7,8],3:[4,5],4:[6],5:[7],6:[8],7:[8],8:[]};
			var isNodeLayer2 = {};
		    layer2.forEach(function(x) {
                isNodeLayer2[x] = true
            });
			var succs = {};
		    layer1.forEach(function(n) {
		        var list = successors[n];
		        succs[n] = list.filter(function(x) {
		        	return isNodeLayer2[x]
		        });

		    });
			expect( succs ).toEqual( {2:[4],3:[4,5]} );
		}
		{
			var layer1 = [];
			var layer2 = [];
			var successors = {};
			var isNodeLayer2 = {};
		    layer2.forEach(function(x) {
                isNodeLayer2[x] = true
            });
			var succs = {};
		    layer1.forEach(function(n) {
		        var list = successors[n];
		        succs[n] = list.filter(function(x) {
		        	return isNodeLayer2[x]
		        });

		    });
			expect( succs ).toEqual( {} );
		}
	});
	
	
	it("reduce", function() {
		{
			var widths = [236, 1258, 1282.0089513538187, 655.0149189230314, 851, 539.0089513538187, 165];
			var maxWidth = widths.reduce(function(a, b) {
				return Math.max(a, b)
			});
			expect( maxWidth ).toEqual( 1282.0089513538187 );
		}
		{
			var widths = [ 0 ];
			var maxWidth = widths.reduce(function(a, b) {
				return Math.max(a, b)
			});
			expect( maxWidth ).toEqual( 0 );
		}
	});
	
});
