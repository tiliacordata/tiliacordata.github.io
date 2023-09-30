const partyNames = {
    "mp": {
        long: "Miljöpartiet", short: "MP", color: "#25a153"
    },
    "s": {
        long: "Socialdemokraterna", short: "S", color: "#ef4343"
    },
    "sd": {
        long: "Sverigedemokraterna", short: "SD", color: "#ffcc33"
    },
    "v": {
        long: "Vänsterpartiet", short: "V", color: "#d22d2d"
    },
    "vb": {
        long: "Väsbys Bästa", short: "VB", color: "#cc0099"
    },
    "m": {
        long: "Moderaterna", short: "M", color: "#3c9fdd"
    },
    "c": {
        long: "Centerpartiet", short: "C", color: "#107035"
    },
    "l": {
        long: "Liberalerna", short: "L", color: "#5079af"
    },
    "kd": {
        long: "Kristdemokraterna", short: "KD", color: "#2d5286"
    },
    "pny": {
        long: "Partiet Nyans", short: "PNy", color: "#ff8800"
    },
    "ovr": {
        long: "Övriga", short: "Övr", color: "#3d3d3d"
    }
}

const partyListingOrder = {
    "kommun": ["mp", "s", "v", "m", "c", "l", "kd", "vb", "sd", "ovr"],
    "region": ["mp", "s", "v", "m", "c", "l", "kd", "sd", "ovr"],
    "riksdag": ["mp", "s", "v", "m", "c", "l", "kd", "sd", "ovr"],
    "kommun2022": ["mp", "s", "v", "m", "c", "l", "kd", "vb", "sd", "pny", "ovr"],
    "region2022": ["mp", "s", "v", "m", "c", "l", "kd", "sd", "pny", "ovr"],
    "riksdag2022": ["mp", "s", "v", "m", "c", "l", "kd", "sd", "pny", "ovr"],
    "kommun2018": ["mp", "s", "v", "m", "c", "l", "kd", "vb", "sd", "ovr"],
    "region2018": ["mp", "s", "v", "m", "c", "l", "kd", "sd", "ovr"],
    "riksdag2018": ["mp", "s", "v", "m", "c", "l", "kd", "sd", "ovr"],
    "kommun2014": ["mp", "s", "v", "m", "c", "l", "kd", "vb", "sd", "ovr"],
    "region2014": ["mp", "s", "v", "m", "c", "l", "kd", "sd", "ovr"],
    "riksdag2014": ["mp", "s", "v", "m", "c", "l", "kd", "sd", "ovr"],
    "kommun2010": ["mp", "s", "v", "m", "c", "l", "kd", "sd", "ovr"],
    "region2010": ["mp", "s", "v", "m", "c", "l", "kd", "sd", "ovr"],
    "riksdag2010": ["mp", "s", "v", "m", "c", "l", "kd", "sd", "ovr"],
    "kommun2006": ["mp", "s", "v", "m", "c", "l", "kd", "sd", "ovr"],
    "region2006": ["mp", "s", "v", "m", "c", "l", "kd", "sd", "ovr"],
    "riksdag2006": ["mp", "s", "v", "m", "c", "l", "kd", "sd", "ovr"]
};

const levelNames = {
    "kommun": {
        short: "Kommun",
        long: "kommunfullmäktige"
    },
    "region": {
        short: "Region",
        long: "regionfullmäktige"
    },
    "riksdag": {
        short: "Riksdag",
        long: "riksdagen"
    }
}

const colorKommun = "black";
const colorRegion = "#7fd0e6";
const colorRiksdag = "#f9ed06";

const compareInfo = {
    riksdagVasby: {
        label: "Riksdag - Upplands Väsby",
        line: {color: colorRiksdag, lineDashStyle: [2, 2]},
    },
    riksdagSthlmLan: {
        label: "Riksdag - Valkrets Stockholms län",
        line: {color: colorRiksdag, lineDashStyle: [5, 5]},
    },
    riksdagRiket: {
        label: "Riksdag - riket",
        line: {color: colorRiksdag, lineDashStyle: [10, 10]},
    },
    regionVasby: {
        label: "Region - Upplands Väsby",
        line: {color: colorRegion, lineDashStyle: [2, 2]},
    },
    regionSthlm: {
        label: "Region - Stockholm",
        line: {color: colorRegion, lineDashStyle: [10, 10]},
    },
    kommunVasby: {
        label: "Kommun - Upplands Väsby",
        line: {color: colorKommun, lineDashStyle: [2, 2]},
    },
};

