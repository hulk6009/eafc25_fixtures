// Updated: script.js with bug fixes and enhancements

// Data from your Excel file
let firstLegData = [
    ["Friday 28th March", "Matchday 1", "Mancity Jnr", "5", "3", "NiceFC"],
    ["Friday 28th March", "Matchday 1", "dblinking", "3", "2", "Mehhh"],
    ["Friday 28th March", "Matchday 1", "OLAMIX FC", "", "", "Barnet FC"],
    ["Friday 28th March", "Matchday 2", "Mancity Jnr", "8", "4", "dblinking"],
    ["Friday 28th March", "Matchday 2", "NiceFC", "", "", "Mehhh"],
    ["Friday 28th March", "Matchday 2", "OLAMIX FC", "3", "2", "ADX FC"],
    ["Friday 28th March", "Matchday 3", "Mancity Jnr", "", "", "Mehhh"],
    ["Saturday 29th March", "Matchday 3", "NiceFC", "4", "2", "dblinking"],
    ["Saturday 29th March", "Matchday 3", "Barnet FC", "2", "9", "ADX FC"],
    ["Saturday 29th March", "Matchday 4", "Mancity Jnr", "5", "4", "OLAMIX FC"],
    ["Saturday 29th March", "Matchday 4", "NiceFC", "5", "6", "Barnet FC"],
    ["Saturday 29th March", "Matchday 4", "dblinking", "3", "7", "ADX FC"],
    ["Saturday 29th March", "Matchday 5", "Mancity Jnr", "9", "5", "Barnet FC"],
    ["Saturday 29th March", "Matchday 5", "NiceFC", "1", "3", "OLAMIX FC"],
    ["Sunday 30th March", "Matchday 5", "Mehhh", "4", "5", "ADX FC"],
    ["Sunday 30th March", "Matchday 6", "Mancity Jnr", "6", "5", "ADX FC"],
    ["Sunday 30th March", "Matchday 6", "dblinking", "2", "4", "OLAMIX FC"],
    ["Sunday 30th March", "Matchday 6", "Mehhh", "", "", "Barnet FC"],
    ["Sunday 30th March", "Matchday 7", "NiceFC", "3", "7", "ADX FC"],
    ["Sunday 30th March", "Matchday 7", "dblinking", "3", "6", "Barnet FC"],
    ["Sunday 30th March", "Matchday 7", "Mehhh", "", "", "OLAMIX FC"]
];

let secondLegData = [
    ["Friday 4th April", "Matchday 8", "NiceFC", "", "", "Mancity Jnr"],
    ["Friday 4th April", "Matchday 8", "Mehhh", "", "", "dblinking"],
    ["Friday 4th April", "Matchday 8", "Barnet FC", "", "", "OLAMIX FC"],
    ["Friday 4th April", "Matchday 9", "dblinking", "", "", "Mancity Jnr"],
    ["Friday 4th April", "Matchday 9", "Mehhh", "", "", "NiceFC"],
    ["Friday 4th April", "Matchday 9", "ADX FC", "", "", "OLAMIX FC"],
    ["Friday 4th April", "Matchday 10", "Mehhh", "", "", "Mancity Jnr"],
    ["Saturday 5th April", "Matchday 10", "dblinking", "", "", "NiceFC"],
    ["Saturday 5th April", "Matchday 10", "ADX FC", "", "", "Barnet FC"],
    ["Saturday 5th April", "Matchday 11", "OLAMIX FC", "", "", "Mancity Jnr"],
    ["Saturday 5th April", "Matchday 11", "Barnet FC", "", "", "NiceFC"],
    ["Saturday 5th April", "Matchday 11", "ADX FC", "", "", "dblinking"],
    ["Saturday 5th April", "Matchday 12", "Barnet FC", "", "", "Mancity Jnr"],
    ["Saturday 5th April", "Matchday 12", "OLAMIX FC", "", "", "NiceFC"],
    ["Sunday 6th April", "Matchday 12", "ADX FC", "", "", "Mehhh"],
    ["Sunday 6th April", "Matchday 13", "ADX FC", "", "", "Mancity Jnr"],
    ["Sunday 6th April", "Matchday 13", "OLAMIX FC", "", "", "dblinking"],
    ["Sunday 6th April", "Matchday 13", "Barnet FC", "", "", "Mehhh"],
    ["Sunday 6th April", "Matchday 14", "ADX FC", "", "", "NiceFC"],
    ["Sunday 6th April", "Matchday 14", "Barnet FC", "", "", "dblinking"],
    ["Sunday 6th April", "Matchday 14", "OLAMIX FC", "", "", "Mehhh"]
];

