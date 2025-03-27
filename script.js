// Google Sheets CSV URLs (replace with your published URLs)
const FIRST_LEG_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/1kB4IgotF8KXPB_JZa9ouX-7Qqj1kdqh3/pub?gid=0&single=true&output=csv';
const SECOND_LEG_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/1kB4IgotF8KXPB_JZa9ouX-7Qqj1kdqh3/pub?gid=1&single=true&output=csv';

// Function to parse CSV data
function parseCSV(csvText) {
    const lines = csvText.split('\n');
    return lines.map(line => {
        // Handle quoted values that might contain commas
        const values = [];
        let current = '';
        let inQuotes = false;
        
        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            
            if (char === '"') {
                inQuotes = !inQuotes;
            } else if (char === ',' && !inQuotes) {
                values.push(current);
                current = '';
            } else {
                current += char;
            }
        }
        
        values.push(current);
        return values;
    });
}

// Function to fetch CSV data
async function fetchCSV(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        const csvText = await response.text();
        return parseCSV(csvText).slice(1); // Skip header row
    } catch (error) {
        console.error('Error fetching CSV:', error);
        return null;
    }
}

// Function to populate tables (same structure as before)
async function populateTables() {
    const [firstLegData, secondLegData] = await Promise.all([
        fetchCSV(https://docs.google.com/spreadsheets/d/1kB4IgotF8KXPB_JZa9ouX-7Qqj1kdqh3/edit?gid=1357788881#gid=1357788881),
        fetchCSV(https://docs.google.com/spreadsheets/d/1kB4IgotF8KXPB_JZa9ouX-7Qqj1kdqh3/edit?gid=331663823#gid=331663823)
    ]);

    const firstLegTable = document.querySelector('#first-leg-table tbody');
    const secondLegTable = document.querySelector('#second-leg-table tbody');

    // Clear existing rows
    firstLegTable.innerHTML = '';
    secondLegTable.innerHTML = '';

    // First Leg
    if (firstLegData) {
        firstLegData.forEach(match => {
            if (match.length < 6) return; // Skip incomplete rows
            
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
            if (match.length < 5) return; // Skip incomplete rows
            
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