# Heurystyczna Diagnoza Dostępności (HAD)

Narzędzie do przeprowadzania heurystycznej diagnozy dostępności cyfrowej, oparte na 10 Heurystykach Dostępności Deque Systems, w opracowaniu Stefana Wajdy. 

## 📋 Opis

To narzędzie umożliwia systematyczną ocenę dostępności produktów cyfrowych (stron internetowych, aplikacji) według sprawdzonych heurystyk dostępności. Użytkownik ocenia każdy punkt kontrolny w skali trzystopniowej (Tak/Częściowo/Nie), a narzędzie automatycznie oblicza wyniki i generuje raporty.

## 🎯 Przeznaczenie

Narzędzie jest przeznaczone dla:
- Specjalistów ds. dostępności cyfrowej
- UX designerów
- Testerów
- Deweloperów
- Każdego, kto chce ocenić dostępność produktu cyfrowego

## ✨ Funkcje

- **System oceny trzystopniowej**: Tak (+1 pkt) / Częściowo (0 pkt) / Nie (-1 pkt)
- **10 heurystyk dostępności**: Zgodnie z metodologią Deque Systems
- **Szczegółowe statystyki**: 
  - Wynik punktowy (zdobyte/możliwe punkty)
  - Postęp ewaluacji (% ukończenia)
  - Rozbicie odpowiedzi według typu
  - Statystyki per heurystyka
- **Eksport wyników**:
  - CSV - do arkuszy kalkulacyjnych
  - JSON (EARL) - format W3C dla raportów dostępności
- **Tryb jasny/ciemny**: Przełączanie motywu kolorystycznego
- **Pełna dostępność**: Narzędzie samo spełnia standardy dostępności

## 🚀 Jak używać

1. Otwórz `index.html` w przeglądarce
2. Dla każdego pytania wybierz odpowiedź:
   - **Tak** - wymaganie spełnione
   - **Częściowo** - wymaganie częściowo spełnione
   - **Nie** - wymaganie niespełnione
3. Obserwuj statystyki w sekcji "Podsumowanie Ewaluacji"
4. Po zakończeniu eksportuj wyniki do CSV lub JSON

## 📁 Struktura projektu

```
HeuristicsTool/
├── index.html              # Główny plik HTML
├── heuristics.json         # Dane heurystyk i punktów kontrolnych
├── heuristics_app.js       # Logika aplikacji
├── heuristics.css          # Style niestandardowe
├── export.js               # Funkcje eksportu
├── pico.min.css           # Framework CSS (Pico CSS)
└── README.md              # Ten plik
```

## 🛠️ Technologie

- **HTML5** - semantyczna struktura
- **CSS3** - stylizacja (Pico CSS + custom styles)
- **JavaScript (Vanilla)** - logika aplikacji
- **JSON** - format danych

## 📖 Inspiracja

Narzędzie zostało zainspirowane pracą **Stefana Wajdy** opisaną w artykule:
[10 Heurystyk Dostępności](https://lepszyweb.pl/blog2/10-heurystyk-dostepnosci)

Heurystyki oparte są na metodologii **Deque Systems**.
Pytania do nich przygotował Stefan Wajda. 

## 📄 Licencja

**CC BY-SA 4.0** (Creative Commons Attribution-ShareAlike 4.0 International)

Możesz:
- ✅ Kopiować i rozpowszechniać
- ✅ Modyfikować i tworzyć dzieła pochodne
- ✅ Używać komercyjnie

Pod warunkiem:
- 📝 Podania autorstwa (Marcin Krzanicki - KaErZet)
- 🔄 Udostępnienia na tej samej licencji

Pełny tekst licencji: https://creativecommons.org/licenses/by-sa/4.0/

## 👤 Autor

**Marcin Krzanicki (KaErZet)**

## 🤝 Wkład

Projekt jest otwarty na sugestie i poprawki. Jeśli chcesz wnieść swój wkład:
1. Zgłoś problem (issue)
2. Zaproponuj ulepszenie
3. Prześlij pull request

## 📝 Changelog

### v1.0.0 (2025-12-12)
- Pierwsza wersja narzędzia HAD (Heuristic Accessibility Diagnosis)
- System oceny trzystopniowej
- 10 heurystyk dostępności
- Eksport do CSV i JSON (EARL)
- Tryb jasny/ciemny
- Pełna dostępność (WCAG 2.1)
