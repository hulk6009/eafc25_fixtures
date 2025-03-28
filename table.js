// Updated: table.js with compatibility to script.js updates

let leagueData = [];

function processLeagueData(data) {
    return data.map(team => ({
        ...team,
        goalDifference: team.goalsFor - team.goalsAgainst,
        points: (team.won * 3) + team.drawn
    })).sort((a, b) => {
        if (b.points !== a.points) return b.points - a.points;
        if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
        return b.goalsFor - a.goalsFor;
    });
}

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

function getRowClass(position, totalTeams) {
    if (position < 4) return 'cl';
    if (position < 6) return 'el';
    if (position >= totalTeams - 1) return 'relegation';
    return '';
}

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

window.updateLeagueStandings = function(teams) {
    leagueData = teams;
    populateLeagueTable(leagueData);
};

document.addEventListener('DOMContentLoaded', () => {
    initializeLeagueTable();
});

function initializeLeagueTable() {
    const savedFirstLeg = localStorage.getItem('firstLegData');
    const savedSecondLeg = localStorage.getItem('secondLegData');

    if (savedFirstLeg && savedSecondLeg) {
        const firstLeg = JSON.parse(savedFirstLeg);
        const secondLeg = JSON.parse(savedSecondLeg);
        const allMatches = [...firstLeg, ...secondLeg];

        const teams = {};

        allMatches.forEach(match => {
            const home = match[2];
            const away = match[5];
            const homeScore = parseInt(match[3]);
            const awayScore = parseInt(match[4]);

            if (!teams[home]) teams[home] = { played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, form: [] };
            if (!teams[away]) teams[away] = { played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, form: [] };

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

        const teamsArray = Object.keys(teams).map(name => ({ team: name, ...teams[name] }));
        updateLeagueStandings(teamsArray);
    }
}
