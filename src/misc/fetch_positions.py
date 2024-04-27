import json
import os
from datetime import datetime

# Folder containing your JSON files
folder_path = '/tmp/u/0positions'
# Output file for the positions per timestamp
output_file_path = 'positions_per_timestamp.json'


def extract_timestamp_from_filename(filename):
    try:
        # Assuming the filename format is "YYYY-MM-DDTHH:MM:SS+0000.json"
        return datetime.strptime(filename[:-5], "%Y-%m-%dT%H:%M:%S%z").isoformat()
    except ValueError:
        return None

def collect_positions(folder_path, output_file_path):
    positions_per_timestamp = {}

    for file_name in os.listdir(folder_path):
        if file_name.endswith('.json'):
            file_path = os.path.join(folder_path, file_name)
            if os.path.getsize(file_path) < 16:  # Skip files smaller than 16 bytes
                continue
            timestamp = extract_timestamp_from_filename(file_name)
            if not timestamp:
                continue  # Skip if timestamp couldn't be extracted
            with open(file_path, 'r') as file:
                try:
                    data = json.load(file)
                except json.JSONDecodeError:
                    continue  # Skip broken JSON files
                for item in data:
                    position_data = item.get('position', {})
                    # Check if position is not an empty array
                    if not isinstance(position_data, dict) or not position_data:
                        continue  # Skip if position is not a proper object
                    # Extract required position fields
                    position_info = {key: position_data.get(key) for key in ('lat', 'lng', 'offline', 'last_update')}
                    #if 'player' in item:
                    #    position_info['player'] = item['player']
                    if 'twitch' in item:
                        position_info['twitch'] = item['twitch']
                    if timestamp not in positions_per_timestamp:
                        positions_per_timestamp[timestamp] = []
                    positions_per_timestamp[timestamp].append(position_info)

    # Save the positions per timestamp to a file
    with open(output_file_path, 'w') as output_file:
        json.dump(positions_per_timestamp, output_file, indent=4)

# Call the function
collect_positions(folder_path, output_file_path)