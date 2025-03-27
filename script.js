// Google Sheets ID and API configuration
const SHEET_ID = '1kB4IgotF8KXPB_JZa9ouX-7Qqj1kdqh3';
const API_KEY = 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'; // Note: In production, this should be secured
const FIRST_LEG_SHEET_NAME = 'First Leg';
const SECOND_LEG_SHEET_NAME = 'Second Leg';

// DOM elements
const firstLegTable = document.getElementById('first-leg-table').getElementsByTagName('tbody')[0];
const secondLegTable = document.getElementById('second-leg-table').getElementsByTagName('tbody')[0];
const lastUpdatedSpan = document.getElementById('last-updated');
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

// Tab functionality
tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const tabId = button.getAttribute('data-tab');
        
        // Update active tab button
        tabButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Update active tab content
        tabContents.forEach(content => content.classList.remove('active'));
        document.getElementById(tabId).classList.add('active');
    });
});

// Format date from Google Sheets
function formatDate(dateString) {
    if (!dateString) return '';
    return dateString.split(' ')[0]; // Just get the day name (Friday, Saturday, etc.)
}

// Load data from Google Sheets
async function loadSheetData() {
    try {
        // Load First Leg data
        const firstLegUrl = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${FIRST_LEG_SHEET_NAME}!A2:F?key=${API_KEY}`;
        const firstLegResponse = await axios.get(firstLegUrl);
        const firstLegData = firstLegResponse.data.values;
        
        // Load Second Leg data
        const secondLegUrl = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SECOND_LEG_SHEET_NAME}!A2:E?key=${API_KEY}`;
        const secondLegResponse = await axios.get(secondLegUrl);
        const secondLegData = secondLegResponse.data.values;
        
        // Process and display data
        displayFirstLegData(firstLegData);
        displaySecondLegData(secondLegData);
        
        // Update last updated time
        lastUpdatedSpan.textContent = new Date().toLocaleString();
    } catch (error) {
        console.error('Error loading data:', error);
        alert('Failed to load data. Please try again later.');
    }
}

function displayFirstLegData(data) {
    firstLegTable.innerHTML = '';
    
    data.forEach(row => {
        const [date, matchday, homeTeam, homeScore, awayScore, awayTeam] = row;
        
        const tr = document.createElement('tr');
        
        const dateCell = document.createElement('td');
        dateCell.textContent = formatDate(date);
        tr.appendChild(dateCell);
        
        const matchdayCell = document.createElement('td');
        matchdayCell.textContent = matchday;
        tr.appendChild(matchdayCell);
        
        const homeTeamCell = document.createElement('td');
        homeTeamCell.textContent = homeTeam;
        tr.appendChild(homeTeamCell);
        
        const scoreCell = document.createElement('td');
        scoreCell.className = 'score-cell';
        
        const homeInput = document.createElement('span');
        homeInput.className = 'score-value';
        homeInput.textContent = homeScore || '-';
        scoreCell.appendChild(homeInput);
        
        const separator = document.createElement('span');
        separator.className = 'score-separator';
        separator.textContent = ' : ';
        scoreCell.appendChild(separator);
        
        const awayInput = document.createElement('span');
        awayInput.className = 'score-value';
        awayInput.textContent = awayScore || '-';
        scoreCell.appendChild(awayInput);
        
        tr.appendChild(scoreCell);
        
        const awayTeamCell = document.createElement('td');
        awayTeamCell.textContent = awayTeam;
        tr.appendChild(awayTeamCell);
        
        firstLegTable.appendChild(tr);
    });
}

function displaySecondLegData(data) {
    secondLegTable.innerHTML = '';
    
    data.forEach(row => {
        const [matchday, homeTeam, homeScore, awayScore, awayTeam] = row;
        
        const tr = document.createElement('tr');
        
        const matchdayCell = document.createElement('td');
        matchdayCell.textContent = matchday;
        tr.appendChild(matchdayCell);
        
        const homeTeamCell = document.createElement('td');
        homeTeamCell.textContent = homeTeam;
        tr.appendChild(homeTeamCell);
        
        const scoreCell = document.createElement('td');
        scoreCell.className = 'score-cell';
        
        const homeInput = document.createElement('span');
        homeInput.className = 'score-value';
        homeInput.textContent = homeScore || '-';
        scoreCell.appendChild(homeInput);
        
        const separator = document.createElement('span');
        separator.className = 'score-separator';
        separator.textContent = ' : ';
        scoreCell.appendChild(separator);
        
        const awayInput = document.createElement('span');
        awayInput.className = 'score-value';
        awayInput.textContent = awayScore || '-';
        scoreCell.appendChild(awayInput);
        
        tr.appendChild(scoreCell);
        
        const awayTeamCell = document.createElement('td');
        awayTeamCell.textContent = awayTeam;
        tr.appendChild(awayTeamCell);
        
        secondLegTable.appendChild(tr);
    });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    loadSheetData();
});