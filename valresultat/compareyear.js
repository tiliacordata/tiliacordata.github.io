function showAreaResult() {
    // document.getElementById("level-select-single-level").value = "kommun";
    // document.getElementById("level-select").value = "kommun-riksdag";
    google.charts.setOnLoadCallback(drawSingleLevelResult);
    google.charts.setOnLoadCallback(drawDiffChart);
    google.charts.setOnLoadCallback(drawPartyChart);
    // if (newAreaSelect.getResult().length > 0) {
    //     google.charts.setOnLoadCallback(drawDiffChart);
    // }
}

function populateAreaList() {
    const yearFromSelect = document.getElementById("year-from-select");
    const yearFrom = yearFromSelect.options[yearFromSelect.selectedIndex].value;
    const yearToSelect = document.getElementById("year-to-select");
    const yearTo = yearToSelect.options[yearToSelect.selectedIndex].value;
    populateYearComparisionSelect("area-select", yearFrom, yearTo);
    showAreaResult();
}

function populateYearComparisionSelect(selectId, yearFrom, yearTo) {
    const areaConnectionsByType = {
        "municipalityPart": [],
        "municipalitySubPart": [],
        "area": []
    };
    //const areaGroups = [];
    for (let areaGroup of getAllAreaGroups()) {
        if (areaGroup.years.hasOwnProperty(yearFrom) && areaGroup.years.hasOwnProperty(yearTo)) {
            //areaGroups.push(areaGroup);
            areaConnectionsByType[areaGroup.category].push(areaGroup);
        }
    }
    let options = "";
    for (let type of Object.keys(areaConnectionsByType)) {
        areaConnectionsByType[type].sort((s1, s2) => s1.name.localeCompare(s2.name));
        options += "<optgroup label='" + displayTexts[type] + "'>";
        for (let areaGroup of areaConnectionsByType[type]) {
            options += "<option value=" + areaGroup.id + ">" + areaGroup.name + "</option>";
        }
        options += "</optgroup>";
    }
    //areaGroups.sort((s1, s2) => s1.name.localeCompare(s2.name));

    document.getElementById(selectId).innerHTML = options;
}

function drawSingleLevelResult() {
    const yearFromSelect = document.getElementById("year-from-select");
    const yearEarlier = yearFromSelect.options[yearFromSelect.selectedIndex].value;

    const yearToSelect = document.getElementById("year-to-select");
    const yearLater = yearToSelect.options[yearToSelect.selectedIndex].value;

    //const selectedAreas = newAreaSelect.getResult();
    const areaSelect = document.getElementById("area-select");
    const selectedAreas = [areaSelect.options[areaSelect.selectedIndex].value];

    const levelSelect = document.getElementById("level-select-single-level");
    const selectedLevel = levelSelect.options[levelSelect.selectedIndex].value;

    const areaConnections = getAreaConnectionsById(selectedAreas);

    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Year');
    for (let party of partyListingOrder[selectedLevel]) {
        data.addColumn('number', partyNames[party].short);
    }

    const resultRows = getElectionResultRows(areaConnections, yearEarlier, yearLater, selectedLevel);

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

    var chart = new google.visualization.LineChart(document.getElementById('single-level-result'));
    chart.draw(data, options);
}

function getElectionResultRows(areaConnections, yearEarlier, yearLater, level) {
    const areaConnection = areaConnections[0];
    const includedYears = [];
    for(let i = parseInt(yearEarlier); i <= parseInt(yearLater); i += 4) {
        includedYears.push(i);
    }
    const dataRows = [];
    for(let year of includedYears) {
            dataRows.push(getElectionResultRow(areaConnection.years[year.toString()], level, year));
        }
    return dataRows;
}

function getPartyColors(level) {
    const colors = [];
    for(let party of partyListingOrder[level]) {
            colors.push(partyNames[party].color);
        }
    return colors;
}

function getElectionResultRow(selectedAreas, level, year) {
    let dataRow = [];
    dataRow.push(year.toString());
    const result = calculateTotalResult(selectedAreas, level, year.toString());
    for (let party of partyListingOrder[level]) {
        dataRow.push(result[party] / result.validVotes);
    }
    return dataRow;
}

function calculateTotalResult(selectedAreas, level, year) {
    const resultTotal = {
        validVotes: 0
    };

    const partyList = level !== "kommun" ? partyListingOrder.riksdag2022 : partyListingOrder.kommun2022;
    for (let party of partyList) {
        resultTotal[party] = 0;
    }

    for (let area of selectedAreas) {
        const areaLevelData = getYearAreaLevelDataEstablished(year, area, level);
        resultTotal.validVotes += areaLevelData.validVotes;
        for (let party of partyList) {
            resultTotal[party] += areaLevelData.result[party];
        }
    }

    return resultTotal;
}

function showLevelResult() {
    drawSingleLevelResult();
}

