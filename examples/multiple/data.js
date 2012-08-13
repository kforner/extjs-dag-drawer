
var nodes1 = { '1':{'link':'javascript:alert(\"Link 1\")','label': '1',"highlighted":1},'2':{'link':'javascript:alert(\"Link 2\")','label': '2'},'3':{'link':'javascript:alert(\"Link 3\")','label': '3'},'4':{'link':'javascript:alert(\"Link 4\")','label': '4'},'5':{'link':'javascript:alert(\"Link 5\")','label': '5'},'6':{'link':'javascript:alert(\"Link 6\")','label': '6'},'7':{'link':'javascript:alert(\"Link 7\")','label': '7',"highlighted":1} };
var edges1 = [ [1,2],[1,3],[1,4],[1,5],[1,6],[1,7],[2,5],[3,6],[4,7] ];
var dag1 = {'nodes':nodes1, 'edges':edges1};

var nodes2 = { '1':{'link':'javascript:alert(\"Link a\")','label': 'a'},'2':{'link':'javascript:alert(\"Link b\")','label': 'b'},'3':{'link':'javascript:alert(\"Link c\")','label': 'c'},'4':{'link':'javascript:alert(\"Link d\")','label': 'd'},'5':{'link':'javascript:alert(\"Link e\")','label': 'e'} };
var edges2 = [ [1,3],[2,3],[3,4],[4,5] ];
var dag2 = {'nodes':nodes2, 'edges':edges2};

