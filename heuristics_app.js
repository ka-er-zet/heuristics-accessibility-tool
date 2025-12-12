
// Global variable for heuristics data (needed for export functions)
let heuristicsData = [];

document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');

    // Funkcja do pobrania danych
    async function fetchData() {
        try {
            const response = await fetch('heuristics.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            heuristicsData = await response.json();
            renderHeuristics();
        } catch (error) {
            console.error('Error fetching data:', error);
            app.innerHTML = `<article class="headings">
                <p><strong style="color: var(--pico-del-color);">Błąd ładowania danych</strong></p>
                <p>Nie udało się pobrać pliku heuristics.json. Sprawdź konsolę.</p>
            </article>`;
        }
    }

    // Funkcja renderująca heurystyki
    function renderHeuristics() {
        app.innerHTML = ''; // Wyczyść loader

        heuristicsData.forEach(heuristic => {
            const article = document.createElement('article');
            article.setAttribute('id', `heuristic-${heuristic.id}`);

            // Nagłówek heurystyki
            const header = document.createElement('header');
            const title = document.createElement('h2');
            title.textContent = heuristic.title;
            const description = document.createElement('p');
            description.textContent = heuristic.description;
            header.appendChild(title);
            header.appendChild(description);
            article.appendChild(header);

            // Lista checkpointów
            const body = document.createElement('div');
            if (heuristic.checkpoints && heuristic.checkpoints.length > 0) {
                heuristic.checkpoints.forEach((checkpoint, index) => {
                    // Fieldset dla grupy radio buttonów
                    const fieldset = document.createElement('fieldset');
                    fieldset.className = 'checkpoint-fieldset';

                    // Legend z treścią pytania
                    const legend = document.createElement('legend');
                    legend.className = 'checkpoint-legend';
                    legend.textContent = checkpoint;
                    fieldset.appendChild(legend);

                    // Kontener dla radio buttonów
                    const radioGroup = document.createElement('div');
                    radioGroup.className = 'radio-group';

                    // Opcje odpowiedzi
                    const options = [
                        { label: 'Tak', value: '1' },
                        { label: 'Częściowo', value: '0' },
                        { label: 'Nie', value: '-1' }
                    ];

                    options.forEach(option => {
                        const radioOption = document.createElement('div');
                        radioOption.className = 'radio-option';

                        const radioId = `h${heuristic.id}-c${index}-${option.value}`;
                        const radioName = `h${heuristic.id}-c${index}`;

                        // Radio button
                        const radio = document.createElement('input');
                        radio.type = 'radio';
                        radio.id = radioId;
                        radio.name = radioName;
                        radio.value = option.value;
                        radio.dataset.heuristicId = heuristic.id;
                        radio.dataset.checkpointIndex = index;

                        // Obsługa zmiany stanu
                        radio.addEventListener('change', updateScore);

                        // Label
                        const label = document.createElement('label');
                        label.setAttribute('for', radioId);
                        label.textContent = option.label;

                        radioOption.appendChild(radio);
                        radioOption.appendChild(label);
                        radioGroup.appendChild(radioOption);
                    });

                    fieldset.appendChild(radioGroup);
                    body.appendChild(fieldset);
                });
            }
            article.appendChild(body);

            app.appendChild(article);
        });

        // Update score immediately to show total question count and breakdown
        updateScore();
    }

    // Funkcja aktualizująca wynik
    function updateScore() {
        const allRadios = document.querySelectorAll('input[type="radio"]');
        const checkedRadios = document.querySelectorAll('input[type="radio"]:checked');

        // Calculate total questions (radio buttons are grouped by name)
        const radioGroups = new Set();
        allRadios.forEach(radio => radioGroups.add(radio.name));
        const totalQuestions = radioGroups.size;

        // Calculate answered questions
        const answeredQuestions = checkedRadios.length;

        // Calculate score and breakdown
        let score = 0;
        let positiveCount = 0;
        let neutralCount = 0;
        let negativeCount = 0;

        checkedRadios.forEach(radio => {
            const value = parseInt(radio.value, 10);
            score += value;

            if (value === 1) positiveCount++;
            else if (value === 0) neutralCount++;
            else if (value === -1) negativeCount++;
        });

        // Calculate max possible score (all questions answered "Tak")
        const maxScore = totalQuestions;

        // Calculate progress percentage
        const progressPercent = totalQuestions > 0 ? Math.round((answeredQuestions / totalQuestions) * 100) : 0;

        // Update overall stats
        document.getElementById('total-score').textContent = score;
        document.getElementById('max-score').textContent = maxScore;
        document.getElementById('answered-count').textContent = answeredQuestions;
        document.getElementById('total-count').textContent = totalQuestions;
        document.getElementById('progress-percent').textContent = progressPercent;
        document.getElementById('progress-bar').value = progressPercent;

        // Update breakdown
        document.getElementById('positive-count').textContent = positiveCount;
        document.getElementById('neutral-count').textContent = neutralCount;
        document.getElementById('negative-count').textContent = negativeCount;

        // Update per-heuristic breakdown
        updateHeuristicBreakdown();
    }

    // Funkcja aktualizująca rozbicie per heurystyka
    function updateHeuristicBreakdown() {
        const breakdownContainer = document.getElementById('heuristic-breakdown');
        breakdownContainer.innerHTML = '';

        heuristicsData.forEach(heuristic => {
            const heuristicRadios = document.querySelectorAll(`input[data-heuristic-id="${heuristic.id}"]`);
            const heuristicChecked = document.querySelectorAll(`input[data-heuristic-id="${heuristic.id}"]:checked`);

            // Count questions for this heuristic
            const radioGroups = new Set();
            heuristicRadios.forEach(radio => radioGroups.add(radio.name));
            const totalQuestions = radioGroups.size;
            const answeredQuestions = heuristicChecked.length;

            // Calculate score for this heuristic
            let heuristicScore = 0;
            heuristicChecked.forEach(radio => {
                heuristicScore += parseInt(radio.value, 10);
            });

            const maxScore = totalQuestions;
            const progressPercent = totalQuestions > 0 ? Math.round((answeredQuestions / totalQuestions) * 100) : 0;

            // Create breakdown item
            const item = document.createElement('div');
            item.className = 'heuristic-item';
            item.innerHTML = `
                <div class="heuristic-title">${heuristic.title}</div>
                <div class="heuristic-stats">
                    <span class="stat">Wynik: <strong>${heuristicScore}</strong> / ${maxScore}</span>
                    <span class="stat">Odpowiedzi: <strong>${answeredQuestions}</strong> / ${totalQuestions}</span>
                    <span class="stat">${progressPercent}%</span>
                </div>
                <progress max="100" value="${progressPercent}"></progress>
            `;

            breakdownContainer.appendChild(item);
        });
    }

    // Start
    fetchData();
});
