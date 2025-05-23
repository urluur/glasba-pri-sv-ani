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
        headerInfo.innerHTML = '';
        return;
    }

    if (izbranDatum) {
        if (data.length > 0 && currentIndex >= 0 && currentIndex < data.length) {
            izbranDatum.textContent = data[currentIndex][0];
        } else {
            izbranDatum.textContent = '';
        }
    }

    if (prevButton && prevDateLabel) {
        if (currentIndex > 0 && data[currentIndex - 1]) {
            prevButton.disabled = false;
            prevDateLabel.textContent = data[currentIndex - 1][0];
        } else {
            prevButton.disabled = true;
            prevDateLabel.textContent = '—';
        }
    }
    if (nextButton && nextDateLabel) {
        if (currentIndex < data.length - 1 && data[currentIndex + 1]) {
            nextButton.disabled = false;
            nextDateLabel.textContent = data[currentIndex + 1][0];
        } else {
            nextButton.disabled = true;
            nextDateLabel.textContent = '—';
        }
    }

    if (data.length === 0 || currentIndex < 0 || currentIndex >= data.length) {
        headerInfo.innerHTML = '';
        contentDiv.innerHTML = '<p class="text-center text-muted">Ni podatkov za izbrani dan.</p>';
        return;
    }

    const row = data[currentIndex];

    headerInfo.innerHTML = `
        <div class="mb-2">
            <span class="h5 font-weight-bold"><i class="bi bi-calendar3-event text-primary"></i> ${row[1]}</span>
        </div>
        <div class="mb-1 text-muted">
            <i class="bi bi-person"></i> Orgle: ${row[2] || '—'}
        </div>
    `;

    contentDiv.innerHTML = `
        <table class="table table-program table-hover table-bordered shadow-sm mx-auto" style="max-width:700px;">
            <tbody>
                <tr><th>Vstop</th><td>${row[3] || '—'}</td></tr>
                <tr><th>Gospod usmili se</th><td>${row[4] || '—'}</td></tr>
                <tr><th>Slava</th><td>${row[5] || '—'}</td></tr>
                <tr><th>Psalm</th><td>${row[6] || '—'}</td></tr>
                <tr><th>Aleluja oz. vrstica</th><td>${row[7] || '—'}</td></tr>
                <tr><th>Vera</th><td>${row[8] || '—'}</td></tr>
                <tr><th>Darovanje</th><td>${row[9] || '—'}</td></tr>
                <tr><th>Svet</th><td>${row[10] || '—'}</td></tr>
                <tr><th>Odpev po povzdigovanju</th><td>${row[11] || '—'}</td></tr>
                <tr><th>Očenaš</th><td>${row[12] || '—'}</td></tr>
                <tr><th>Jagnje božje</th><td>${row[13] || '—'}</td></tr>
                <tr><th>Obhajilo 1</th><td>Najprej nekoliko tišine ali preludija, da se glavnina ljudi obhaja, nato: ${row[14] || '—'}</td></tr>
                <tr><th>Obhajilo 2</th><td>${row[15] || '—'}</td></tr>
                <tr><th>Zaključek</th><td>${row[16] || '—'}</td></tr>
            </tbody>
        </table>
    `;
}