const comparisionPartyNames = {
    "mp": "Miljöpartiet",
    "s": "Socialdemokraterna",
    "sd": "Sverigedemokraterna",
    "v": "Vänsterpartiet",
    "m": "Moderaterna",
    "c": "Centerpartiet",
    "l": "Liberalerna",
    "kd": "Kristdemokraterna",
    "pny": "Partiet Nyans",
    "ovr": "Övriga"
}

function showAreaResult(selectedArea) {
    document.getElementById("level-select").value = "kommun-riksdag";
    google.charts.setOnLoadCallback(drawParticipationTable);
    google.charts.setOnLoadCallback(drawResultTable);
    google.charts.setOnLoadCallback(drawComparisionTable);
    //google.charts.setOnLoadCallback(drawChart);
    google.charts.setOnLoadCallback(drawVotesComparisionChart);
    //google.charts.setOnLoadCallback(drawResultChart);
    google.charts.setOnLoadCallback(drawComparisionChart);
    
    const areaData = data[getSelectedYear()][selectedArea];
    document.getElementById("non-eligible-info").innerHTML = getNonEligible(areaData);
}

function drawParticipationTable() {

    const areaSelect = document.getElementById("area-select");
    const selectedArea = areaSelect.options[areaSelect.selectedIndex].value;

    var data = new google.visualization.DataTable();
    data.addColumn('string', '');
    data.addColumn('string', 'Kommun');
    data.addColumn('string', 'Region');
    data.addColumn('string', 'Riksdag');

    data.addRows(getParticipationRows(selectedArea));

    for (let i = 0; i < data.getNumberOfRows(); i++) {
        data.setProperty(i, 0, 'className', 'first-cell');
    }

    const table = new google.visualization.Table(document.getElementById('participation-info'));

    const options = {
        allowHtml: true,
        showRowNumber: false,
        alternatingRowStyle: true,
        frozenColumns: 1, 
        height: '100%',
        cssClassNames: {
            headerRow: 'high-header-row',
            headerCell: 'high-header-cell',
            oddTableRow: 'zebra-row',
            tableCell: 'table-cell',
            selectedTableRow: 'selected-row',
            hoverTableRow: 'hover-row'
        }
    };

    table.draw(data, options);
}

function getParticipationRows(area) {
    const selectedYear = getSelectedYear();
    //const selectedYear = "2022";
    const dataRows = [];
    const areaData = getYearAreaData(selectedYear, area);

    dataRows.push(["Röstberättigade, antal", "" + areaData.kommun.eligibleVoters, "" + areaData.region.eligibleVoters, "" + areaData.riksdag.eligibleVoters]);
    dataRows.push(["Valdeltagande, procent", "" + getPercent2Digit(areaData.kommun.participatingVoters, areaData.kommun.eligibleVoters) + "%", 
        "" + getPercent2Digit(areaData.region.participatingVoters, areaData.region.eligibleVoters) + "%", 
        "" + getPercent2Digit(areaData.riksdag.participatingVoters, areaData.riksdag.eligibleVoters) + "%"
    ]);
    dataRows.push(["Valdeltagande, antal", "" + areaData.kommun.participatingVoters, "" + areaData.region.participatingVoters, "" + areaData.riksdag.participatingVoters]);
    dataRows.push(["Röstade ej, procent", 
        "" + getPercent2Digit(areaData.kommun.eligibleVoters - areaData.kommun.participatingVoters, areaData.kommun.eligibleVoters) + "%", 
        "" + getPercent2Digit(areaData.region.eligibleVoters - areaData.region.participatingVoters, areaData.region.eligibleVoters) + "%", 
        "" + getPercent2Digit(areaData.riksdag.eligibleVoters - areaData.riksdag.participatingVoters, areaData.riksdag.eligibleVoters) + "%"
    ]);    
    dataRows.push(["Röstade ej, antal", "" + (areaData.kommun.eligibleVoters - areaData.kommun.participatingVoters), 
        "" + (areaData.region.eligibleVoters - areaData.region.participatingVoters), 
        "" + (areaData.riksdag.eligibleVoters - areaData.riksdag.participatingVoters)
    ]);
    dataRows.push(["Ej giltiga röster, antal", "" + (areaData.kommun.participatingVoters - areaData.kommun.validVotes), 
        "" + (areaData.region.participatingVoters - areaData.region.validVotes), 
        "" + (areaData.riksdag.participatingVoters - areaData.riksdag.validVotes)
    ]);

    return dataRows;
}

