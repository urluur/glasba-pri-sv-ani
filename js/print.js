document.getElementById('printButton').addEventListener('click', () => {
    if (data.length === 0 || currentIndex < 0 || currentIndex >= data.length) {
        alert('Ni podatkov za izbrani dan.');
        return;
    }

    const row = data[currentIndex];
    const doc = new window.jspdf.jsPDF();

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text(`Program pesmi za ${row[0]}`, 14, 18);

    const fields = [
        ['Vstop', row[3] || '—'],
        ['Gospod usmili se', row[4] || '—'],
        ['Slava', row[5] || '—'],
        ['Psalm', row[6] || '—'],
        ['Aleluja oz. vrstica', row[7] || '—'],
        ['Vera', row[8] || '—'],
        ['Darovanje', row[9] || '—'],
        ['Svet', row[10] || '—'],
        ['Odpev po povzdigovanju', row[11] || '—'],
        ['Očenaš', row[12] || '—'],
        ['Jagnje božje', row[13] || '—'],
        ['Obhajilo 1', row[14] ? 'Najprej nekoliko tišine ali preludija, da se glavnina ljudi obhaja, nato: ' + row[14] : '—'],
        ['Obhajilo 2', row[15] || '—'],
        ['Zaključek', row[16] || '—']
    ];

    doc.autoTable({
        head: [['Del maše', 'Pesem']],
        body: fields,
        startY: 28,
        styles: { font: 'helvetica', fontSize: 11 },
        headStyles: { fillColor: [240, 240, 240], textColor: 20 },
        theme: 'grid',
        margin: { left: 14, right: 14 }
    });

    doc.autoPrint();
    window.open(doc.output('bloburl'), '_blank');
});