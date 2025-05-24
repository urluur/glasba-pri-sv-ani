function showSpinner() {
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = `
        <div class="d-flex justify-content-center align-items-center" style="height: 180px;">
            <div class="spinner-border text-primary" role="status">
                <span class="sr-only">Nalaganje...</span>
            </div>
        </div>
    `;
}

function formatShortDate(dateStr) {
    // Converts "24. 5. 2025" to "24. 5."
    return dateStr ? dateStr.slice(0, dateStr.lastIndexOf('.')).trim() : '';
}

function displayContent() {
    const contentDiv = document.getElementById('content');
    const headerInfo = document.getElementById('headerInfo');
    const izbranDatum = document.getElementById('izbran_datum');
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    const prevDateLabel = document.getElementById('prevDateLabel');
    const nextDateLabel = document.getElementById('nextDateLabel');

    if (isLoading) {
        showSpinner();
        if (headerInfo) headerInfo.innerHTML = '';
        return;
    }

    if (izbranDatum) {
        izbranDatum.textContent =
            data.length > 0 && currentIndex >= 0 && currentIndex < data.length
                ? data[currentIndex][0]
                : '';
    }

    if (prevButton && prevDateLabel) {
        if (currentIndex > 0 && data[currentIndex - 1]) {
            prevButton.disabled = false;
            // prevDateLabel.textContent = formatShortDate(data[currentIndex - 1][0]);
        } else {
            prevButton.disabled = true;
        }
    }

    if (nextButton && nextDateLabel) {
        if (currentIndex < data.length - 1 && data[currentIndex + 1]) {
            nextButton.disabled = false;
            // nextDateLabel.textContent = formatShortDate(data[currentIndex + 1][0]);
        } else {
            nextButton.disabled = true;
        }
    }

    if (data.length === 0 || currentIndex < 0 || currentIndex >= data.length) {
        if (headerInfo) headerInfo.innerHTML = '';
        contentDiv.innerHTML = '<p class="text-center text-muted">Ni podatkov za izbrani dan.</p>';
        return;
    }

    const row = data[currentIndex];

    if (headerInfo) {
        headerInfo.innerHTML = `
            <div class="mb-2">
                <span class="h5 font-weight-bold">
                    <i class="bi bi-calendar-week text-primary"></i> ${row[1]}
                </span>
            </div>
            <div class="mb-1 text-muted">
                <i class="bi bi-person"></i> Orgle: ${row[2] || '—'}
            </div>
        `;
    }

    const tableRows = [
        ['Vstop', row[3]],
        ['Gospod usmili se', row[4]],
        ['Slava', row[5]],
        ['Psalm', row[6]],
        ['Aleluja oz. vrstica', row[7]],
        ['Vera', row[8]],
        ['Darovanje', row[9]],
        ['Svet', row[10]],
        ['Odpev po povzdigovanju', row[11]],
        ['Očenaš', row[12]],
        ['Jagnje božje', row[13]],
        ['Obhajilo 1', row[14] ? `Najprej nekoliko tišine ali preludija, da se glavnina ljudi obhaja, nato: ${row[14]}` : '—'],
        ['Obhajilo 2', row[15]],
        ['Zaključek', row[16]],
    ];

    contentDiv.innerHTML = `
        <table class="table table-program table-hover table-bordered shadow-sm mx-auto" style="max-width:700px;">
            <tbody>
                ${tableRows.map(([label, value]) =>
                    `<tr><th>${label}</th><td>${value || '—'}</td></tr>`
                ).join('')}
            </tbody>
        </table>
    `;
}