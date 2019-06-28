
statsComparer = (stats1, stats2) => {
    const num1 = Number(stats1);
    const num2 = Number(stats2);

    if (num1 === num2) return 0;
    return num1 > num2 ? 1 : -1;
}

var columnDefs = [
    {headerName: "Name", field: "player-name", width: 150, sortingOrder: ['asc','desc']},
    {headerName: "Points", field: "player-points", width: 90, comparator: statsComparer, sortingOrder:['asc','desc']},
    {headerName: "Rank", field: "prev-rank", width: 120,comparator: statsComparer,  sortingOrder: ['desc',null]},
    {headerName: "Country", field: "player-country", width: 90, sortingOrder: ['asc','desc']},
    {headerName: "Rank-Current", field: "current-rank",comparator: statsComparer,  width: 110},
];

var autoGroupColumnDef = {
    headerName: "Group",
    width: 200,
    field: 'athlete',
    valueGetter: function(params) {
        if (params.node.group) {
            return params.node.key;
        } else {
            return params.data[params.colDef.field];
        }
    },
    headerCheckboxSelection: true,
    // headerCheckboxSelectionFilteredOnly: true,
    cellRenderer:'agGroupCellRenderer',
    cellRendererParams: {
        checkbox: true
    }
};

var gridOptions = {
    defaultColDef: {
        sortable: true
    },
    columnDefs: columnDefs,
    rowData: null,
    animateRows: true,
    paginationAutoPageSize:true,
    pagination: true,
    sortingOrder: ['desc','asc',null]
};


// setup the grid after the page has finished loading
document.addEventListener('DOMContentLoaded', function() {
    var gridDiv = document.querySelector('#myGrid');
    new agGrid.Grid(gridDiv, gridOptions);
    var url  = 'https://raw.githubusercontent.com/NguyenTanPhucK11/dataOfTennis/master/ranking.json';
    // do http request to get our sample data - not using any framework to keep the example self contained.
    // you will probably use a framework like JQuery, Angular or something else to do your HTTP calls.
    var httpRequest = new XMLHttpRequest();
    httpRequest.open('GET', url);
    httpRequest.send();
    httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState === 4 && httpRequest.status === 200) {
            var httpResult = JSON.parse(httpRequest.responseText);
            gridOptions.api.setRowData(httpResult);
        }
    };
});