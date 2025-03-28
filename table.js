// This will be populated from the main script.js
let leagueData = [];

// Calculate additional stats and sort
function processLeagueData(data) {
    return data.map(team => {
        return {
            ...team,
            goalDifference: team.goalsFor - team.goalsAgainst,
            points: (team.won * 3) + (team.drawn * 1)
        };
    }).sort((a, b) => {
        if (b.points !== a.points) return b.points - a.points;
        if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
        return b.goalsFor - a.goalsFor;
    });
}

// Generate form icons
function generateFormIcons(formArray) {
    return formArray.map(result => {
        let className = '';
        if (result === 'W') className = 'form-win';
        if (result === 'D') className = 'form-draw';
        if (result === 'L') className = 'form-loss';
        
        return `<div class="form-icon ${className}">${result}</div>`;
    }).join('');
}

// Populate the league table
function populateLeagueTable(teamsData) {
    const processedData = processLeagueData(teamsData);
    const tableBody = document.querySelector('#league-table tbody');
    
    tableBody.innerHTML = processedData.map((team, index) => {
        let rowClass = '';
        if (index < 4) rowClass = 'cl';
        else if (index < 6) rowClass = 'el';
        else if (index >= processedData.length - 1) rowClass = 'relegation';
        
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

// Function to update the table from external script
window.updateLeagueStandings = function(teams) {
    leagueData = Object.values(teams);
    populateLeagueTable(leagueData);
};

// Initialize with empty data if needed
document.addEventListener('DOMContentLoaded', () => {
    if (leagueData.length === 0) {
        document.querySelector('#league-table tbody').innerHTML = `
            <tr>
                <td colspan="11" style="text-align: center; padding: 2rem;">
                    No match data available yet. Scores will appear here once entered in the fixtures.
                </td>
            </tr>
        `;
    }
});

// Export function for other scripts to use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { updateLeagueStandings };
}
