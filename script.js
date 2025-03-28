// Data from your Excel file
let firstLegData = [
    ["Friday 28th March", "Matchday 1", "Mancity Jnr", "", "", "NiceFC"],
    ["Friday 28th March", "Matchday 1", "dblinking", "3", "2", "Mehhh"],
    ["Friday 28th March", "Matchday 1", "OLAMIX FC", "", "", "Barnet FC"],
    ["Friday 28th March", "Matchday 2", "Mancity Jnr", "", "", "dblinking"],
    ["Friday 28th March", "Matchday 2", "NiceFC", "", "", "Mehhh"],
    ["Friday 28th March", "Matchday 2", "OLAMIX FC", "", "", "ADX FC"],
    ["Friday 28th March", "Matchday 3", "Mancity Jnr", "", "", "Mehhh"],
    ["Saturday 29th March", "Matchday 3", "NiceFC", "", "", "dblinking"],
    ["Saturday 29th March", "Matchday 3", "Barnet FC", "2", "9", "ADX FC"],
    ["Saturday 29th March", "Matchday 4", "Mancity Jnr", "", "", "OLAMIX FC"],
    ["Saturday 29th March", "Matchday 4", "NiceFC", "", "", "Barnet FC"],
    ["Saturday 29th March", "Matchday 4", "dblinking", "3", "7", "ADX FC"],
    ["Saturday 29th March", "Matchday 5", "Mancity Jnr", "9", "5", "Barnet FC"],
    ["Saturday 29th March", "Matchday 5", "NiceFC", "", "", "OLAMIX FC"],
    ["Sunday 30th March", "Matchday 5", "Mehhh", "4", "5", "ADX FC"],
    ["Sunday 30th March", "Matchday 6", "Mancity Jnr", "", "", "ADX FC"],
    ["Sunday 30th March", "Matchday 6", "dblinking", "", "", "OLAMIX FC"],
    ["Sunday 30th March", "Matchday 6", "Mehhh", "", "", "Barnet FC"],
    ["Sunday 30th March", "Matchday 7", "NiceFC", "", "", "ADX FC"],
    ["Sunday 30th March", "Matchday 7", "dblinking", "", "", "Barnet FC"],
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

// Function to process match results and calculate standings
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

// Update league table
function updateLeagueTable() {
    const teamsData = processMatchResults();
    if (typeof updateLeagueStandings === 'function') {
        updateLeagueStandings(teamsData);
    }
    // Save to localStorage
    localStorage.setItem('firstLegData', JSON.stringify(firstLegData));
    localStorage.setItem('secondLegData', JSON.stringify(secondLegData));
}

// Create editable score cell
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
    });
    
    return cell;
}

// Populate fixture tables
function populateTables() {
    // Clear existing tables first
    document.querySelector('#first-leg-table tbody').innerHTML = '';
    document.querySelector('#second-leg-table tbody').innerHTML = '';

    // Load data from localStorage if available
    const savedFirstLeg = localStorage.getItem('firstLegData');
    const savedSecondLeg = localStorage.getItem('secondLegData');
    
    if (savedFirstLeg) firstLegData = JSON.parse(savedFirstLeg);
    if (savedSecondLeg) secondLegData = JSON.parse(savedSecondLeg);

    // Populate First Leg
    firstLegData.forEach(match => {
        const row = document.createElement('tr');
        // Your existing row creation code
        document.querySelector('#first-leg-table tbody').appendChild(row);
    });

    // Populate Second Leg
    secondLegData.forEach(match => {
        const row = document.createElement('tr');
        // Your existing row creation code
        document.querySelector('#second-leg-table tbody').appendChild(row);
    });
}

// Tab functionality
function showTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    document.querySelectorAll('.tab-button').forEach(button => {
        button.classList.remove('active');
    });
    
    document.getElementById(tabId).classList.add('active');
    event.currentTarget.classList.add('active');
    
    // Save the active tab to localStorage
    localStorage.setItem('activeTab', tabId);
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    populateTables();
    updateLeagueTable();
    
    // Set up tab switching
    document.querySelectorAll('.tab-button').forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            showTab(tabId);
        });
    });
});
