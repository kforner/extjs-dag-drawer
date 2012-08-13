
var nodes = { '1':{'link':'javascript:alert(\"Link 1\")','label': '1'},'2':{'link':'javascript:alert(\"Link 2\")','label': '2'},'3':{'link':'javascript:alert(\"Link 3\")','label': '3',"highlighted":1},'4':{'link':'javascript:alert(\"Link 4\")','label': '4'},'5':{'link':'javascript:alert(\"Link 5\")','label': '5'},'6':{'link':'javascript:alert(\"Link 6\")','label': '6'},'7':{'link':'javascript:alert(\"Link 7\")','label': '7'},'8':{'link':'javascript:alert(\"Link 8\")','label': '8'} };
var edges = [ [3,5],[2,7],[4,6],[6,8],[2,4],[5,7],[1,3],[2,8],[1,2],[7,8],[3,4] ];
var dag = {'nodes':nodes, 'edges':edges};

