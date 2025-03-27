// Data from your Excel file
const firstLegData = [
    ["Friday 28th March", "Matchday 1", "Mancity Jnr", "", "", "NiceFC"],
    ["Friday 28th March", "Matchday 1", "dblinking", "", "", "Mehhh"],
    ["Friday 28th March", "Matchday 1", "OLAMIX FC", "", "", "Barnet FC"],
    ["Saturday 29th March", "Matchday 2", "Mancity Jnr", "", "", "dblinking"],
    ["Saturday 29th March", "Matchday 2", "NiceFC", "", "", "Mehhh"],
    ["Saturday 29th March", "Matchday 2", "OLAMIX FC", "", "", "ADX FC"],
    ["", "Matchday 3", "Mancity Jnr", "", "", "Mehhh"],
    ["", "Matchday 3", "NiceFC", "", "", "dblinking"],
    ["", "Matchday 3", "Barnet FC", "", "", "ADX FC"],
    ["", "Matchday 4", "Mancity Jnr", "", "", "OLAMIX FC"],
    ["", "Matchday 4", "NiceFC", "", "", "Barnet FC"],
    ["", "Matchday 4", "dblinking", "", "", "ADX FC"],
    ["", "Matchday 5", "Mancity Jnr", "", "", "Barnet FC"],
    ["", "Matchday 5", "NiceFC", "", "", "OLAMIX FC"],
    ["", "Matchday 5", "Mehhh", "", "", "ADX FC"],
    ["", "Matchday 6", "Mancity Jnr", "", "", "ADX FC"],
    ["", "Matchday 6", "dblinking", "", "", "OLAMIX FC"],
    ["", "Matchday 6", "Mehhh", "", "", "Barnet FC"],
    ["", "Matchday 7", "NiceFC", "", "", "ADX FC"],
    ["", "Matchday 7", "dblinking", "", "", "Barnet FC"],
    ["", "Matchday 7", "Mehhh", "", "", "OLAMIX FC"]
];

const secondLegData = [
    ["Matchday 1", "NiceFC", "", "", "Mancity Jnr"],
    ["Matchday 1", "Mehhh", "", "", "dblinking"],
    ["Matchday 1", "Barnet FC", "", "", "OLAMIX FC"],
    ["Matchday 2", "dblinking", "", "", "Mancity Jnr"],
    ["Matchday 2", "Mehhh", "", "", "NiceFC"],
    ["Matchday 2", "ADX FC", "", "", "OLAMIX FC"],
    ["Matchday 3", "Mehhh", "", "", "Mancity Jnr"],
    ["Matchday 3", "dblinking", "", "", "NiceFC"],
    ["Matchday 3", "ADX FC", "", "", "Barnet FC"],
    ["Matchday 4", "OLAMIX FC", "", "", "Mancity Jnr"],
    ["Matchday 4", "Barnet FC", "", "", "NiceFC"],
    ["Matchday 4", "ADX FC", "", "", "dblinking"],
    ["Matchday 5", "Barnet FC", "", "", "Mancity Jnr"],
    ["Matchday 5", "OLAMIX FC", "", "", "NiceFC"],
    ["Matchday 5", "ADX FC", "", "", "Mehhh"],
    ["Matchday 6", "ADX FC", "", "", "Mancity Jnr"],
    ["Matchday 6", "OLAMIX FC", "", "", "dblinking"],
    ["Matchday 6", "Barnet FC", "", "", "Mehhh"],
    ["Matchday 7", "ADX FC", "", "", "NiceFC"],
    ["Matchday 7", "Barnet FC", "", "", "dblinking"],
    ["Matchday 7", "OLAMIX FC", "", "", "Mehhh"]
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
        
        const matchdayCell = document.createElement('td');
        matchdayCell.textContent = match[0];
        matchdayCell.className = 'matchday-cell';
        row.appendChild(matchdayCell);
        
        const homeTeamCell = document.createElement('td');
        homeTeamCell.textContent = match[1];
        row.appendChild(homeTeamCell);
        
        const scoreCell = document.createElement('td');
        scoreCell.textContent = `${match[2]} - ${match[3]}`;
        scoreCell.className = 'score-cell';
        row.appendChild(scoreCell);
        
        const awayTeamCell = document.createElement('td');
        awayTeamCell.textContent = match[4];
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