// Export functionality for Heuristics Evaluation Tool

// Export to CSV
function exportToCSV() {
    console.log('exportToCSV called');
    console.log('heuristicsData:', heuristicsData);

    if (!heuristicsData || heuristicsData.length === 0) {
        alert('Brak danych do eksportu. Poczekaj aż dane się załadują.');
        return;
    }

    const rows = [];

    // Header
    rows.push(['Heurystyka', 'Pytanie', 'Odpowiedź', 'Punkty']);

    // Collect data
    heuristicsData.forEach(heuristic => {
        heuristic.checkpoints.forEach((checkpoint, index) => {
            const radioName = `h${heuristic.id}-c${index}`;
            const selectedRadio = document.querySelector(`input[name="${radioName}"]:checked`);

            const answer = selectedRadio ?
                (selectedRadio.value === '1' ? 'Tak' :
                    selectedRadio.value === '0' ? 'Częściowo' : 'Nie') :
                'Brak odpowiedzi';
            const points = selectedRadio ? selectedRadio.value : '0';

            rows.push([
                heuristic.title,
                checkpoint,
                answer,
                points
            ]);
        });
    });

    // Convert to CSV
    const csvContent = rows.map(row =>
        row.map(cell => `"${cell.toString().replace(/"/g, '""')}"`).join(',')
    ).join('\n');

    // Add BOM for UTF-8 encoding (fixes Polish characters in Excel)
    const BOM = '\uFEFF';
    const csvWithBOM = BOM + csvContent;

    // Download
    downloadFile(csvWithBOM, 'ewaluacja-heurystyk.csv', 'text/csv;charset=utf-8;');
}

// Export to JSON EARL format
function exportToEARL() {
    console.log('exportToEARL called');

    if (!heuristicsData || heuristicsData.length === 0) {
        alert('Brak danych do eksportu. Poczekaj aż dane się załadują.');
        return;
    }

    const earl = {
        "@context": {
            "earl": "http://www.w3.org/ns/earl#",
            "dct": "http://purl.org/dc/terms/",
            "WCAG21": "https://www.w3.org/TR/WCAG21/#"
        },
        "@type": "earl:Assertion",
        "dct:title": "Ewaluacja Heurystyk Dostępności",
        "dct:description": "Na podstawie 10 Heurystyk Deque Systems",
        "dct:date": new Date().toISOString(),
        "earl:assertedBy": {
            "@type": "earl:Software",
            "dct:title": "Narzędzie Ewaluacji Heurystyk"
        },
        "earl:subject": {
            "@type": "earl:TestSubject",
            "dct:description": "Oceniany produkt/strona"
        },
        "earl:result": []
    };

    // Collect results
    heuristicsData.forEach(heuristic => {
        heuristic.checkpoints.forEach((checkpoint, index) => {
            const radioName = `h${heuristic.id}-c${index}`;
            const selectedRadio = document.querySelector(`input[name="${radioName}"]:checked`);

            // Include all questions, not just answered ones
            let outcome;
            if (!selectedRadio) {
                outcome = 'earl:untested';
            } else {
                outcome = selectedRadio.value === '1' ? 'earl:passed' :
                    selectedRadio.value === '0' ? 'earl:cantTell' :
                        'earl:failed';
            }

            earl["earl:result"].push({
                "@type": "earl:TestResult",
                "earl:test": {
                    "@type": "earl:TestCase",
                    "dct:title": heuristic.title,
                    "dct:description": checkpoint
                },
                "earl:outcome": outcome,
                "dct:date": new Date().toISOString()
            });
        });
    });

    // Download
    const jsonContent = JSON.stringify(earl, null, 2);
    downloadFile(jsonContent, 'ewaluacja-heurystyk-earl.json', 'application/json;charset=utf-8;');
}

// Helper function to download file
function downloadFile(content, filename, mimeType) {
    const blob = new Blob([content], { type: mimeType });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
}
