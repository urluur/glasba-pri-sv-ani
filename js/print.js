document.getElementById("printButton").addEventListener("click", () => {
    if (data.length === 0 || currentIndex < 0 || currentIndex >= data.length) {
        alert("Ni podatkov za izbrani dan.");
        return;
    }

    const row = data[currentIndex].map((s) => (s == null ? "" : s));

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
        ["Očenaš", row[12] || "—"],
        ["Jagnje božje", row[13] || "—"],
        [
            "Obhajilo 1",
            row[14]
                ? row[14].length <= 1
                    ? row[14]
                    : [
                          { text: "Najprej nekoliko tišine ali preludija, da se glavnina ljudi obhaja, nato:", style: "small" },
                          `${row[14]}`,
                      ]
                : "—",
        ],
        ["Obhajilo 2", row[15] || "—"],
        ["Zaključek", row[16] || "—"],
    ];

    const docDefinition = {
        content: [
            { text: `Program pesmi za ${row[0]}`, style: "header" },
            { text: `Naslov: ${row[1] || "—"}`, style: "subheader" },
            { text: `Orgle: ${row[2] || "—"}`, style: "subheader" },
            {
                table: {
                    headerRows: 1,
                    widths: ["auto", "*"],
                    body: fields,
                },
                layout: {
                    // fillColor: (rowIndex) => (rowIndex === 0 ? "#f0f0f0" : null),
                },
            },
        ],
        styles: {
            header: {
                fontSize: 18,
                bold: true,
                margin: [0, 0, 0, 8], // [left, top, right, bottom]
            },
            subheader: {
                fontSize: 16,
                margin: [0, 0, 0, 6],
            },
            small: {
                margin: [0, 0, 0, 2],
                fontSize: 10.5,
            },
        },
        defaultStyle: {
            font: "Roboto",
            fontSize: 16,
        },
    };

    // pdfMake.createPdf(docDefinition).open();
    pdfMake.createPdf(docDefinition).print();
});