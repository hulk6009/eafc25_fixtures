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

// Function to populate tables
function populateTables() {
    const firstLegTable = document.querySelector('#first-leg-table tbody');
    const secondLegTable = document.querySelector('#second-leg-table tbody');

    // First Leg
    firstLegData.forEach(match => {
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
        
        const scoreCell = document.createElement('td');
        scoreCell.textContent = `${match[3]} - ${match[4]}`;
        scoreCell.className = 'score-cell';
        row.appendChild(scoreCell);
        
        const awayTeamCell = document.createElement('td');
        awayTeamCell.textContent = match[5];
        row.appendChild(awayTeamCell);
        
        firstLegTable.appendChild(row);
    });

    // Second Leg
secondLegData.forEach(match => {
    const row = document.createElement('tr');
    
    // Date cell
    const dateCell = document.createElement('td');
    dateCell.textContent = match[0] || '';
    dateCell.className = 'date-cell';
    row.appendChild(dateCell);
    
    // Matchday cell
    const matchdayCell = document.createElement('td');
    matchdayCell.textContent = match[1] || '';
    matchdayCell.className = 'matchday-cell';
    row.appendChild(matchdayCell);
    
    // Home Team cell
    const homeTeamCell = document.createElement('td');
    homeTeamCell.textContent = match[2] || '';
    row.appendChild(homeTeamCell);
    
    // Score cell (combining home and away scores)
    const scoreCell = document.createElement('td');
    scoreCell.textContent = `${match[3] || ''} - ${match[4] || ''}`;
    scoreCell.className = 'score-cell';
    row.appendChild(scoreCell);
    
    // Away Team cell
    const awayTeamCell = document.createElement('td');
    awayTeamCell.textContent = match[5] || '';
    row.appendChild(awayTeamCell);
    
    secondLegTable.appendChild(row);
});
}

// Tab functionality
function showTab(tabId) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Deactivate all buttons
    document.querySelectorAll('.tab-button').forEach(button => {
        button.classList.remove('active');
    });
    
    // Show selected tab
    document.getElementById(tabId).classList.add('active');
    
    // Activate clicked button
    event.currentTarget.classList.add('active');
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    populateTables();
});
// Add this to your existing script.js
function processMatchResults() {
    const allMatches = [...firstLegData, ...secondLegData];
    const teams = {};
    
    // Initialize all teams
    const teamNames = new Set();
    allMatches.forEach(match => {
        teamNames.add(match[2]); // Home team
        teamNames.add(match[5]); // Away team
    });
    
    teamNames.forEach(team => {
        teams[team] = {
            played: 0,
            won: 0,
            drawn: 0,
            lost: 0,
            goalsFor: 0,
            goalsAgainst: 0,
            form: []
        };
    });
    
    // Process all matches
    allMatches.forEach(match => {
        const homeTeam = match[2];
        const awayTeam = match[5];
        const homeScore = parseInt(match[3]) || 0;
        const awayScore = parseInt(match[4]) || 0;
        
        // Only process if scores exist
        if (match[3] !== '' && match[4] !== '') {
            // Update home team
            teams[homeTeam].played++;
            teams[homeTeam].goalsFor += homeScore;
            teams[homeTeam].goalsAgainst += awayScore;
            
            // Update away team
            teams[awayTeam].played++;
            teams[awayTeam].goalsFor += awayScore;
            teams[awayTeam].goalsAgainst += homeScore;
            
            // Update wins/draws/losses
            if (homeScore > awayScore) {
                teams[homeTeam].won++;
                teams[homeTeam].form.unshift('W');
                teams[awayTeam].lost++;
                teams[awayTeam].form.unshift('L');
            } else if (homeScore < awayScore) {
                teams[awayTeam].won++;
                teams[awayTeam].form.unshift('W');
                teams[homeTeam].lost++;
                teams[homeTeam].form.unshift('L');
            } else {
                teams[homeTeam].drawn++;
                teams[homeTeam].form.unshift('D');
                teams[awayTeam].drawn++;
                teams[awayTeam].form.unshift('D');
            }
            
            // Keep only last 5 form results
            if (teams[homeTeam].form.length > 5) teams[homeTeam].form.pop();
            if (teams[awayTeam].form.length > 5) teams[awayTeam].form.pop();
        }
    });
    
    return teams;
}

