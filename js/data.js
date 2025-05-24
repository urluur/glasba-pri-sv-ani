let previousData = null;
let currentIndex = 0;
let data = [];
let isLoading = false;

const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSYxfGny6wzQTybmOngXjUFyMZOf6_PfjUavJicO3ZIlO9WMEo1nsnHa5ghTjB7lEObTkuBthF4bTCI/pub?output=csv';

function fetchData() {
    isLoading = true;
    showSpinner();
    const url = csvUrl + (csvUrl.includes('?') ? '&' : '?') + 't=' + Date.now();
    fetch(url)
        .then(response => response.text())
        .then(csvData => {
            const parsed = Papa.parse(csvData.trim(), { skipEmptyLines: true });
            const newData = parsed.data.slice(1);

            if (JSON.stringify(newData) === JSON.stringify(previousData)) {
                isLoading = false;
                displayContent();
                return;
            }

            data = newData;
            previousData = data;

            if (data.length > 0) {
                const todayString = formatDate(new Date());
                const todayRow = data.find(row => row[0] === todayString);
                currentIndex = todayRow ? data.indexOf(todayRow) : 0;
            } else {
                currentIndex = 0;
            }

            isLoading = false;
            displayContent();
            setupCalendar();
        })
        .catch(error => {
            isLoading = false;
            const contentDiv = document.getElementById('content');
            contentDiv.innerHTML = `<div class="alert alert-danger">Napaka pri branju CSV: ${error}</div>`;
        });
}

function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}. ${month}. ${year}`;
}