function getNonEligible(areaData) {
    const numberNonEligible = (areaData.kommun.eligibleVoters - areaData.riksdag.eligibleVoters);
    let info = "<p>Ej röstberättigade i riksdagsvalet: " + numberNonEligible + " personer, ";
    info += getPercent2Digit(numberNonEligible, areaData.kommun.eligibleVoters) + "% av röstberättigade i val till kommunfullmäktige</p>";
    return info;
}

function drawResultTable() {

    const areaSelect = document.getElementById("area-select");
    const selectedArea = areaSelect.options[areaSelect.selectedIndex].value;

    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Parti');
    data.addColumn('number', 'Kommun');
    data.addColumn('number', 'Region');
    data.addColumn('number', 'Riksdag');

    data.addRows(getPartyResultRows(selectedArea));

    for (let i = 0; i < data.getNumberOfRows(); i++) {
        data.setProperty(i, 0, 'className', 'first-cell');
    }

    const table = new google.visualization.Table(document.getElementById('area-result'));

    const options = {
        allowHtml: true,
        showRowNumber: false,
        alternatingRowStyle: true,
        frozenColumns: 1, 
        sortColumn: 1,  
        sortAscending: false,
        height: '100%',
        cssClassNames: {
            headerRow: 'high-header-row',
            headerCell: 'high-header-cell',
            oddTableRow: 'zebra-row',
            tableCell: 'table-cell',
            selectedTableRow: 'selected-row',
            hoverTableRow: 'hover-row'
        }
    };

    table.draw(data, options);
}

function getPartyResultRows(area) {
    const selectedYear = getSelectedYear();
    const dataRows = [];
    for(let party of partyListingOrder["kommun" + selectedYear]) {
            dataRows.push(getPartyResultRow(getYearAreaData(selectedYear, area), party));
        }
    return dataRows;
}

function getPartyResultRow(areaData, party) {
    let partyRow = [];
    partyRow.push(partyNames[party].long);

    partyRow.push(getCellContent2FracDig(areaData.kommun.result[party], areaData.kommun.validVotes));
    partyRow.push(party === "vb" ? null : getCellContent2FracDig(areaData.region.result[party], areaData.region.validVotes));
    partyRow.push(party === "vb" ? null : getCellContent2FracDig(areaData.riksdag.result[party], areaData.riksdag.validVotes));
    
    return partyRow;
}

function drawComparisionTable() {

    const areaSelect = document.getElementById("area-select");
    const selectedArea = areaSelect.options[areaSelect.selectedIndex].value;

    const levelSelect = document.getElementById("level-select");
    const selectedLevels = levelSelect.options[levelSelect.selectedIndex].value.split("-");

    const tableTitle = "Resultat i val till " + levelNames[selectedLevels[0]].long + " jämfört med val till " + levelNames[selectedLevels[1]].long;
    document.getElementById("comparision-table-title").textContent = tableTitle;

    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Parti');
    data.addColumn('number', 'Procentenheter');
    data.addColumn('number', 'Procent');
    data.addColumn('number', 'Antal');

    data.addRows(getComparisionRows(selectedArea, selectedLevels[1], selectedLevels[0]));

    for (let i = 0; i < data.getNumberOfRows(); i++) {
        data.setProperty(i, 0, 'className', 'first-cell');
    }

    const table = new google.visualization.Table(document.getElementById('comparision-table'));

    const options = {
        allowHtml: true,
        showRowNumber: false,
        alternatingRowStyle: true,
        frozenColumns: 1, 
        sortColumn: 1,  
        sortAscending: false,
        height: '100%',
        cssClassNames: {
            headerRow: 'high-header-row',
            headerCell: 'high-header-cell',
            oddTableRow: 'zebra-row',
            tableCell: 'table-cell',
            selectedTableRow: 'selected-row',
            hoverTableRow: 'hover-row'
        }
    };

    table.draw(data, options);
}

function getComparisionRows(area, fromLevel, toLevel) {
    const selectedYear = getSelectedYear();
    const dataRows = [];
    const partyList = (toLevel !== "kommun") ? partyListingOrder["riksdag" + selectedYear] : partyListingOrder["kommun" + selectedYear];
    for(let party of partyList) {
            dataRows.push(getComparisionRow(getYearAreaData(selectedYear, area), party, fromLevel, toLevel));
        }
    return dataRows;
}

