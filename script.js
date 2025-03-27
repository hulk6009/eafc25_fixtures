// Google Sheets configuration
// const SHEET_ID = '1kB4IgotF8KXPB_JZa9ouX-7Qqj1kdqh3';
const FIRST_LEG_SHEET_NAME = 'First Leg';
const SECOND_LEG_SHEET_NAME = 'Second Leg';
// const API_KEY = 'YOUR_API_KEY'; // Get from Google Cloud Console

// Function to fetch data from Google Sheets
async function fetchSheetData(sheetName) {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${sheetName}?key=${API_KEY}`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        return data.values.slice(1); // Skip header row
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

// Function to populate tables
async function populateTables() {
    const [firstLegData, secondLegData] = await Promise.all([
        fetchSheetData(FIRST_LEG_SHEET_NAME),
        fetchSheetData(SECOND_LEG_SHEET_NAME)
    ]);

    const firstLegTable = document.querySelector('#first-leg-table tbody');
    const secondLegTable = document.querySelector('#second-leg-table tbody');

    // Clear existing rows
    firstLegTable.innerHTML = '';
    secondLegTable.innerHTML = '';

    // First Leg
    if (firstLegData) {
        firstLegData.forEach(match => {
            const row = document.createElement('tr');
            
            const dateCell = document.createElement('td');
            dateCell.textContent = match[0] || '';
            dateCell.className = 'date-cell';
            row.appendChild(dateCell);
            
            const matchdayCell = document.createElement('td');
            matchdayCell.textContent = match[1] || '';
            matchdayCell.className = 'matchday-cell';
            row.appendChild(matchdayCell);
            
            const homeTeamCell = document.createElement('td');
            homeTeamCell.textContent = match[2] || '';
            row.appendChild(homeTeamCell);
            
            const scoreCell = document.createElement('td');
            scoreCell.textContent = `${match[3] || ''} - ${match[4] || ''}`;
            scoreCell.className = 'score-cell';
            row.appendChild(scoreCell);
            
            const awayTeamCell = document.createElement('td');
            awayTeamCell.textContent = match[5] || '';
            row.appendChild(awayTeamCell);
            
            firstLegTable.appendChild(row);
        });
    }

    // Second Leg
    if (secondLegData) {
        secondLegData.forEach(match => {
            const row = document.createElement('tr');
            
            const matchdayCell = document.createElement('td');
            matchdayCell.textContent = match[0] || '';
            matchdayCell.className = 'matchday-cell';
            row.appendChild(matchdayCell);
            
            const homeTeamCell = document.createElement('td');
            homeTeamCell.textContent = match[1] || '';
            row.appendChild(homeTeamCell);
            
            const scoreCell = document.createElement('td');
            scoreCell.textContent = `${match[2] || ''} - ${match[3] || ''}`;
            scoreCell.className = 'score-cell';
            row.appendChild(scoreCell);
            
            const awayTeamCell = document.createElement('td');
            awayTeamCell.textContent = match[4] || '';
            row.appendChild(awayTeamCell);
            
            secondLegTable.appendChild(row);
        });
    }
}

// Tab functionality (same as before)
function showTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    document.querySelectorAll('.tab-button').forEach(button => {
        button.classList.remove('active');
    });
    
    document.getElementById(tabId).classList.add('active');
    event.currentTarget.classList.add('active');
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    populateTables();
});