function updateLeagueTable() {
    const teamsData = processMatchResults();
    const leagueTable = document.getElementById('league-table');
    
    if (leagueTable) {
        const processedData = Object.entries(teamsData).map(([team, stats]) => ({
            team,
            ...stats,
            goalDifference: stats.goalsFor - stats.goalsAgainst,
            points: (stats.won * 3) + (stats.drawn * 1)
        })).sort((a, b) => {
            if (b.points !== a.points) return b.points - a.points;
            if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
            return b.goalsFor - a.goalsFor;
        });
        
        const tableBody = leagueTable.querySelector('tbody');
        tableBody.innerHTML = processedData.map((team, index) => {
            let rowClass = '';
            if (index < 4) rowClass = 'cl';
            else if (index < 6) rowClass = 'el';
            else if (index >= Object.keys(teamsData).length - 1) rowClass = 'relegation';
            
            return `
                <tr class="${rowClass}">
                    <td class="pos-cell">${index + 1}</td>
                    <td class="team-cell">${team.team}</td>
                    <td>${team.played}</td>
                    <td>${team.won}</td>
                    <td>${team.drawn}</td>
                    <td>${team.lost}</td>
                    <td>${team.goalsFor}</td>
                    <td>${team.goalsAgainst}</td>
                    <td class="gd-cell">${team.goalDifference > 0 ? '+' : ''}${team.goalDifference}</td>
                    <td class="pts-cell">${team.points}</td>
                    <td class="form-cell">${generateFormIcons(team.form.slice(0, 5))}</td>
                </tr>
            `;
        }).join('');
    }
}

// Add this helper function if not already present
function generateFormIcons(formArray) {
    return formArray.map(result => {
        let className = '';
        if (result === 'W') className = 'form-win';
        if (result === 'D') className = 'form-draw';
        if (result === 'L') className = 'form-loss';
        
        return `<div class="form-icon ${className}">${result}</div>`;
    }).join('');
}

// Call this after updating scores
function onScoresUpdated() {
    updateLeagueTable();
    // You might also want to save to localStorage here
}

// Add these new functions to your existing script.js
function processMatchResults() {
    const allMatches = [...firstLegData, ...secondLegData];
    const teams = {};
    
    // Initialize all teams
    const teamNames = new Set();
    allMatches.forEach(match => {
        teamNames.add(match[2]); // Home team
        teamNames.add(match[5]); // Away team
    });
    
    teamNames.forEach(team => {
        teams[team] = {
            played: 0,
            won: 0,
            drawn: 0,
            lost: 0,
            goalsFor: 0,
            goalsAgainst: 0,
            form: []
        };
    });
    
    // Process all matches
    allMatches.forEach(match => {
        const homeTeam = match[2];
        const awayTeam = match[5];
        const homeScore = parseInt(match[3]) || 0;
        const awayScore = parseInt(match[4]) || 0;
        
        // Only process if scores exist
        if (match[3] !== '' && match[4] !== '') {
            // Update home team
            teams[homeTeam].played++;
            teams[homeTeam].goalsFor += homeScore;
            teams[homeTeam].goalsAgainst += awayScore;
            
            // Update away team
            teams[awayTeam].played++;
            teams[awayTeam].goalsFor += awayScore;
            teams[awayTeam].goalsAgainst += homeScore;
            
            // Update wins/draws/losses
            if (homeScore > awayScore) {
                teams[homeTeam].won++;
                teams[homeTeam].form.unshift('W');
                teams[awayTeam].lost++;
                teams[awayTeam].form.unshift('L');
            } else if (homeScore < awayScore) {
                teams[awayTeam].won++;
                teams[awayTeam].form.unshift('W');
                teams[homeTeam].lost++;
                teams[homeTeam].form.unshift('L');
            } else {
                teams[homeTeam].drawn++;
                teams[homeTeam].form.unshift('D');
                teams[awayTeam].drawn++;
                teams[awayTeam].form.unshift('D');
            }
            
            // Keep only last 5 form results
            if (teams[homeTeam].form.length > 5) teams[homeTeam].form.pop();
            if (teams[awayTeam].form.length > 5) teams[awayTeam].form.pop();
        }
    });
    
    return teams;
}

