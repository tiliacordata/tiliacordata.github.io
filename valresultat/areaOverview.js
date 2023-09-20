function drawResultTable() {

    const levelSelect = document.getElementById("level-select");
    const selectedLevel = levelSelect.options[levelSelect.selectedIndex].value;

    const selectedYear = getSelectedYear();

    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Valdistrikt');
    // for (let party of Object.keys(partyNames)) {
    //     if (party === "vb" && (selectedLevel === "region" || selectedLevel === "riksdag")) {
    //         continue;
    //     }
    //     data.addColumn('number', partyNames[party].short);
    // }
    for (let party of partyListingOrder[selectedLevel + selectedYear]) {
        data.addColumn('number', partyNames[party].short);
    }

    data.addRows(getAreaResultRows(selectedLevel, selectedYear));

    for (let i = 0; i < data.getNumberOfRows(); i++) {
        data.setProperty(i, 0, 'className', 'first-cell');
    }

    const table = new google.visualization.Table(document.getElementById('municipality-result-div'));

    const options = {
        allowHtml: true,
        showRowNumber: true,
        alternatingRowStyle: true,
        frozenColumns: 1, 
        sortColumn: 0, 
        width: '100%', 
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

function getAreaResultRows(level, selectedYear) {
    const dataRows = [];
    for(let area of getAreaNamesForYear(selectedYear)) {
            dataRows.push(getAreaResultRow(getAreaYearData(area, selectedYear), level, selectedYear));
        }
    return dataRows;
}

function getAreaResultRow(areaData, level, year) {
    let areaRow = [];
    areaRow.push(areaData.name);
    for (let party of partyListingOrder[level + year]) {
        areaRow.push(getCellContent2FracDig(areaData[level].result[party], areaData[level].validVotes));
    }
    return areaRow;
}

function drawParticipationTable() {
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Valdistrikt');
    data.addColumn('number', 'Röstberättigade, kommun/region');
    data.addColumn('number', 'Röstberättigade, riksdag');
    data.addColumn('number', 'Ej röstberättigade riksdag');
    data.addColumn('number', 'Valdeltagande, kommun');
    data.addColumn('number', 'Röstade ej, kommun');
    data.addColumn('number', 'Valdeltagande, region');
    data.addColumn('number', 'Röstade ej, region');
    data.addColumn('number', 'Valdeltagande, riksdag');
    data.addColumn('number', 'Röstade ej, riksdag');

    data.addRows(getAreaParticipationRows());

    for (let i = 0; i < data.getNumberOfRows(); i++) {
        data.setProperty(i, 0, 'className', 'first-cell');
    }

    //const percentFormatter = new google.visualization.NumberFormat({pattern: '#,###.0%'});
    //percentFormatter.format(data, 4);
    //percentFormatter.format(data, 5);

    const table = new google.visualization.Table(document.getElementById('participation-table-div'));

    const options = {
        allowHtml: true,
        showRowNumber: true,
        alternatingRowStyle: true,
        frozenColumns: 1, 
        sortColumn: 0, 
        width: '100%', 
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

function getAreaParticipationRows() {
    const selectedYear = getSelectedYear();
    const dataRows = [];
    for(let area of getAreaNamesForYear(selectedYear)) {
            dataRows.push(getAreaParticipationRow(getAreaYearData(area, selectedYear)));
        }
    return dataRows;
}

function getAreaParticipationRow(areaData) {
    const numberNonEligible = (areaData.kommun.eligibleVoters - areaData.riksdag.eligibleVoters);
    let areaRow = [];
    areaRow.push(areaData.name);
    areaRow.push(areaData.kommun.eligibleVoters);
    areaRow.push(areaData.riksdag.eligibleVoters);

    areaRow.push(getCellContent1FracDig(numberNonEligible, areaData.kommun.eligibleVoters));
    areaRow.push(getCellContent1FracDig(areaData.kommun.participatingVoters, areaData.kommun.eligibleVoters));
    areaRow.push(getCellContent1FracDig(areaData.kommun.eligibleVoters - areaData.kommun.participatingVoters, areaData.kommun.eligibleVoters));
    areaRow.push(getCellContent1FracDig(areaData.region.participatingVoters, areaData.region.eligibleVoters));
    areaRow.push(getCellContent1FracDig(areaData.region.eligibleVoters - areaData.region.participatingVoters, areaData.region.eligibleVoters));
    areaRow.push(getCellContent1FracDig(areaData.riksdag.participatingVoters, areaData.riksdag.eligibleVoters));
    areaRow.push(getCellContent1FracDig(areaData.riksdag.eligibleVoters - areaData.riksdag.participatingVoters, areaData.riksdag.eligibleVoters));

    return areaRow;
}

function changeYear() {
    drawResultTable();
    drawParticipationTable();
}

function showLevelResult() {
    drawResultTable();
}
