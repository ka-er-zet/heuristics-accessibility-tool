import json
import re

def parse_heuristics(md_content):
    heuristics = []
    current_heuristic = None
    
    # Split by lines and remove empty ones
    lines = [line.strip() for line in md_content.split('\n') if line.strip()]
    
    i = 0
    while i < len(lines):
        line = lines[i]
        
        # Check for Heuristic Header (e.g., "1. Orientacja i nawigacja...")
        match = re.match(r'^(\d+)\.\s+(.+)', line)
        if match:
            if current_heuristic:
                heuristics.append(current_heuristic)
            
            id = int(match.group(1))
            # Title might be mixed with description in the first line or following lines
            # The user format seems to have title + description text flowing
            # Let's assume the first line after number is title + start of desc
            
            # Actually, looking at the user input:
            # 1. Orientacja i nawigacja Użytkownicy mogą łatwo...
            # It seems Title is first few words? Or just "Orientacja i nawigacja"
            # Let's try to split by known titles or just take the first sentence?
            # For now, let's take the whole line as title+desc and refine later if needed.
            # BUT, the user said: "liczbami są wyróznione heurystyki, potem jest opis do niej, a potem pytania"
            
            # Let's capture the raw text until the first question (starts with "Czy")
            raw_header = [match.group(2)]
            i += 1
            while i < len(lines) and not lines[i].startswith('Czy '):
                raw_header.append(lines[i])
                i += 1
            
            full_header_text = " ".join(raw_header)
            
            # Heuristic Title is usually short. Let's try to extract it.
            # Based on known titles:
            titles_map = {
                1: "Orientacja i nawigacja",
                2: "Struktura i semantyka",
                3: "Kontrast i czytelność",
                4: "Język i zrozumiałość",
                5: "Zapobieganie i stany błędów",
                6: "Przewidywalność i spójność",
                7: "Alternatywy treści wizualnych i dźwiękowych",
                8: "Metody i warunki interakcji",
                9: "Czas i ochrona danych",
                10: "Poruszanie i migotanie"
            }
            
            title = titles_map.get(id, "Heurystyka " + str(id))
            # Remove title from description if present
            description = full_header_text.replace(title, "").strip()
            
            current_heuristic = {
                "id": id,
                "title": f"{id}. {title}",
                "description": description,
                "checkpoints": []
            }
            continue
            
        # Checkpoints (start with "Czy")
        if line.startswith('Czy ') and current_heuristic:
            current_heuristic['checkpoints'].append(line)
            i += 1
            continue
            
        i += 1

    if current_heuristic:
        heuristics.append(current_heuristic)
        
    return heuristics

# Read MD file
with open('heurystyki.md', 'r', encoding='utf-8') as f:
    content = f.read()

# Parse
data = parse_heuristics(content)

# Write JSON
with open('heuristics.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=4)

print("Converted heurystyki.md to heuristics.json")