function drawDiffChart() {
    const yearFromSelect = document.getElementById("year-from-select");
    const yearEarlier = yearFromSelect.options[yearFromSelect.selectedIndex].value;

    const yearToSelect = document.getElementById("year-to-select");
    const yearLater = yearToSelect.options[yearToSelect.selectedIndex].value;

    //const selectedAreas = newAreaSelect.getResult();
    const areaSelect = document.getElementById("area-select");
    const selectedAreas = [areaSelect.options[areaSelect.selectedIndex].value];

    const levelSelect = document.getElementById("level-select");
    const selectedLevels = levelSelect.options[levelSelect.selectedIndex].value.split("-");

    const areaConnections = getAreaConnectionsById(selectedAreas);
    
    const levelX = selectedLevels[1];
    const levelY = selectedLevels[0];

    const chart1Data = calculateChartData(yearLater, areaConnections[0].years[yearLater], levelX, levelY);
    const chart2Data = calculateChartData(yearEarlier, areaConnections[0].years[yearEarlier], levelX, levelY);

    const data1 = google.visualization.arrayToDataTable(chart1Data);
    const data2 = google.visualization.arrayToDataTable(chart2Data);

    //const largestValueInChart = Math.max(findMaxValue(data1), findMaxValue(data2));

    const colors = [];
    const partyList = levelY !== "kommun" ? partyListingOrder.riksdag2022 : partyListingOrder.kommun2022;
    for(let party of partyList) {
        colors.push(partyNames[party].color);
    }

    const options = {
        height: 600,
        width: 600,
        chartArea: {height: 400, width: 400},
        title: 'Förändring från ' + yearEarlier + ' till ' + yearLater,
        hAxis: {title: levelNames[levelX].short, minValue: 0, maxValue: 0.45, format:'#,##0%', gridlines: {count: 9}, baselineColor: 'lightgrey', titleTextStyle: {italic: false}},
        vAxis: {title: levelNames[levelY].short, minValue: 0, maxValue: 0.45, format:'#,##0%', gridlines: {count: 9}, baselineColor: 'lightgrey', titleTextStyle: {italic: false}},
        colors: colors
    };

    const chart = new google.visualization.ScatterChart(document.getElementById('area-chart'));
    const diffData = chart.computeDiff(data2, data1);

    const percentFormatter = new google.visualization.NumberFormat({pattern: '#,##0.00%'});

    for (let i = 0; i < diffData.getNumberOfColumns(); i++) {
        percentFormatter.format(diffData, i);
    }

    chart.draw(diffData, options);
    setChartInfo(yearEarlier, yearLater);
    setAreaInfo(areaConnections, yearEarlier, yearLater);
}

function calculateChartData(year, selectedAreas, levelX, levelY) {
    const resultTotal = {
        levelX: {
            validVotes: 0
        },
        levelY: {
            validVotes: 0
        }
    };

    const partyList = levelY !== "kommun" ? partyListingOrder.riksdag2022 : partyListingOrder.kommun2022;
    for (let party of partyList) {
        resultTotal.levelX[party] = 0;
        resultTotal.levelY[party] = 0;
    }

    for (let area of selectedAreas) {
        const areaData = getYearAreaData(year, area);
        resultTotal.levelX.validVotes += areaData[levelX].validVotes;
        resultTotal.levelY.validVotes += areaData[levelY].validVotes;
        for (let party of partyList) {
            resultTotal.levelX[party] += areaData[levelX].result[party];
            resultTotal.levelY[party] += areaData[levelY].result[party];
        }
    }

    const chartData = [["riksdag"]];
    let index = 1;
    for(let party of partyList) {
        const partyResult = new Array(partyList.length + 1).fill(null);
        chartData[0].push(partyNames[party].short);
        partyResult[0] = resultTotal.levelX[party] / resultTotal.levelX.validVotes;
        partyResult[index] = resultTotal.levelY[party] / resultTotal.levelY.validVotes;
        index++;
        chartData.push(partyResult);
    }
    return chartData;
}

function setChartInfo(yearEarlier, yearLater) {
    document.getElementById("info").innerHTML = "<p>Bollarna visar resultatet för " + yearLater + ", änden på linjen visar resultatet för " + yearEarlier + "</p>";

}

function setAreaInfo(areaConnections, yearEarlier, yearLater) {
    let areaInfo = "<p>Diagrammen inkluderar följande valdistrikt:</p><ul>";
    const areaConnection = areaConnections[0];
    for(let i = parseInt(yearEarlier); i <= parseInt(yearLater); i += 4) {
        const areas = areaConnection.years[i];
        const areaNames = areas.map((area => getAreaName(area, i)))
            .reduce((resultString, areaName) => resultString + ", " + areaName);
        areaInfo += "<li>" + i + ": " + areaNames + "</li>";
    }
    areaInfo += "</ul>"
    document.getElementById("area-info").innerHTML = areaInfo;
}