function getComparisionRow(areaData, party, fromLevel, toLevel) {
    let partyRow = [];
    partyRow.push(partyNames[party].long);

    const resultLevelFrom = areaData[fromLevel].result[party] / areaData[fromLevel].validVotes;
    const resultLevelTo = areaData[toLevel].result[party] / areaData[toLevel].validVotes;
    const percentagePointComparision = getCellContentSimple2FracDig(resultLevelTo - resultLevelFrom);
    const percentageComparision = getCellContentSimplePercent2FracDig((resultLevelTo / resultLevelFrom) - 1);
    partyRow.push(percentagePointComparision);
    partyRow.push(percentageComparision);
    partyRow.push(areaData[toLevel].result[party] - areaData[fromLevel].result[party]);
    
    return partyRow;
}

function drawChart() {
    const selectedYear = getSelectedYear();
    var dataTable = new google.visualization.DataTable();
    dataTable.addColumn('string', 'From');
    dataTable.addColumn('string', 'To');
    dataTable.addColumn('number', 'Weight');

    const areaSelect = document.getElementById("area-select");
    const selectedArea = areaSelect.options[areaSelect.selectedIndex].value;

    const levelSelect = document.getElementById("level-select");
    const selectedLevels = levelSelect.options[levelSelect.selectedIndex].value.split("-");

    const data1 = getYearAreaLevelData(selectedYear, selectedArea, selectedLevels[1]).result;
    const data2 = getYearAreaLevelData(selectedYear, selectedArea, selectedLevels[0]).result;

    dataTable.addRows(calculateChartData(data1, data2));

    var options = {
        width: 500,
        height: 300,
        sankey: { 
            node: { 
                nodePadding: 20,
                label: {
                    fontSize: 14
                }
            },
            link: {
                colorMode: 'source',
            }
        },
    };

    document.getElementById("sankey-title").innerText = "Omfördelning (netto) av röster från val till " + levelNames[selectedLevels[1]].long 
        + " till val till " + levelNames[selectedLevels[0]].long + ", antal röster";
    var chart = new google.visualization.Sankey(document.getElementById('area-sankey'));
    chart.draw(dataTable, options);
}

function calculateChartData(resultFrom, resultTo) {
    const data = [];
    for(let party of Object.keys(resultTo)) {
        const result = resultTo[party] - resultFrom[party];
        if(result < 0) {
            data.push([partyNames[party].short, "Omfördelas", Math.abs(result)]);
        } else if (result > 0) {
            data.push(["Omfördelas", partyNames[party].short, result]);
        }
    }
    return data;
}

function drawResultChart() {
    const selectedYear = getSelectedYear();
    var dataTable = new google.visualization.DataTable();
    dataTable.addColumn('string', 'From');
    dataTable.addColumn('string', 'To');
    dataTable.addColumn('number', 'Weight');

    const areaSelect = document.getElementById("area-select");
    const selectedArea = areaSelect.options[areaSelect.selectedIndex].value;

    const levelSelect = document.getElementById("level-select");
    const selectedLevels = levelSelect.options[levelSelect.selectedIndex].value.split("-");

    const data1 = getYearAreaLevelData(selectedYear, selectedArea, selectedLevels[1]);
    const data2 = getYearAreaLevelData(selectedYear, selectedArea, selectedLevels[0]);

    dataTable.addRows(calculateResultChartData(data1, data2));

    var options = {
        width: 500,
        height: 300,
        sankey: { 
            node: { 
                nodePadding: 20,
                label: {
                    fontSize: 14
                }
            },
            link: {
                colorMode: 'source',
            }
        },
    };

    document.getElementById("sankey-title-2").innerText = "Förändringen i resultat från val till " + levelNames[selectedLevels[1]].long 
        + " till val till " + levelNames[selectedLevels[0]].long + ", procentenheter";
    var chart = new google.visualization.Sankey(document.getElementById('area-sankey-2'));
    chart.draw(dataTable, options);
}

