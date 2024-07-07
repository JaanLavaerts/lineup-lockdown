import json
from nba_api.stats.static import players
from nba_api.stats.endpoints import commonplayerinfo, playercareerstats
from time import sleep
import random

def get_player_info(player_id):
    try:
        # Retrieve common player info
        common_info = commonplayerinfo.CommonPlayerInfo(player_id=player_id)
        common_data = common_info.common_player_info.get_dict()

        # Extract position from common player info
        positions = common_data['data'][0][15].split("-")
        positions = [position.strip() for position in positions]

        # Retrieve player career stats
        career_stats = playercareerstats.PlayerCareerStats(player_id=player_id)
        career_data = career_stats.get_data_frames()[0]

        # Extract unique team abbreviations
        teams = career_data['TEAM_ABBREVIATION'].unique().tolist()

        # Get player's full name
        full_name = common_data['data'][0][3]

        player_info = {
            "id": player_id,
            "fullName": full_name,
            "positions": positions,
            "teams": teams
        }
        return player_info
    except Exception as e:
        print(f"Error fetching data for player ID {player_id}: {e}")
        return None

def process_players():
    all_players = players.get_players()
    total_players = len(all_players)
    
    with open("player-names.json", "w") as outfile:
        outfile.write("[\n")

    for idx, player in enumerate(all_players):
        player_info = get_player_info(player['id'])
        if player_info:
            with open("player-names.json", "a") as outfile:
                json.dump(player_info, outfile, indent=2)
                # Add a comma except for the last player
                if idx < total_players - 1:
                    outfile.write(",\n")
                else:
                    outfile.write("\n")
            print(f"Processed player: {player_info['fullName']} ({idx+1}/{total_players}) - {((idx+1)/total_players)*100:.2f}% done")

        # Sleep for a random time to prevent rate limiting
        sleep_time = random.uniform(0.3, 0.8)
        sleep(sleep_time)

    with open("player-names.json", "a") as outfile:
        outfile.write("]")

if __name__ == "__main__":
    process_players()