function drawPartyChart() {
    const yearFromSelect = document.getElementById("year-from-select");
    const yearEarlier = yearFromSelect.options[yearFromSelect.selectedIndex].value;

    const yearToSelect = document.getElementById("year-to-select");
    const yearLater = yearToSelect.options[yearToSelect.selectedIndex].value;

    const areaSelect = document.getElementById("area-select");
    const selectedAreas = [areaSelect.options[areaSelect.selectedIndex].value];

    const partySelect = document.getElementById("party-select");
    const selectedParty = partySelect.options[partySelect.selectedIndex].value;

    const areaConnections = getAreaConnectionsById(selectedAreas);

    const levelItems = ["riksdag", "region", "kommun"];
    const comparisionItems = getComparisionItems();

    const data = new google.visualization.DataTable();
    data.addColumn('string', 'År');
    for (let item of levelItems) {
        data.addColumn('number', levelNames[item].short);
    }
    for (let item of Object.entries(comparisionItems)) {
        if (item[1] === true) {
            data.addColumn('number', compareInfo[item[0]].label);
        }
    }

    const resultRows = getPartyResultRows(areaConnections, yearEarlier, yearLater, selectedParty, comparisionItems);

    data.addRows(resultRows);

    const percentFormatter = new google.visualization.NumberFormat({pattern: '#,##0.00%'});
    for (let i = 1; i < data.getNumberOfColumns(); i++) {
        percentFormatter.format(data, i);
    }

    const partyName = partyNames[selectedParty].long;

    const colors = ['#f9ed06', '#7fd0e6', 'black'];

    const lineStyle = [{}, {}, {}];

    for (let item of Object.entries(comparisionItems)) {
        if (item[1] === true) {
            lineStyle.push(compareInfo[item[0]].line);
        }
    }

    var options = {
        height: 600,
        width: 800,
        title: 'Resultat för ' + partyName,
        hAxis: {
            title: 'Valår',
            titleTextStyle: {italic: false}
        },
        vAxis: {
            title: 'Resultat',
            baseline: 0,
            titleTextStyle: {italic: false},
            format:'#,##0%'
        },
        colors: colors,
        series: lineStyle
    };

    var chart = new google.visualization.LineChart(document.getElementById('party-chart'));
    chart.draw(data, options);
}

function getComparisionItems() {
    return {
        riksdagVasby: document.getElementById("riksdag-vasby").checked,
        riksdagSthlmLan: document.getElementById("riksdag-sthlm-lan").checked,
        riksdagRiket: document.getElementById("riksdag-riket").checked,
        regionVasby: document.getElementById("region-vasby").checked,
        regionSthlm: document.getElementById("region-sthlm").checked,
        kommunVasby: document.getElementById("kommun-vasby").checked,

    }; 
}

function getPartyResultRows(areaConnections, yearEarlier, yearLater, party, comparisionItems) {
    const areaConnection = areaConnections[0];
    const includedYears = [];
    for(let i = parseInt(yearEarlier); i <= parseInt(yearLater); i += 4) {
        includedYears.push(i);
    }
    const dataRows = [];
    for(let year of includedYears) {
        dataRows.push(getPartyResultRow(areaConnection.years[year.toString()], party, year, comparisionItems));
    }
    return dataRows;
}

function getPartyResultRow(selectedAreas, party, year, comparisionItems) {
    let dataRow = [];
    dataRow.push(year.toString());
    const result = calculateTotalResult2(selectedAreas, party, year.toString());
    for (let item of ["riksdag", "region", "kommun"]) {
        dataRow.push(result[item] / result.validVotes[item]);
    }
    if (comparisionItems.riksdagVasby) {
        dataRow.push(getMunicipalityYearLevelPartyResult(year, "riksdag", party) / getMunicipalityYearLevelValidVotes(year, "riksdag"));
    }
    if (comparisionItems.riksdagSthlmLan) {
        dataRow.push(getStockholmsLanResult(year, party) / getStockholmsLanValidVotes(year));
    }
    if (comparisionItems.riksdagRiket) {
        dataRow.push(getCountryResult(year, party) / getCountryValidVotes(year));
    }
    if (comparisionItems.regionVasby) {
        dataRow.push(getMunicipalityYearLevelPartyResult(year, "region", party) / getMunicipalityYearLevelValidVotes(year, "region"));
    }
    if (comparisionItems.regionSthlm) {
        dataRow.push(getRegionStockholmResult(year, party) / getRegionStockholmValidVotes(year));
    }
    if (comparisionItems.kommunVasby) {
        dataRow.push(getMunicipalityYearLevelPartyResult(year, "kommun", party) / getMunicipalityYearLevelValidVotes(year, "kommun"));
    }

    return dataRow;
}

function calculateTotalResult2(selectedAreas, party, year) {
    const resultTotal = {
        validVotes: {}
    };

    for (let item of ["riksdag", "region", "kommun"]) {
        resultTotal[item] = 0;
        resultTotal.validVotes[item] = 0;
    }

    for (let area of selectedAreas) {
        for (let item of ["riksdag", "region", "kommun"]) {
            const areaLevelData = getYearAreaLevelDataEstablished(year, area, item);
            resultTotal.validVotes[item] += areaLevelData.validVotes;
            resultTotal[item] += areaLevelData.result[party];
        }
    }

    return resultTotal;
}
