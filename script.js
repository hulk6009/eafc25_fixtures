// Data from your Excel file
const firstLegData = [
    ["Friday 28th March", "Matchday 1", "Mancity Jnr", "", "", "NiceFC"],
    ["Friday 28th March", "Matchday 1", "dblinking", "3", "2", "Mehhh"],
    ["Friday 28th March", "Matchday 1", "OLAMIX FC", "", "", "Barnet FC"],
    ["Friday 28th March", "Matchday 2", "Mancity Jnr", "", "", "dblinking"],
    ["Friday 28th March", "Matchday 2", "NiceFC", "", "", "Mehhh"],
    ["Friday 28th March", "Matchday 2", "OLAMIX FC", "", "", "ADX FC"],
    ["Friday 28th March", "Matchday 3", "Mancity Jnr", "", "", "Mehhh"],
    ["Saturday 29th March", "Matchday 3", "NiceFC", "", "", "dblinking"],
    ["Saturday 29th March", "Matchday 3", "Barnet FC", "", "", "ADX FC"],
    ["Saturday 29th March", "Matchday 4", "Mancity Jnr", "", "", "OLAMIX FC"],
    ["Saturday 29th March", "Matchday 4", "NiceFC", "", "", "Barnet FC"],
    ["Saturday 29th March", "Matchday 4", "dblinking", "3", "7", "ADX FC"],
    ["Saturday 29th March", "Matchday 5", "Mancity Jnr", "", "", "Barnet FC"],
    ["Saturday 29th March", "Matchday 5", "NiceFC", "", "", "OLAMIX FC"],
    ["Sunday 30th March", "Matchday 5", "Mehhh", "4", "5", "ADX FC"],
    ["Sunday 30th March", "Matchday 6", "Mancity Jnr", "", "", "ADX FC"],
    ["Sunday 30th March", "Matchday 6", "dblinking", "", "", "OLAMIX FC"],
    ["Sunday 30th March", "Matchday 6", "Mehhh", "", "", "Barnet FC"],
    ["Sunday 30th March", "Matchday 7", "NiceFC", "", "", "ADX FC"],
    ["Sunday 30th March", "Matchday 7", "dblinking", "", "", "Barnet FC"],
    ["Sunday 30th March", "Matchday 7", "Mehhh", "", "", "OLAMIX FC"]
];

const secondLegData = [
    ["Friday 4th April", "Matchday 8", "NiceFC", "10", "4", "Mancity Jnr"],
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

// Function to update all tables
function updateAllTables() {
    populateTables();
    updateLeagueTable();
}

// Modified populateTables function
function populateTables() {
    const firstLegTable = document.querySelector('#first-leg-table tbody');
    const secondLegTable = document.querySelector('#second-leg-table tbody');

    // Clear existing rows
    firstLegTable.innerHTML = '';
    secondLegTable.innerHTML = '';

    // Populate First Leg
    firstLegData.forEach(match => {
        const row = document.createElement('tr');
        
        // Add cells for each match property
        ['date', 'matchday', 'homeTeam', 'score', 'awayTeam'].forEach((type, index) => {
            const cell = document.createElement('td');
            
            if (type === 'score') {
                cell.textContent = `${match[3]} - ${match[4]}`;
                cell.className = 'score-cell';
            } else {
                cell.textContent = match[index];
                cell.className = `${type}-cell`;
            }
            
            row.appendChild(cell);
        });
        
        firstLegTable.appendChild(row);
    });

    // Populate Second Leg (same structure)
    secondLegData.forEach(match => {
        const row = document.createElement('tr');
        
        ['date', 'matchday', 'homeTeam', 'score', 'awayTeam'].forEach((type, index) => {
            const cell = document.createElement('td');
            
            if (type === 'score') {
                cell.textContent = `${match[3]} - ${match[4]}`;
                cell.className = 'score-cell';
            } else {
                cell.textContent = match[index];
                cell.className = `${type}-cell`;
            }
            
            row.appendChild(cell);
        });
        
        secondLegTable.appendChild(row);
    });
}

// Process match results and update league table
function updateLeagueTable() {
    const allTeams = {};
    
    // Process all matches from both legs
    [...firstLegData, ...secondLegData].forEach(match => {
        const homeTeam = match[2];
        const awayTeam = match[5];
        const homeScore = parseInt(match[3]) || 0;
        const awayScore = parseInt(match[4]) || 0;

        // Initialize teams if not already present
        if (!allTeams[homeTeam]) allTeams[homeTeam] = initializeTeam();
        if (!allTeams[awayTeam]) allTeams[awayTeam] = initializeTeam();

        // Only process if scores exist
        if (match[3] !== '' && match[4] !== '') {
            updateTeamStats(allTeams[homeTeam], homeScore, awayScore);
            updateTeamStats(allTeams[awayTeam], awayScore, homeScore);
        }
    });

    // Convert to array and sort
    const sortedTeams = Object.entries(allTeams)
        .map(([name, stats]) => ({ name, ...stats }))
        .sort((a, b) => b.points - a.points || b.gd - a.gd || b.gf - a.gf);

    // Update league table display
    const tableBody = document.querySelector('#league-table tbody');
    if (tableBody) {
        tableBody.innerHTML = sortedTeams.map((team, index) => `
            <tr class="${getRowClass(index, sortedTeams.length)}">
                <td class="pos-cell">${index + 1}</td>
                <td class="team-cell">${team.name}</td>
                <td>${team.played}</td>
                <td>${team.won}</td>
                <td>${team.drawn}</td>
                <td>${team.lost}</td>
                <td>${team.gf}</td>
                <td>${team.ga}</td>
                <td class="gd-cell">${team.gd > 0 ? '+' : ''}${team.gd}</td>
                <td class="pts-cell">${team.points}</td>
                <td class="form-cell">${generateFormIcons(team.form.slice(0, 5))}</td>
            </tr>
        `).join('');
    }
}

// Helper functions
function initializeTeam() {
    return {
        played: 0,
        won: 0,
        drawn: 0,
        lost: 0,
        gf: 0,  // goals for
        ga: 0,  // goals against
        gd: 0,  // goal difference
        points: 0,
        form: []
    };
}

function updateTeamStats(team, goalsFor, goalsAgainst) {
    team.played++;
    team.gf += goalsFor;
    team.ga += goalsAgainst;
    team.gd = team.gf - team.ga;

    if (goalsFor > goalsAgainst) {
        team.won++;
        team.points += 3;
        team.form.unshift('W');
    } else if (goalsFor < goalsAgainst) {
        team.lost++;
        team.form.unshift('L');
    } else {
        team.drawn++;
        team.points += 1;
        team.form.unshift('D');
    }
}

function getRowClass(position, totalTeams) {
    if (position < 4) return 'cl';
    if (position < 6) return 'el';
    if (position >= totalTeams - 1) return 'relegation';
    return '';
}

function generateFormIcons(form) {
    return form.map(result => {
        const className = {
            'W': 'form-win',
            'D': 'form-draw', 
            'L': 'form-loss'
        }[result] || '';
        return `<div class="form-icon ${className}">${result}</div>`;
    }).join('');
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    updateAllTables();
});
