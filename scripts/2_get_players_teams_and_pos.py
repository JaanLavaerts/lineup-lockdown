import json

# Read the input JSON file
with open('../src/data/players.json', 'r') as f:
    data = json.load(f)

def get_positions(string):
    positions = []
    if '-' in string:
        positions = string.split('-')
    else:
        positions = [string]
    return list(set(positions))

# Function to extract required fields
def extract_required_fields(data):
    extracted_data = []
    for player in data:
        player_info = player.get('playerInfo', {})
        extracted_entry = {
            "id": player_info.get("PERSON_ID"),
            "fullName": player_info.get("DISPLAY_FIRST_LAST"),
            "positions": get_positions(player_info.get("POSITION")),
            "teams": player_info.get("TEAMS", [])
        }
        extracted_data.append(extracted_entry)
    return extracted_data

# Extract the required fields
extracted_data = extract_required_fields(data)

# Write the extracted data to a new JSON file
with open('../src/data/player-names.json', 'w') as f:
    json.dump(extracted_data, f, indent=4)

# Print the extracted data for verification
print(json.dumps(extracted_data, indent=4))
