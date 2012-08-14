
var nodes = { 3525:{"link":"javascript:alert(\"Open the related page\")","label":"Clinical conduct"},
              3526:{"link":"javascript:alert(\"Open the related page\")","label":"Sample:Sample reception\nSample Reception - Ivrea"},
              3527:{"link":"javascript:alert(\"Open the related page\")","label":"ClinDM:Database lock\nDatabase lock ADVANTAGE"},
              3528:{"link":"javascript:alert(\"Open the related page\")","label":"Writing - BAP\nBAP ADVANTAGE"},
              3530:{"link":"javascript:alert(\"Open the related page\")","label":"Writing - SAP\nSAP ADVANTAGE"},
              3531:{"link":"javascript:alert(\"Open the related page\")","label":"Writing - Biomarker report\nExploratory BM Report"},
              4090:{"link":"javascript:alert(\"Open the related page\")","label":"Assay - Circulating markers\nBiological analysis"},
              4515:{"link":"javascript:alert(\"Open the related page\")","label":"Sample:Sample reception\nEDTA Sample Reception - Geneva"},
              5356:{"link":"javascript:alert(\"Open the related page\")","label":"Sample:Sample data reconciliation\nSample Reconciliation by GDM, ICF by BMDM"},
              5437:{"link":"javascript:alert(\"Open the related page\")","label":"Stat:Protein expression\nStatistical analysis - \nProtein expression Script Preparation"},
              5438:{"link":"javascript:alert(\"Open the related page\")","label":"Stat:Protein expression\nStatistical analysis - Protein expression => Analysis for DP3"},
              5439:{"link":"javascript:alert(\"Open the related page\")","label":"Stat:Protein expression\nStatistical analysis - Protein expression POST-DP3"},
              5440:{"link":"javascript:alert(\"Open the related page\")","label":"Stat:Protein expression\nCirculating proteins"},
              5727:{"link":"javascript:alert(\"Open the related page\")","label":"Assay - Immunostaining\nIHC @ Indivumed"},
              5936:{"link":"javascript:alert(\"Open the related page\")","label":"Assay - GT - Candidate\nGenetic marker in Blood"},
              5996:{"link":"javascript:alert(\"Open the related page\")","label":"BMDM:Data transfer\nRelease to EBA part1"},
              5997:{"link":"javascript:alert(\"Open the related page\")","label":"BMDM:Data transfer\nRelease to EBA part3"},
              6015:{"link":"javascript:alert(\"Open the related page\")","label":"Clinical conduct\nLPLV"},
              6016:{"link":"javascript:alert(\"Open the related page\")","label":"Other\nClinical Trial Report"},
              6017:{"link":"javascript:alert(\"Open the related page\")","label":"Sample:Sample storage\nLong Term Storage"},
              6018:{"link":"javascript:alert(\"Open the related page\")","label":"Sample:Sample destruction\nPost LTS"},
              6019:{"link":"javascript:alert(\"Open the related page\")","label":"Stat:GT\nPGx in Blood (6 SNPs)"},
              6020:{"link":"javascript:alert(\"Open the related page\")","label":"Other\nIndividumed Contract"},
              6021:{"link":"javascript:alert(\"Open the related page\")","label":"Writing - LAP\nGenetics"},
              6022:{"link":"javascript:alert(\"Open the related page\")","label":"Other\nCirculating markers: Study Protocol Ivrea or PO Millipore"},
              6336:{"link":"javascript:alert(\"Open the related page\")","label":"BMDM:Data transfer\nRelease to EBA part2"}
};
var edges = [[6021,5936],[6015,5936],[3527,6016],[6015,4090],[5997,6019],[4515,5356],[3528,3530],[6015,3527],[3527,5996],[6020,5727],[3526,5356],[6336,6019],[3530,6019],[3528,6021],[4090,5997],[3530,5440],[6017,6018],[5438,5439],
              [4515,5936],[3528,6022],[3530,5437],[3525,6015],[3525,3526],[5996,5438],[6016,6017],[6015,5727],[3526,4090],[5936,6336],[5439,3531],[3525,4515],[5437,5438],[5997,5440],[6022,4090],[5440,3531],[3528,6020],[5356,5996],[6019,3531]];

var dag = {'nodes':nodes, 'edges':edges};

