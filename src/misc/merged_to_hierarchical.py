import json
from datetime import datetime, timedelta

def convert_time(time_str):
    # Parse the original time, assuming it's in UTC
    original_time = datetime.strptime(time_str, "%Y-%m-%dT%H:%M:%S+00:00")
    # Adjust for +01:00 offset
    adjusted_time = original_time + timedelta(hours=1)
    return adjusted_time

def restructure_json(input_filename, output_filename):
    with open(input_filename, 'r') as file:
        data = json.load(file)

    new_structure = {}

    for time_str, entries in data.items():
        adjusted_time = convert_time(time_str)
        date_str = adjusted_time.strftime("%Y-%m-%d")
        hour_str = adjusted_time.strftime("%H")
        minute_str = adjusted_time.strftime("%M")

        # Initialize nested structure if not already done
        if date_str not in new_structure:
            new_structure[date_str] = {}
        if hour_str not in new_structure[date_str]:
            new_structure[date_str][hour_str] = {}
        if minute_str not in new_structure[date_str][hour_str]:
            new_structure[date_str][hour_str][minute_str] = []

        # Update the last_update time format within each entry
        for entry in entries:
            last_update_dt = datetime.strptime(entry['last_update'], "%Y-%m-%d %H:%M:%S")
            # entry['last_update'] = last_update_dt.strftime("%H:%M")
            entry['last_update'] = last_update_dt.strftime("%Y-%m-%dT%H:%M:%S+01:00")
            entry['lat'] = float(entry['lat'])
            entry['lng'] = float(entry['lng'])
            entry['offline'] = entry['offline'] == 'true'

        new_structure[date_str][hour_str][minute_str].extend(entries)

    with open(output_filename, 'w') as file:
        json.dump(new_structure, file, indent=4)

# Usage
restructure_json('positions_per_timestamp.json', 'positions_hierarchical.json')