function calculateResultChartData(dataFrom, dataTo) {
    const data = [];
    for(let party of partyListingOrder.kommun2022) {
        const resultFrom = dataFrom.result[party] / dataFrom.validVotes;
        const resultTo = dataTo.result[party] / dataTo.validVotes;
        const resultDiff = Math.round((resultTo - resultFrom) * 10000) / 100
        if(resultDiff < 0) {
            data.push([partyNames[party].short, "Omfördelas", Math.abs(resultDiff)]);
        } else if (resultDiff > 0) {
            data.push(["Omfördelas", partyNames[party].short, resultDiff]);
        }
    }
    return data;
}

function drawComparisionChart() {
    const selectedYear = getSelectedYear();
    var dataTable = new google.visualization.DataTable();
    dataTable.addColumn('string', 'Parti');
    dataTable.addColumn('number', 'Resultat');
    dataTable.addColumn({type: 'string', role: 'style'});

    const areaSelect = document.getElementById("area-select");
    const selectedArea = areaSelect.options[areaSelect.selectedIndex].value;

    const levelSelect = document.getElementById("level-select");
    const selectedLevels = levelSelect.options[levelSelect.selectedIndex].value.split("-");

    const data1 = getYearAreaLevelData(selectedYear, selectedArea, selectedLevels[1]);
    const data2 = getYearAreaLevelData(selectedYear, selectedArea, selectedLevels[0]);

    dataTable.addRows(calculateComparisionChartData(data1, data2));
    dataTable.sort({column: 1, desc: true});

    const chartTitle = "Resultat i val till " + levelNames[selectedLevels[0]].long + " jämfört med val till " + levelNames[selectedLevels[1]].long + ", procentenheter";


    var options = {
        width: 750,
        height: 500,
        title: chartTitle,
        legend: { position: "none" },
        chartArea: {left: 50}
    };

    var chart = new google.visualization.ColumnChart(document.getElementById('area-sankey'));
    chart.draw(dataTable, options);
}

function calculateComparisionChartData(dataFrom, dataTo) {
    const data = [];
    for(let party of partyListingOrder.kommun2022) {
        const resultFrom = dataFrom.result[party] / dataFrom.validVotes;
        const resultTo = dataTo.result[party] / dataTo.validVotes;
        const resultDiff = Math.round((resultTo - resultFrom) * 10000) / 100;
        if (resultDiff !== 0) {
            data.push([partyNames[party].short, resultDiff, partyNames[party].color]);

        }
    }
    return data;
}

function drawVotesComparisionChart() {
    const selectedYear = getSelectedYear();
    var dataTable = new google.visualization.DataTable();
    dataTable.addColumn('string', 'Parti');
    dataTable.addColumn('number', 'Resultat');
    dataTable.addColumn({type: 'string', role: 'style'});

    const areaSelect = document.getElementById("area-select");
    const selectedArea = areaSelect.options[areaSelect.selectedIndex].value;

    const levelSelect = document.getElementById("level-select");
    const selectedLevels = levelSelect.options[levelSelect.selectedIndex].value.split("-");

    const data1 = getYearAreaLevelData(selectedYear, selectedArea, selectedLevels[1]).result;
    const data2 = getYearAreaLevelData(selectedYear, selectedArea, selectedLevels[0]).result;

    dataTable.addRows(calculateVotesComparisionData(data1, data2));
    dataTable.sort({column: 1, desc: true});

    const chartTitle = "Resultat i val till " + levelNames[selectedLevels[0]].long + " jämfört med val till " + levelNames[selectedLevels[1]].long + ", antal röster";


    var options = {
        width: 750,
        height: 500,
        title: chartTitle,
        legend: { position: "none" },
        chartArea: {left: 50}
    };

    var chart = new google.visualization.ColumnChart(document.getElementById('area-sankey-2'));
    chart.draw(dataTable, options);
}

function calculateVotesComparisionData(resultFrom, resultTo) {
    const data = [];
    for(let party of partyListingOrder.kommun2022) {
        const result = resultTo[party] - resultFrom[party];
        if(result !== 0) {
            data.push([partyNames[party].short, result, partyNames[party].color]);
        }
    }
    return data;
}

function updateLevelComparision() {
    drawComparisionTable();
    //drawChart();
    drawVotesComparisionChart();
    //drawResultChart();
    drawComparisionChart();
}

function changeYear() {
    populateAreaSelect("area-select", getSelectedYear());
    drawParticipationTable();
    drawResultTable();
    updateLevelComparision();
}