function generateFormIcons(formArray) {
    return formArray.map(result => {
        let className = '';
        if (result === 'W') className = 'form-win';
        if (result === 'D') className = 'form-draw';
        if (result === 'L') className = 'form-loss';
        
        return `<div class="form-icon ${className}">${result}</div>`;
    }).join('');
}

function updateLeagueTable() {
    const teamsData = processMatchResults();
    const leagueTable = document.getElementById('league-table');
    
    if (leagueTable) {
        const processedData = Object.entries(teamsData).map(([team, stats]) => ({
            team,
            ...stats,
            goalDifference: stats.goalsFor - stats.goalsAgainst,
            points: (stats.won * 3) + (stats.drawn * 1)
        })).sort((a, b) => {
            if (b.points !== a.points) return b.points - a.points;
            if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
            return b.goalsFor - a.goalsFor;
        });
        
        const tableBody = leagueTable.querySelector('tbody');
        tableBody.innerHTML = processedData.map((team, index) => {
            let rowClass = '';
            if (index < 4) rowClass = 'cl'; // Top 4 - Champions League
            else if (index < 6) rowClass = 'el'; // Next 2 - Europa League
            else if (index >= Object.keys(teamsData).length - 1) rowClass = 'relegation'; // Bottom - Relegation
            
            return `
                <tr class="${rowClass}">
                    <td class="pos-cell">${index + 1}</td>
                    <td class="team-cell">${team.team}</td>
                    <td>${team.played}</td>
                    <td>${team.won}</td>
                    <td>${team.drawn}</td>
                    <td>${team.lost}</td>
                    <td>${team.goalsFor}</td>
                    <td>${team.goalsAgainst}</td>
                    <td class="gd-cell">${team.goalDifference > 0 ? '+' : ''}${team.goalDifference}</td>
                    <td class="pts-cell">${team.points}</td>
                    <td class="form-cell">${generateFormIcons(team.form.slice(0, 5))}</td>
                </tr>
            `;
        }).join('');
    }
}

// Modify your populateTables function to make scores editable
function createEditableScoreCell(match, homeIndex, awayIndex) {
    const cell = document.createElement('td');
    cell.className = 'score-cell';
    cell.contentEditable = true;
    cell.textContent = `${match[homeIndex] || ''} - ${match[awayIndex] || ''}`;
    
    cell.addEventListener('blur', function() {
        const scores = this.textContent.split('-').map(s => s.trim());
        match[homeIndex] = scores[0] || '';
        match[awayIndex] = scores[1] || '';
        updateLeagueTable();
        // Optional: Save to localStorage
        localStorage.setItem('firstLegData', JSON.stringify(firstLegData));
        localStorage.setItem('secondLegData', JSON.stringify(secondLegData));
    });
    
    return cell;
}

// Update your populateTables function
function populateTables() {
    const firstLegTable = document.querySelector('#first-leg-table tbody');
    const secondLegTable = document.querySelector('#second-leg-table tbody');

    // First Leg
    firstLegData.forEach(match => {
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
        
        firstLegTable.appendChild(row);
    });

    // Second Leg
    secondLegData.forEach(match => {
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
        
        secondLegTable.appendChild(row);
    });
    
    // Initialize league table
    updateLeagueTable();
}

// Add localStorage loading if you want persistence
document.addEventListener('DOMContentLoaded', () => {
    const savedFirstLeg = localStorage.getItem('firstLegData');
    const savedSecondLeg = localStorage.getItem('secondLegData');
    
    if (savedFirstLeg) firstLegData = JSON.parse(savedFirstLeg);
    if (savedSecondLeg) secondLegData = JSON.parse(savedSecondLeg);
    
    populateTables();
});
