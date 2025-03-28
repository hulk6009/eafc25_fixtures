// League data storage
let leagueData = [];

// Process team data and sort by standings
function processLeagueData(data) {
    return data.map(team => ({
        ...team,
        goalDifference: team.goalsFor - team.goalsAgainst,
        points: (team.won * 3) + (team.drawn * 1)
    })).sort((a, b) => {
        if (b.points !== a.points) return b.points - a.points;
        if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
        return b.goalsFor - a.goalsFor;
    });
}

// Generate form icons for last 5 matches
function generateFormIcons(formArray) {
    return formArray.slice(0, 5).map(result => {
        const className = {
            'W': 'form-win',
            'D': 'form-draw',
            'L': 'form-loss'
        }[result] || '';
        return `<div class="form-icon ${className}">${result}</div>`;
    }).join('');
}

// Determine row styling based on position
function getRowClass(position, totalTeams) {
    if (position < 4) return 'cl';         // Champions League
    if (position < 6) return 'el';         // Europa League
    if (position >= totalTeams - 1) return 'relegation';
    return '';
}

// Populate the league table with current standings
function populateLeagueTable(teamsData) {
    const processedData = processLeagueData(teamsData);
    const tableBody = document.querySelector('#league-table tbody');
    
    if (!tableBody) return;
    
    tableBody.innerHTML = processedData.length > 0 
        ? processedData.map((team, index) => `
            <tr class="${getRowClass(index, processedData.length)}">
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
                <td class="form-cell">${generateFormIcons(team.form)}</td>
            </tr>
        `).join('')
        : `
            <tr>
                <td colspan="11" class="no-data-message">
                    No match data available yet. Scores will appear here once entered in the fixtures.
                </td>
            </tr>
        `;
}

// Public function to update standings
window.updateLeagueStandings = function(teams) {
    leagueData = Object.values(teams);
    populateLeagueTable(leagueData);
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeLeagueTable();
});

// Node.js export (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { updateLeagueStandings };
}

// Add this at the bottom of table.js
function initializeLeagueTable() {
    // Check if we have data in localStorage
    const savedFirstLeg = localStorage.getItem('firstLegData');
    const savedSecondLeg = localStorage.getItem('secondLegData');
    
    if (savedFirstLeg && savedSecondLeg) {
        // Process the saved data to generate standings
        const firstLeg = JSON.parse(savedFirstLeg);
        const secondLeg = JSON.parse(savedSecondLeg);
        const allMatches = [...firstLeg, ...secondLeg];
        
        const teams = {};
        
        // Process matches to create standings
        allMatches.forEach(match => {
            const homeTeam = match[2];
            const awayTeam = match[5];
            const homeScore = parseInt(match[3]) || 0;
            const awayScore = parseInt(match[4]) || 0;
            
            // Initialize teams if not exists
            if (!teams[homeTeam]) {
                teams[homeTeam] = {
                    played: 0,
                    won: 0,
                    drawn: 0,
                    lost: 0,
                    goalsFor: 0,
                    goalsAgainst: 0,
                    form: []
                };
            }
            
            if (!teams[awayTeam]) {
                teams[awayTeam] = {
                    played: 0,
                    won: 0,
                    drawn: 0,
                    lost: 0,
                    goalsFor: 0,
                    goalsAgainst: 0,
                    form: []
                };
            }
            
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
            }
        });
        
        // Convert to array format
        const teamsArray = Object.keys(teams).map(teamName => {
            return {
                team: teamName,
                ...teams[teamName]
            };
        });
        
        updateLeagueStandings(teamsArray);
    }
}
