function getAreaNamesForYear(year) {
    return Object.keys(data[year]);
}

function getAreaYearData(area, year) {
    return getYearAreaData(year, area);
}

function getYearAreaData(year, area) {
    return data[year][area];
}

function getYearAreaLevelData(year, area, level) {
    return data[year][area][level];
}

function getYearAreaLevelDataEstablished(year, area, level) {
    const data = getYearAreaLevelData(year, area, level);
    if (year === "2022") {
        data.result.ovr += data.result.pny;
        data.result.pny = 0;
    }
    return data;
}

function getAreaName(area, year) {
    return data[year][area].name;
}

function getAllAreaGroups() {
    return areaYearConnections;
}

function getAreaConnectionById(areaId) {
    return areaYearConnections.filter((area) => area.id === parseInt(areaId));
}

function getAreaConnectionsById(stringAreaIds) {
    const areaIds = stringAreaIds.map((stringId) => parseInt(stringId));
    return areaYearConnections.filter((area) => areaIds.includes(area.id));
}