const displayTexts = {
    "municipalityPart": "Kommundelar",
    "municipalitySubPart": "Kommunsubdelar",
    "area": "Valdistrikt"
};

function populateAreaSelect(selectId, year) {
    let options = "";
    for(let area of Object.keys(data[year])) {
        options += "<option value=" + area + ">" + data[year][area].name + "</option>";
    }
    document.getElementById(selectId).innerHTML = options;
}

function populatePartySelect(selectId) {
    let options = "";
    for(let party of partyListingOrder.riksdag) {
        options += "<option value=" + party + ">" + partyNames[party].short + "</option>";
    }
    document.getElementById(selectId).innerHTML = options;
}

// function getPercent(part, total) {
//     return Math.round((part / total) * 10000) / 100;
// }

function getResultCell(areaYearData, level, party) {
    if(party === "vb" && (level === "region" || level === "riksdag")) {
        return "<td>-</td>"
    }
    return "<td>" + getPercent2Digit(areaYearData[level].result[party], areaYearData[level].validVotes) + "% (" + areaYearData[level].result[party] + ")</td>";
}

const percent2Formatter = new Intl.NumberFormat("sv-SE", {minimumFractionDigits: 2, maximumFractionDigits: 2, signDisplay: "negative"});
const percent1Formatter = new Intl.NumberFormat("sv-SE", {minimumFractionDigits: 1, maximumFractionDigits: 1, signDisplay: "negative"});


function getPercent2Digit(part, total) {
    return percent2Formatter.format((part / total) * 100);
}

function getPercent1Digit(part, total) {
    return percent1Formatter.format((part / total) * 100);
}

function formatToPercent(decimalNumber) {
    return percent2Formatter.format(decimalNumber * 100);
}

function getNumberEligible(areaYearData, level) {
    return areaYearData[level].eligibleVoters;
}

function row(rowContent) {
    return "<tr>" + rowContent + "</tr>";
}

function cell(cellContent) {
    return "<td>" + cellContent + "</td>";
}

function cell(cellContent, className) {
    return "<td class='" + className + "'>" + cellContent + "</td>";
}

function headerCell(cellContent) {
    return "<th>" + cellContent + "</th>";
}

const commonHeader = `<div id="nav-container">
    <nav>
        <a id="municipality-link" href="municipality.html">Kommunen</a>
        <a id="all-link" href="areaOverview.html">Översikt valdistrikt</a>
        <a id="single-link" href="area.html">Per valdistrikt</a>
        <a id="compare-link" href="comparearea.html">Jämför valdistrikt</a>
        <a id="year-link" href="compareyear.html">Jämför år</a>
        <a id="info-link" href="info.html">Info</a>
    </nav>
</div>`;

function createResultDataObjects(allData, selectedAreas, level) {
    const dataObjects = [];
    for (let area of selectedAreas) {
        dataObjects.push({
            name: allData[area].name,
            level: level,
            result: allData[area][level].result,
            validVotes: allData[area][level].validVotes
        });
    }
    return dataObjects;
}

function getCellContent1FracDig(part, total) {
    return {
        v: part / total,
        f: "" + getPercent1Digit(part, total) + "% (" + part + ")"
    };
}

function getCellContent2FracDig(part, total) {
    return {
        v: part / total,
        f: "" + getPercent2Digit(part, total) + "% (" + part + ")"
    };
}

function getCellContentSimple2FracDig(decimalNumber) {
    return {
        v: decimalNumber,
        f: "" + formatToPercent(decimalNumber)
    };
}

function getCellContentSimplePercent2FracDig(decimalNumber) {
    return {
        v: decimalNumber,
        f: "" + formatToPercent(decimalNumber) + ((decimalNumber !== Infinity && decimalNumber !== NaN) ? "%" : "")
    };
}

function getSelectedYear() {
    const yearSelect = document.getElementById("year-select");
    return yearSelect.options[yearSelect.selectedIndex].value;
}

function findMaxValue(dataTable) {
    let maxValue = 0;
    for (let i = 0; i < dataTable.getNumberOfColumns(); i++) {
        if (dataTable.getColumnRange(i).max > maxValue) {
            maxValue = dataTable.getColumnRange(i).max;
        }
    }
    return maxValue;
}