import json
import os

# Folder containing your JSON files
folder_path = '../../../0positions'
# Output file for the merged static data
output_file_path = 'merged_static_data.json'

def merge_static_data(folder_path, output_file_path):
    all_static_data = {}

    for file_name in os.listdir(folder_path):
        if file_name.endswith('.json'):
            file_path = os.path.join(folder_path, file_name)
            if os.path.getsize(file_path) >= 16:
                with open(file_path, 'r') as file:
                    data = json.load(file)
                    for item in data:

                        item.pop('stream', None)
                        item.pop('id', None)
                        item.pop('ingame_name', None)
                        item.pop('position', None)

                        # Extract static part of data
                        static_data = {key: value for key, value in item.items() if key != 'position'}
                        item_id = static_data.get('player')
                        if item_id and item_id not in all_static_data:
                            all_static_data[item_id] = static_data

    # Save the merged static data to a file
    with open(output_file_path, 'w') as output_file:
        json.dump(list(all_static_data.values()), output_file, indent=4)

# Call the function
merge_static_data(folder_path, output_file_path)
