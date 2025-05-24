let fp;

document.getElementById('prevButton').addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        displayContent();
    }
});

document.getElementById('todayButton').addEventListener('click', () => {
    if (data.length > 0) {
        const todayString = formatDate(new Date());
        const todayRow = data.find(row => row[0] === todayString);
        currentIndex = todayRow ? data.indexOf(todayRow) : 0;
        displayContent();
    }
});

document.getElementById('nextButton').addEventListener('click', () => {
    if (currentIndex < data.length - 1) {
        currentIndex++;
        displayContent();
    }
});

function getAvailableDates() {
    return data.map(row => {
        const [d, m, y] = row[0].split('.').map(s => s.trim());
        return `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`;
    });
}

function setupCalendar() {
    const availableDates = getAvailableDates();
    if (fp) fp.destroy();

    fp = flatpickr("#calendarButton", {
        clickOpens: true,
        allowInput: false,
        dateFormat: "Y-m-d",
        enable: availableDates,
        onChange: function(selectedDates, dateStr) {
            const [y, m, d] = dateStr.split('-');
            const formatted = `${parseInt(d)}. ${parseInt(m)}. ${y}`;
            const idx = data.findIndex(row => row[0] === formatted);
            if (idx !== -1) {
                currentIndex = idx;
                displayContent();
            }
        }
    });
}