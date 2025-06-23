function removeDiacritics(str) {
    if (!str) return "";
    return str
        .replace(/č/g, "c")
        .replace(/Č/g, "C")
        .replace(/š/g, "s")
        .replace(/Š/g, "S")
        .replace(/ž/g, "z")
        .replace(/Ž/g, "Z");
}

document.getElementById("printButton").addEventListener("click", () => {
    if (data.length === 0 || currentIndex < 0 || currentIndex >= data.length) {
        alert("Ni podatkov za izbrani dan.");
        return;
    }

    const row = data[currentIndex].map(removeDiacritics);
    const doc = new window.jspdf.jsPDF();

    doc.setTextColor(20);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text(`Program pesmi za ${row[0]}`, 14, 18);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text(`Naslov: ${row[1] || "—"}`, 14, 28);
    doc.text(`Orgle: ${row[2] || "—"}`, 14, 36);

    const fields = [
        ["Vstop", row[3] || "—"],
        ["Gospod usmili se", row[4] || "—"],
        ["Slava", row[5] || "—"],
        ["Psalm", row[6] || "—"],
        ["Aleluja oz. vrstica", row[7] || "—"],
        ["Vera", row[8] || "—"],
        ["Darovanje", row[9] || "—"],
        ["Svet", row[10] || "—"],
        ["Odpev po povzdigovanju", row[11] || "—"],
        ["Ocenas", row[12] || "—"],
        ["Jagnje bozje", row[13] || "—"],
        [
            "Obhajilo 1",
            row[14] // if no data show "-", if there is actual data, show explanatory text
                ? row[14].length <= 1
                    ? row[14]
                    : `Najprej nekoliko tišine ali preludija, da se glavnina ljudi obhaja, nato: ${row[14]}`
                : "—",
        ],
        ["Obhajilo 2", row[15] || "—"],
        ["Zakljucek", row[16] || "—"],
    ];

    doc.autoTable({
        head: [["Del mase", "Pesem"]],
        body: fields,
        startY: 44,
        styles: {
            font: "helvetica",
            fontSize: 11,
            cellWidth: "wrap",
            overflow: "linebreak",
            halign: "left",
            valign: "top",
            textColor: 20,
        },
        columnStyles: {
            0: { cellWidth: 50 },
            1: { cellWidth: 120 },
        },
        headStyles: {
            fillColor: [255, 255, 255],
            textColor: 20,
            fontStyle: "bold",
        },
        theme: "grid",
        margin: { left: 14, right: 14 },
    });

    doc.autoPrint();
    window.open(doc.output("bloburl"), "_blank");
});