function processMatchResults() {
    const allMatches = [...firstLegData, ...secondLegData];
    const teams = {};

    allMatches.forEach(match => {
        const [,, home, , , away] = match;
        if (!teams[home]) teams[home] = { played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, form: [] };
        if (!teams[away]) teams[away] = { played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, form: [] };

        const homeScore = parseInt(match[3]);
        const awayScore = parseInt(match[4]);

        if (!isNaN(homeScore) && !isNaN(awayScore)) {
            teams[home].played++;
            teams[home].goalsFor += homeScore;
            teams[home].goalsAgainst += awayScore;
            teams[away].played++;
            teams[away].goalsFor += awayScore;
            teams[away].goalsAgainst += homeScore;

            if (homeScore > awayScore) {
                teams[home].won++;
                teams[home].form.unshift('W');
                teams[away].lost++;
                teams[away].form.unshift('L');
            } else if (homeScore < awayScore) {
                teams[away].won++;
                teams[away].form.unshift('W');
                teams[home].lost++;
                teams[home].form.unshift('L');
            } else {
                teams[home].drawn++;
                teams[away].drawn++;
                teams[home].form.unshift('D');
                teams[away].form.unshift('D');
            }

            if (teams[home].form.length > 5) teams[home].form.pop();
            if (teams[away].form.length > 5) teams[away].form.pop();
        }
    });

    return teams;
}

function updateLeagueTable() {
    const teamsData = processMatchResults();
    if (typeof updateLeagueStandings === 'function') {
        const teamsArray = Object.keys(teamsData).map(name => ({ team: name, ...teamsData[name] }));
        updateLeagueStandings(teamsArray);
    }
    localStorage.setItem('firstLegData', JSON.stringify(firstLegData));
    localStorage.setItem('secondLegData', JSON.stringify(secondLegData));
}

function createEditableScoreCell(match, homeIndex, awayIndex) {
    const cell = document.createElement('td');
    cell.className = 'score-cell';
    cell.contentEditable = true;
    cell.title = 'Click to edit score';
    cell.textContent = `${match[homeIndex] || ''} - ${match[awayIndex] || ''}`;

    cell.addEventListener('blur', function () {
        const scores = this.textContent.split('-').map(s => s.trim());
        if (scores.length === 2) {
            match[homeIndex] = scores[0];
            match[awayIndex] = scores[1];
            updateLeagueTable();
        }
    });

    return cell;
}

function populateTables() {
    const firstLegTable = document.querySelector('#first-leg-table tbody');
    const secondLegTable = document.querySelector('#second-leg-table tbody');

    function addMatchesToTable(data, table) {
        data.forEach(match => {
            const row = document.createElement('tr');

            const dateCell = document.createElement('td');
            dateCell.textContent = match[0];
            dateCell.className = 'date-cell';
            row.appendChild(dateCell);

            const matchdayCell = document.createElement('td');
            matchdayCell.textContent = match[1];
            matchdayCell.className = 'matchday-cell';
            row.appendChild(matchdayCell);

            const homeTeamCell = document.createElement('td');
            homeTeamCell.textContent = match[2];
            row.appendChild(homeTeamCell);

            const scoreCell = createEditableScoreCell(match, 3, 4);
            row.appendChild(scoreCell);

            const awayTeamCell = document.createElement('td');
            awayTeamCell.textContent = match[5];
            row.appendChild(awayTeamCell);

            table.appendChild(row);
        });
    }

    addMatchesToTable(firstLegData, firstLegTable);
    addMatchesToTable(secondLegData, secondLegTable);
    updateLeagueTable();
}

function showTab(tabId, event) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
    if (event) event.currentTarget.classList.add('active');
    localStorage.setItem('activeTab', tabId);
}

document.addEventListener('DOMContentLoaded', () => {
    const savedFirstLeg = localStorage.getItem('firstLegData');
    const savedSecondLeg = localStorage.getItem('secondLegData');
    if (savedFirstLeg) firstLegData = JSON.parse(savedFirstLeg);
    if (savedSecondLeg) secondLegData = JSON.parse(savedSecondLeg);
    populateTables();
    const activeTab = localStorage.getItem('activeTab') || 'first-leg';
    const tabButton = document.querySelector(`.tab-button[onclick*="${activeTab}"]`);
    if (tabButton) tabButton.click();
});
