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
