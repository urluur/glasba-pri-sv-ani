let previousData = null;
let currentIndex = 0;
let data = [];

const csvUrl =
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vSYxfGny6wzQTybmOngXjUFyMZOf6_PfjUavJicO3ZIlO9WMEo1nsnHa5ghTjB7lEObTkuBthF4bTCI/pub?output=csv';

// prenesi in obdelaj CSV podatke
function fetchData() {
    fetch(csvUrl)
        .then(response => response.text())
        .then(csvData => {
            const parsed = Papa.parse(csvData.trim(), { skipEmptyLines: true });
            const newData = parsed.data.slice(1); // ignoriraj prvo vrstico
            
            // posodobi podatke, če so se spremenili
            if (JSON.stringify(newData) === JSON.stringify(previousData)) return;

            data = newData;
            previousData = data;

            // nastavi indeks na danes
            if (data.length > 0) {
                const todayString = formatDate(new Date());
                const todayRow = data.find(row => row[0] === todayString);
                currentIndex = todayRow ? data.indexOf(todayRow) : 0;
            } else {
                currentIndex = 0;
            }

            displayContent();
        })
        .catch(error => console.error('Napaka pri branju CSV:', error));
}

// prikaz vsebine na podlagi trenutnega indeksa
function displayContent() {
    const contentDiv = document.getElementById('content');
    const izbranDatum = document.getElementById('izbran_datum');

    // prikaz izbranega datuma
    if (izbranDatum) {
        if (data.length > 0 && currentIndex >= 0 && currentIndex < data.length) {
            izbranDatum.textContent = data[currentIndex][0];
        } else {
            izbranDatum.textContent = '';
        }
    }

    // kaj prikazati, če ni podatkov
    if (data.length === 0 || currentIndex < 0 || currentIndex >= data.length) {
        contentDiv.innerHTML = '<p>Ni podatkov za izbrani dan.</p>';
        return;
    }

    const row = data[currentIndex];

    contentDiv.innerHTML = `
        <h2>${row[1]}</h2>
        <p><strong>Opis in organisti:</strong> ${row[2] || '/'}</p>
        <p><strong>Vstop:</strong> ${row[3] || '/'}</p>
        <p><strong>Gospod usmili se:</strong> ${row[4] || '/'}</p>
        <p><strong>Slava:</strong> ${row[5] || '/'}</p>
        <p><strong>Psalm:</strong> ${row[6] || '/'}</p>
        <p><strong>Aleluja oz. vrstica:</strong> ${row[7] || '/'}</p>
        <p><strong>Vera:</strong> ${row[8] || '/'}</p>
        <p><strong>Darovanje:</strong> ${row[9] || '/'}</p>
        <p><strong>Svet:</strong> ${row[10] || '/'}</p>
        <p><strong>Odpev po povzdigovanju:</strong> ${row[11] || '/'}</p>
        <p><strong>Očenaš:</strong> ${row[12] || '/'}</p>
        <p><strong>Jagnje božje:</strong> ${row[13] || '/'}</p>
        <p><strong>Obhajilo 1:</strong> Najprej nekoliko tišine ali preludija, da se glavnina ljudi obhaja, nato: ${row[14] || '/'}</p>
        <p><strong>Obhajilo 2:</strong> ${row[15] || '/'}</p>
        <p><strong>Zaključek:</strong> ${row[16] || '/'}</p>
    `;
}

// prikaz datuma v formatu dd. mm. yyyy
function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = date.getMonth() + 1; // No leading zero
    const year = date.getFullYear();
    return `${day}. ${month}. ${year}`;
}

// gumb za prejšnji in naslednji dan
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
        if (todayRow) {
            currentIndex = data.indexOf(todayRow);
        } else {
            alert('Danes ni podatkov.');
        }
        displayContent();
    }
});

document.getElementById('nextButton').addEventListener('click', () => {
    if (currentIndex < data.length - 1) {
        currentIndex++;
        displayContent();
    }
});

// tiskanje
document.getElementById('printButton').addEventListener('click', () => {
    window.print();
});

// prvi klic funkcije za prenos podatkov in timer za osvežitev
fetchData();
setInterval(fetchData, 60000);
