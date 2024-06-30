import json
import time
import random
from nba_api.stats.endpoints import playercareerstats, commonplayerinfo
from nba_api.stats.static import players

def get_all_player_ids():
    player_dict = players.get_players()
    player_ids = [player['id'] for player in player_dict]
    return player_ids

def get_player_career_stats_and_teams(player_id):
    career_stats = playercareerstats.PlayerCareerStats(player_id=player_id)
    career_stats_json = career_stats.get_json()
    career_stats_dict = json.loads(career_stats_json)
    
    regular_season_headers = None
    regular_season_row_data = None

    post_season_headers = None
    post_season_row_data = None

    team_abbreviations = set()

    for result_set in career_stats_dict['resultSets']:
        team_abbreviations = {row[4] for row in result_set['rowSet']}

    for result_set in career_stats_dict['resultSets']:
        if result_set['name'] == 'CareerTotalsRegularSeason':
            regular_season_headers = result_set['headers']
            regular_season_row_data = result_set['rowSet']
        elif result_set['name'] == 'CareerTotalsPostSeason':
            post_season_headers = result_set['headers']
            post_season_row_data = result_set['rowSet']

    regular_season_stats = []
    if regular_season_headers and regular_season_row_data:
        regular_season_stats = [{header: stat for header, stat in zip(regular_season_headers, row)} for row in regular_season_row_data]

    post_season_stats = []
    if post_season_headers and post_season_row_data:
        post_season_stats = [{header: stat for header, stat in zip(post_season_headers, row)} for row in post_season_row_data]

    return list(team_abbreviations), regular_season_stats, post_season_stats

def get_player_info(player_id):
    common_player_info = commonplayerinfo.CommonPlayerInfo(player_id=player_id)
    common_player_info_json = common_player_info.get_json()
    common_player_info_dict = json.loads(common_player_info_json)

    common_player_info_data = {}
    if 'resultSets' in common_player_info_dict and len(common_player_info_dict['resultSets']) > 0:
        common_player_info_data = {header: common_player_info_dict['resultSets'][0]['rowSet'][0][i] for i, header in enumerate(common_player_info_dict['resultSets'][0]['headers'])}
    common_player_info_data['TEAMS'] = teams

    return common_player_info_data


player_ids = get_all_player_ids()

for player_id in player_ids:
    teams, regular_season_stats, post_season_stats = get_player_career_stats_and_teams(player_id)
    common_player_info = get_player_info(player_id)

    structured_output = {
        "playerInfo": common_player_info,
        "regularSeasonStats": regular_season_stats,
        "postSeasonStats": post_season_stats
    }
    structured_output_json = json.dumps(structured_output, indent=2)

    # write to file players.json
    with open('players.json', 'a') as f:
        f.write(structured_output_json)
        f.write(',\n')

    print(f"Finished processing player with ID: {player_id}")
    sleep_time = random.uniform(0.3, 1)
    time.sleep(sleep_time)