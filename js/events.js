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