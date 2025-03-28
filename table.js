// Sample data - replace with your actual league data
const leagueData = [
    {
        team: "Mancity Jnr",
        played: 7,
        won: 6,
        drawn: 1,
        lost: 0,
        goalsFor: 18,
        goalsAgainst: 5,
        form: ['W', 'W', 'D', 'W', 'W']
    },
    {
        team: "NiceFC",
        played: 7,
        won: 5,
        drawn: 1,
        lost: 1,
        goalsFor: 15,
        goalsAgainst: 7,
        form: ['W', 'W', 'L', 'W', 'D']
    },
    {
        team: "dblinking",
        played: 7,
        won: 4,
        drawn: 2,
        lost: 1,
        goalsFor: 12,
        goalsAgainst: 6,
        form: ['W', 'D', 'W', 'L', 'W']
    },
    {
        team: "OLAMIX FC",
        played: 7,
        won: 4,
        drawn: 1,
        lost: 2,
        goalsFor: 14,
        goalsAgainst: 9,
        form: ['L', 'W', 'W', 'D', 'W']
    },
    {
        team: "ADX FC",
        played: 7,
        won: 3,
        drawn: 2,
        lost: 2,
        goalsFor: 10,
        goalsAgainst: 8,
        form: ['D', 'W', 'L', 'W', 'D']
    },
    {
        team: "Barnet FC",
        played: 7,
        won: 2,
        drawn: 1,
        lost: 4,
        goalsFor: 8,
        goalsAgainst: 12,
        form: ['L', 'W', 'D', 'L', 'L']
    },
    {
        team: "Mehhh",
        played: 7,
        won: 0,
        drawn: 0,
        lost: 7,
        goalsFor: 2,
        goalsAgainst: 22,
        form: ['L', 'L', 'L', 'L', 'L']
    }
];

// Calculate additional stats and sort
function processLeagueData(data) {
    return data.map(team => {
        return {
            ...team,
            goalDifference: team.goalsFor - team.goalsAgainst,
            points: (team.won * 3) + (team.drawn * 1)
        };
    }).sort((a, b) => {
        // Sort by points, then GD, then GF
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
function populateLeagueTable() {
    const processedData = processLeagueData(leagueData);
    const tableBody = document.querySelector('.league-table tbody');
    
    tableBody.innerHTML = processedData.map((team, index) => {
        // Add qualification/relegation classes
        let rowClass = '';
        if (index < 4) rowClass = 'cl'; // Top 4 - Champions League
        else if (index < 6) rowClass = 'el'; // Next 2 - Europa League
        else if (index >= processedData.length - 1) rowClass = 'relegation'; // Bottom - Relegation
        
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
                <td class="form-cell">${generateFormIcons(team.form)}</td>
            </tr>
        `;
    }).join('');
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    populateLeagueTable();
});
