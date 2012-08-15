
var nodes = { 
		'1':{'link':'javascript:alert(\"Link 1\")','label': 'You can custom'},
		'2':{'link':'javascript:alert(\"Link 2\")','label': 'an ExtJs drawComponent'},
		'3':{'link':'javascript:alert(\"Link 3\")','label': 'the component like',"highlighted":1},
		'4':{'link':'javascript:alert(\"Link 4\")','label': 'and every cell'},
		'5':{'link':'javascript:alert(\"Link 5\")','label': 'and animations'},
		'6':{'link':'javascript:alert(\"Link 6\")','label': 'in a lot of'},
		'7':{'link':'javascript:alert(\"Link 7\")','label': 'different ways.'},
		'8':{'link':'javascript:alert(\"Link 8\")','label': 'Do it like you want !'} 
};
var edges = [ [3,5],[2,7],[4,6],[6,8],[2,4],[5,7],[1,3],[2,8],[1,2],[7,8],[3,4] ];

var dag = {'nodes':nodes, 'edges':edges};

