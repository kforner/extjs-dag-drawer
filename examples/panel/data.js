
var nodes = {
				'1':{"link":"javascript:alert(\"Open Motivation link\")","label":"Motivation"},
				'2':{"link":"javascript:alert(\"Open Data Structures link\")","label":"Data Structures"},
				'3':{"link":"javascript:alert(\"Open Graph Theory link\")","label":"Graph Theory","highlighted":1},
				'4':{"link":"javascript:alert(\"Open Basic Algorithms link\")","label":" Basic Algorithms"},
				'5':{"link":"javascript:alert(\"Open Planarity link\")","label":"Planarity"},
				'6':{"link":"javascript:alert(\"Open Basic Graph Algorithms link\")","label":"Basic Graph Algorithms"},
				'7':{"link":"javascript:alert(\"Open Topological Data Structures link\")","label":" Topological Data Structures"},
				'8':{"link":"javascript:alert(\"Open Planarity Algorithms link\")","label":" Planarity Algorithms"}
};
var edges = [[3,5],[2,7],[4,6],[6,8],[2,4],[5,7],[1,3],[2,8],[1,2],[7,8],[3,4]];

var dag = {'nodes':nodes, 'edges':edges};

