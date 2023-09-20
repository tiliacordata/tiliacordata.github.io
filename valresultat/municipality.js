function showLevelResult() {
    drawLevelElectionResult();
}

function drawLevelElectionResult() {
    const levelSelect = document.getElementById("level-select");
    const selectedLevel = levelSelect.options[levelSelect.selectedIndex].value;

    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Year');
    for (let party of partyListingOrder[selectedLevel]) {
        data.addColumn('number', partyNames[party].short);
    }

    const resultRows = getElectionResultRows(selectedLevel);

    data.addRows(resultRows);

    const percentFormatter = new google.visualization.NumberFormat({pattern: '#,##0.00%'});
    for (let i = 1; i < data.getNumberOfColumns(); i++) {
        percentFormatter.format(data, i);
    }

    const electionLevelName = levelNames[selectedLevel].long;

    const colors = getPartyColors(selectedLevel);

    var options = {
        height: 600,
        width: 800,
        title: 'Resultat i val till ' + electionLevelName,
        hAxis: {
            title: 'Valår',
            titleTextStyle: {italic: false}
        },
        vAxis: {
            title: 'Resultat',
            titleTextStyle: {italic: false},
            format:'#,##0%'
        },
        colors: colors
    };

    var chart = new google.visualization.LineChart(document.getElementById('level-election-result'));
    chart.draw(data, options);
}

function getElectionResultRows(level) {
    const dataRows = [];
    for(let electionYear of getElectionYears()) {
            dataRows.push(getElectionResultRow(level, electionYear));
        }
    return dataRows;
}

function getElectionYears() {
    return Object.keys(data.municipalityTotal);
}

function getPartyColors(level) {
    const colors = [];
    for(let party of partyListingOrder[level]) {
            colors.push(partyNames[party].color);
        }
    return colors;
}

function getElectionResultRow(level, electionYear) {
    let dataRow = [];
    dataRow.push(electionYear);
    for (let party of partyListingOrder[level]) {
        dataRow.push(data.municipalityTotal[electionYear][level].result[party] / data.municipalityTotal[electionYear][level].validVotes);
    }
    return dataRow;
}

function drawParticipationChart() {
    var chartData = new google.visualization.DataTable();
    chartData.addColumn('string', 'Valår');
    chartData.addColumn('number', 'Riksdag');
    chartData.addColumn('number', 'Region');
    chartData.addColumn('number', 'Kommun');

    chartData.addRows(getParticipationRows());

    const percentFormatter = new google.visualization.NumberFormat({pattern: '#,##0.0%'});
    for (let i = 1; i <=3; i++) {
        percentFormatter.format(chartData, i);
    }

    var options = {
        height: 500,
        width: 800,
        title: 'Valdeltagande',
        hAxis: {title: 'Valår',  titleTextStyle: {italic: false}},
        vAxis: {minValue: 0, format:'#,##0%'},
        colors: ['#f9ed06', '#7fd0e6', 'black']
    };

    var chart = new google.visualization.LineChart(document.getElementById('participation-chart'));
    chart.draw(chartData, options);
}

function getParticipationRows() {
    const dataRows = [];
    for(let electionYear of getElectionYears()) {
            dataRows.push(getParticipationRow(electionYear));
        }
    return dataRows;
}

function getParticipationRow(electionYear) {
    let dataRow = [];
    dataRow.push(electionYear);
    dataRow.push(data.municipalityTotal[electionYear].riksdag.participatingVoters / data.municipalityTotal[electionYear].riksdag.eligibleVoters);
    dataRow.push(data.municipalityTotal[electionYear].region.participatingVoters / data.municipalityTotal[electionYear].region.eligibleVoters);
    dataRow.push(data.municipalityTotal[electionYear].kommun.participatingVoters / data.municipalityTotal[electionYear].kommun.eligibleVoters);

    return dataRow;
}

function drawNumberEligibleChart() {
    var chartData = new google.visualization.DataTable();
    chartData.addColumn('string', 'Valår');
    chartData.addColumn('number', 'Alla tre val');
    chartData.addColumn('number', 'Endast kommun och region');

    chartData.addRows(getNumberEligibleRows());

    var options = {
        height: 500,
        width: 800,
        title: 'Antal röstberättigade',
        isStacked: true,
        hAxis: {title: 'Valår',  titleTextStyle: {italic: false}},
        vAxis: {minValue: 0},
        colors: ['#f9ed06', '#7fd0e6']
    };

    var chart = new google.visualization.AreaChart(document.getElementById('number-eligible-chart'));
    chart.draw(chartData, options);
}

function getNumberEligibleRows() {
    const dataRows = [];
    for(let electionYear of getElectionYears()) {
            dataRows.push(getNumberEligibleRow(electionYear));
        }
    return dataRows;
}

function getNumberEligibleRow(electionYear) {
    let dataRow = [];
    dataRow.push(electionYear);
    dataRow.push(data.municipalityTotal[electionYear].riksdag.eligibleVoters);
    dataRow.push(data.municipalityTotal[electionYear].kommun.eligibleVoters - data.municipalityTotal[electionYear].riksdag.eligibleVoters);

    return dataRow;
}