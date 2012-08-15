
var nodes1 = {
		'1':{"label":"Motivation"},
		'2':{"label":"Data Structures"},
		'3':{"label":"Graph Theory","highlighted":1},
		'4':{"label":" Basic Algorithms"},
		'5':{"label":"Planarity"},
		'6':{"label":"Basic Graph Algorithms"},
		'7':{"label":" Topological Data Structures","highlighted":1},
		'8':{"label":" Planarity Algorithms"}
};
var edges1 = [[3,5],[2,7],[4,6],[6,8],[2,4],[5,7],[1,3],[2,8],[1,2],[7,8],[3,4]];
var dag1 = {'nodes':nodes1, 'edges':edges1};

var nodes2 = { 
		'1':{'label': 'You can write'},
		'2':{'label': 'Many things'},
		'3':{'label': 'On\n many\n many\n many\n lines'},
		'4':{'label': 'Or'},
		'5':{'label': 'Make a very very very very long line'},
		'6':{'label': 'It is made for !', 'highlighted': 1} 
};
var edges2 = [ [1,3],[2,3],[2,4],[3,5],[5,6] ];
var dag2 = {'nodes':nodes2, 'edges':edges2};

var nodes3 = { '1':{'label': '1'},'2':{'label': '2'},'3':{'label': '3'},'4':{'label': '4'},'5':{'label': '5'},'6':{'label': '6'} };
var edges3 = [ [1,4],[1,5],[1,6],[2,4],[2,5],[2,6],[3,4],[3,5],[3,6] ];
var dag3 = {'nodes':nodes3, 'edges':edges3};

var nodes4 = { '1':{'label': '1',"highlighted":1},'2':{'label': '2'},'3':{'label': '3'},'4':{'label': '4'},'5':{'label': '5'},'6':{'label': '6'},'7':{'label': '7',"highlighted":1} };
var edges4 = [ [1,2],[1,3],[1,4],[1,5],[1,6],[1,7],[2,5],[3,6],[4,7] ];
var dag4 = {'nodes':nodes4, 'edges':edges4};



